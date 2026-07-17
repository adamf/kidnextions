/* ---------------------------------------------------------------------------
   Kid Connections — game logic
   A Connections-style matching game for ages 5-9.

   Modes:
     - Grid size 3x3 (3 groups of 3) or 4x4 (4 groups of 4).
     - Difficulty (Easy / Medium / Hard) controls tries and whether hints show.
     - Sound effects (toggleable) via the Web Audio API — no audio files needed.

   Depends on GROUPS from puzzles.js.
--------------------------------------------------------------------------- */

(function () {
  "use strict";

  // ---- Settings & difficulty ----
  const DIFFICULTY = {
    easy: { hearts: 5, hints: true, label: "Easy" },
    medium: { hearts: 4, hints: true, label: "Medium" },
    hard: { hearts: 3, hints: false, label: "Hard" },
  };

  const STORE = {
    grid: "kc-grid",
    diff: "kc-diff",
    muted: "kc-muted",
  };

  function loadSetting(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v === null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }
  function saveSetting(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* ignore (private mode, etc.) */
    }
  }

  let gridSize = parseInt(loadSetting(STORE.grid, "3"), 10);
  if (gridSize !== 3 && gridSize !== 4) gridSize = 3;
  let difficulty = loadSetting(STORE.diff, "medium");
  if (!DIFFICULTY[difficulty]) difficulty = "medium";

  // groupSize === numGroups === gridSize (an NxN board of N groups of N).
  function groupSize() {
    return gridSize;
  }
  function numGroups() {
    return gridSize;
  }
  function startHearts() {
    return DIFFICULTY[difficulty].hearts;
  }
  function hintsAllowed() {
    return DIFFICULTY[difficulty].hints;
  }

  // ---- DOM ----
  const gridEl = document.getElementById("grid");
  const solvedEl = document.getElementById("solved");
  const heartsEl = document.getElementById("hearts");
  const messageEl = document.getElementById("message");
  const checkBtn = document.getElementById("check");
  const shuffleBtn = document.getElementById("shuffle");
  const hintBtn = document.getElementById("hint");
  const newgameBtn = document.getElementById("newgame");
  const overlay = document.getElementById("overlay");
  const overlayEmoji = document.getElementById("overlay-emoji");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayText = document.getElementById("overlay-text");
  const overlayBtn = document.getElementById("overlay-btn");
  const confettiEl = document.getElementById("confetti");
  const soundToggle = document.getElementById("sound-toggle");
  const gridBtns = document.querySelectorAll("[data-grid]");
  const diffBtns = document.querySelectorAll("[data-diff]");

  // ---- State ----
  let puzzleGroups = []; // chosen groups (with the sampled tiles actually in play)
  let tiles = []; // { text, groupIndex } for tiles still on the grid
  let selected = []; // tile texts currently selected
  let solvedCount = 0; // how many groups solved
  let hearts = startHearts();
  let hintActive = false;
  let busy = false; // true while a solve/wrong animation is running

  // ---------------------------------------------------------------------------
  // Sound effects (Web Audio — synthesized, no files, works offline)
  // ---------------------------------------------------------------------------
  const Sound = (function () {
    let ctx = null;
    let muted = loadSetting(STORE.muted, "0") === "1";

    function ensure() {
      if (!ctx) {
        try {
          const AC = window.AudioContext || window.webkitAudioContext;
          if (AC) ctx = new AC();
        } catch (e) {
          ctx = null;
        }
      }
      if (ctx && ctx.state === "suspended") ctx.resume();
      return ctx;
    }

    // Play a single note at `start` seconds from now.
    function note(freq, start, dur, type, vol) {
      const c = ensure();
      if (!c || muted) return;
      const t = c.currentTime + start;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = type || "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(t);
      osc.stop(t + dur + 0.03);
    }

    return {
      isMuted: function () {
        return muted;
      },
      toggle: function () {
        muted = !muted;
        saveSetting(STORE.muted, muted ? "1" : "0");
        if (!muted) this.tap(); // little confirmation blip
        return muted;
      },
      // Prime the audio context on a user gesture (autoplay policies).
      unlock: function () {
        ensure();
      },
      tap: function () {
        note(520, 0, 0.09, "triangle", 0.1);
      },
      deselect: function () {
        note(380, 0, 0.08, "triangle", 0.08);
      },
      hint: function () {
        note(988, 0, 0.12, "sine", 0.14);
        note(1319, 0.09, 0.14, "sine", 0.12);
      },
      correct: function () {
        note(523, 0, 0.13, "sine", 0.18); // C5
        note(659, 0.1, 0.13, "sine", 0.18); // E5
        note(784, 0.2, 0.18, "sine", 0.2); // G5
      },
      wrong: function () {
        note(196, 0, 0.18, "sawtooth", 0.13);
        note(146, 0.14, 0.22, "sawtooth", 0.13);
      },
      win: function () {
        const seq = [523, 659, 784, 1047, 784, 1047]; // C E G C - G C
        seq.forEach(function (f, i) {
          note(f, i * 0.12, 0.18, "triangle", 0.2);
        });
      },
    };
  })();

  // ---------------------------------------------------------------------------
  // Utilities
  // ---------------------------------------------------------------------------
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six"];
  function numberWord(n) {
    return NUMBER_WORDS[n] || String(n);
  }

  // Pick `count` groups that do not share any tile word (case-insensitive), so a
  // puzzle is never ambiguous by an exact-word overlap.
  function pickGroups(count) {
    const pool = shuffle(GROUPS);
    const chosen = [];
    const usedWords = new Set();

    for (const group of pool) {
      const words = group.tiles.map((t) => t.toLowerCase());
      const clashes = words.some((w) => usedWords.has(w));
      if (clashes) continue;
      chosen.push(group);
      words.forEach((w) => usedWords.add(w));
      if (chosen.length === count) break;
    }
    return chosen;
  }

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------
  function renderHearts() {
    let s = "";
    const max = startHearts();
    for (let i = 0; i < max; i++) {
      s += i < hearts ? "❤️" : "🤍";
    }
    heartsEl.textContent = s;
  }

  function renderGrid() {
    gridEl.innerHTML = "";
    tiles.forEach((tile) => {
      const btn = document.createElement("button");
      btn.className = "tile";
      btn.textContent = tile.text;
      btn.type = "button";
      if (selected.includes(tile.text)) btn.classList.add("selected");
      btn.addEventListener("click", () => onTileClick(tile.text));
      gridEl.appendChild(btn);
    });
    measureRowHeight();
  }

  // Record the height of a single tile so solved-group bars can match a tile
  // row exactly. Tiles are square, so this depends only on width and columns.
  function measureRowHeight() {
    const tile = gridEl.querySelector(".tile");
    if (!tile) return; // nothing to measure (keep the last value)
    const h = tile.getBoundingClientRect().height;
    if (h > 0) document.documentElement.style.setProperty("--row-h", h + "px");
  }

  function renderSolvedGroup(group, slot) {
    const div = document.createElement("div");
    div.className = "solved-group g" + slot;
    div.innerHTML =
      '<div class="solved-theme">' +
      (group.emoji ? '<span class="emoji">' + group.emoji + "</span>" : "") +
      "<span>" +
      escapeHtml(group.theme) +
      "</span></div>" +
      '<div class="solved-tiles">' +
      group.tiles.map(escapeHtml).join(" · ") +
      "</div>";
    solvedEl.appendChild(div);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function setMessage(text, kind) {
    messageEl.textContent = text || "";
    messageEl.className = "message" + (kind ? " " + kind : "");
  }

  function syncSettingsUI() {
    gridBtns.forEach((b) =>
      b.classList.toggle("active", parseInt(b.dataset.grid, 10) === gridSize)
    );
    diffBtns.forEach((b) => b.classList.toggle("active", b.dataset.diff === difficulty));
    soundToggle.textContent = Sound.isMuted() ? "🔇" : "🔊";
    soundToggle.setAttribute(
      "aria-label",
      Sound.isMuted() ? "Turn sound on" : "Turn sound off"
    );
    // Hints are hidden on Hard.
    hintBtn.style.display = hintsAllowed() ? "" : "none";
    // Grid columns + font scaling class.
    gridEl.style.setProperty("--cols", gridSize);
    gridEl.dataset.cols = gridSize;
  }

  // ---------------------------------------------------------------------------
  // Game flow
  // ---------------------------------------------------------------------------
  function newGame() {
    const n = numGroups();
    const size = groupSize();
    const chosen = pickGroups(n);

    // Sample `size` tiles from each chosen group; those are the tiles in play,
    // and also what the solved reveal will show.
    puzzleGroups = chosen.map(function (group) {
      return {
        theme: group.theme,
        emoji: group.emoji,
        tiles: shuffle(group.tiles).slice(0, size),
      };
    });

    tiles = [];
    puzzleGroups.forEach((group, gi) => {
      group.tiles.forEach((text) => tiles.push({ text: text, groupIndex: gi }));
    });
    tiles = shuffle(tiles);

    selected = [];
    solvedCount = 0;
    hearts = startHearts();
    hintActive = false;
    busy = false;

    solvedEl.innerHTML = "";
    overlay.classList.add("hidden");
    confettiEl.innerHTML = "";

    syncSettingsUI();
    setMessage("Tap " + numberWord(size) + " tiles that belong together!");
    renderHearts();
    renderGrid();
    updateCheckBtn();
  }

  function onTileClick(text) {
    if (busy) return;
    Sound.unlock();
    const idx = selected.indexOf(text);
    if (idx >= 0) {
      selected.splice(idx, 1); // deselect
      Sound.deselect();
    } else {
      if (selected.length >= groupSize()) return; // already have a full group
      selected.push(text);
      Sound.tap();
    }
    clearHint();
    renderGrid();
    updateCheckBtn();
    if (selected.length > 0) setMessage("");
  }

  function updateCheckBtn() {
    checkBtn.disabled = busy || selected.length !== groupSize();
  }

  function checkSelection() {
    if (busy || selected.length !== groupSize()) return;

    const first = tiles.find((t) => t.text === selected[0]);
    const targetGroup = first.groupIndex;
    const allMatch = selected.every((text) => {
      const tile = tiles.find((t) => t.text === text);
      return tile && tile.groupIndex === targetGroup;
    });

    if (allMatch) {
      handleCorrect(targetGroup);
    } else {
      handleWrong();
    }
  }

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function handleCorrect(groupIndex) {
    busy = true;
    Sound.correct();
    animateTiles(selected, "correct");
    const group = puzzleGroups[groupIndex];
    selected = [];
    checkBtn.disabled = true;

    setTimeout(function () {
      transitionRemoveGroup(groupIndex, group);
    }, 400);
  }

  // Smoothly remove a solved group: the group turns into a solved bar (which is
  // the same height as the tile row it replaces, so nothing below shifts), and
  // the remaining tiles glide to their new spots (FLIP technique).
  function transitionRemoveGroup(groupIndex, group) {
    const oldBtns = Array.from(gridEl.querySelectorAll(".tile"));

    // FIRST: record where the remaining tiles are right now.
    const firstRects = {};
    oldBtns.forEach(function (b) {
      firstRects[b.textContent] = b.getBoundingClientRect();
    });

    // Move the group to the solved area and drop its tiles from the grid.
    solvedCount += 1;
    renderSolvedGroup(group, solvedCount);
    tiles = tiles.filter(function (t) {
      return t.groupIndex !== groupIndex;
    });
    renderGrid();

    function finish() {
      busy = false;
      updateCheckBtn();
      if (solvedCount === numGroups()) {
        win();
      } else {
        setMessage("Yay! You found one! 🎈", "good");
      }
    }

    if (prefersReducedMotion) {
      finish();
      return;
    }

    // LAST + INVERT: offset each remaining tile back to where it just was.
    const newBtns = Array.from(gridEl.querySelectorAll(".tile"));
    newBtns.forEach(function (b) {
      const first = firstRects[b.textContent];
      if (!first) return;
      const last = b.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      b.style.transition = "none";
      b.style.transform = "translate(" + dx + "px, " + dy + "px)";
    });

    // PLAY: on the next frame, release each tile to its final position.
    requestAnimationFrame(function () {
      newBtns.forEach(function (b) {
        b.style.transition = "transform 0.4s ease";
        b.style.transform = "";
      });
    });

    // Clean up inline styles once the glide is done.
    setTimeout(function () {
      newBtns.forEach(function (b) {
        b.style.transition = "";
        b.style.transform = "";
      });
      finish();
    }, 430);
  }

  function handleWrong() {
    busy = true;
    Sound.wrong();
    animateTiles(selected, "wrong");
    hearts -= 1;
    renderHearts();

    const first = tiles.find((t) => t.text === selected[0]);
    const targetGroup = first.groupIndex;
    const rightCount = selected.filter((text) => {
      const tile = tiles.find((t) => t.text === text);
      return tile.groupIndex === targetGroup;
    }).length;

    setTimeout(() => {
      selected = [];
      busy = false;
      renderGrid();
      updateCheckBtn();
      if (hearts <= 0) {
        gameOver();
      } else if (rightCount === groupSize() - 1) {
        setMessage("So close! One doesn't fit. 🤏", "bad");
      } else {
        setMessage("Not quite — try again! 💪", "bad");
      }
    }, 450);
  }

  function animateTiles(texts, cls) {
    const btns = gridEl.querySelectorAll(".tile");
    btns.forEach((btn) => {
      if (texts.includes(btn.textContent)) {
        btn.classList.add(cls);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // Hint: highlight two tiles from an unsolved group.
  // ---------------------------------------------------------------------------
  function giveHint() {
    if (busy || tiles.length === 0 || !hintsAllowed()) return;
    clearHint();
    Sound.hint();
    const anyTile = tiles[Math.floor(Math.random() * tiles.length)];
    const groupTiles = tiles
      .filter((t) => t.groupIndex === anyTile.groupIndex)
      .slice(0, 2)
      .map((t) => t.text);

    const btns = gridEl.querySelectorAll(".tile");
    btns.forEach((btn) => {
      if (groupTiles.includes(btn.textContent)) btn.classList.add("hint");
    });
    hintActive = true;
    setMessage("These two go together! 💡", "good");
  }

  function clearHint() {
    if (!hintActive) return;
    gridEl.querySelectorAll(".tile.hint").forEach((b) => b.classList.remove("hint"));
    hintActive = false;
  }

  // ---------------------------------------------------------------------------
  // End states
  // ---------------------------------------------------------------------------
  function win() {
    const perfect = hearts === startHearts();
    const groupsWord = numberWord(numGroups());
    overlayEmoji.textContent = perfect ? "🏆" : "🎉";
    overlayTitle.textContent = perfect ? "Perfect!" : "You did it!";
    overlayText.textContent = perfect
      ? "You found all " + groupsWord + " groups with no mistakes!"
      : "You found all " + groupsWord + " groups! Great job!";
    overlayBtn.textContent = "Play Again ▶️";
    overlay.classList.remove("hidden");
    Sound.win();
    launchConfetti();
  }

  function gameOver() {
    // Gentle: reveal the remaining groups, no harsh "you lose".
    const remaining = puzzleGroups.filter((_, gi) =>
      tiles.some((t) => t.groupIndex === gi)
    );
    remaining.forEach((group) => {
      solvedCount += 1;
      renderSolvedGroup(group, solvedCount);
    });
    tiles = [];
    renderGrid();
    updateCheckBtn();

    overlayEmoji.textContent = "🌈";
    overlayTitle.textContent = "Good try!";
    overlayText.textContent = "Here are the groups. Want to try a new puzzle?";
    overlayBtn.textContent = "New Puzzle ▶️";
    overlay.classList.remove("hidden");
  }

  function launchConfetti() {
    const colors = ["#ffcf5c", "#7ed6a5", "#8ab6ff", "#ff8fab", "#c792ea"];
    confettiEl.innerHTML = "";
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement("span");
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = 2 + Math.random() * 2 + "s";
      piece.style.animationDelay = Math.random() * 0.6 + "s";
      confettiEl.appendChild(piece);
    }
    setTimeout(() => (confettiEl.innerHTML = ""), 4500);
  }

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------
  checkBtn.addEventListener("click", checkSelection);
  shuffleBtn.addEventListener("click", () => {
    if (busy) return;
    Sound.unlock();
    clearHint();
    tiles = shuffle(tiles);
    renderGrid();
  });
  hintBtn.addEventListener("click", giveHint);
  newgameBtn.addEventListener("click", () => {
    Sound.unlock();
    newGame();
  });
  overlayBtn.addEventListener("click", () => {
    Sound.unlock();
    newGame();
  });

  soundToggle.addEventListener("click", () => {
    Sound.unlock();
    Sound.toggle();
    syncSettingsUI();
  });

  // Keep solved-bar height in sync with tile size when the viewport changes.
  window.addEventListener("resize", measureRowHeight);

  gridBtns.forEach((b) =>
    b.addEventListener("click", () => {
      if (busy) return;
      Sound.unlock();
      const g = parseInt(b.dataset.grid, 10);
      if (g === gridSize) return;
      gridSize = g;
      saveSetting(STORE.grid, String(gridSize));
      newGame();
    })
  );

  diffBtns.forEach((b) =>
    b.addEventListener("click", () => {
      if (busy) return;
      Sound.unlock();
      const d = b.dataset.diff;
      if (d === difficulty || !DIFFICULTY[d]) return;
      difficulty = d;
      saveSetting(STORE.diff, difficulty);
      newGame();
    })
  );

  // Optional debug hook, active only when the page is opened with ?debug.
  // Used by automated tests; never exposes answers during normal play.
  if (/(?:^|[?&])debug(?:=|&|$)/.test(location.search)) {
    window.__KC = {
      groups: function () {
        return puzzleGroups;
      },
      tiles: function () {
        return tiles;
      },
      state: function () {
        return {
          gridSize: gridSize,
          difficulty: difficulty,
          hearts: hearts,
          maxHearts: startHearts(),
          muted: Sound.isMuted(),
          hintsAllowed: hintsAllowed(),
        };
      },
    };
  }

  // ---- Go! ----
  newGame();
})();
