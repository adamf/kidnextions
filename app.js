/* ---------------------------------------------------------------------------
   Kid Connections — game logic
   A 3x3, three-group version of Connections for ages 5-9.
   Depends on GROUPS from puzzles.js.
--------------------------------------------------------------------------- */

(function () {
  "use strict";

  const GROUP_SIZE = 3;      // tiles per group
  const NUM_GROUPS = 3;      // groups per puzzle (fills the 3x3 grid)
  const START_HEARTS = 4;    // tries before a gentle "good try"

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

  // ---- State ----
  let puzzleGroups = [];   // the 3 chosen group objects for this puzzle
  let tiles = [];          // { text, groupIndex } for tiles still on the grid
  let selected = [];       // tile texts currently selected
  let solvedCount = 0;     // how many groups solved
  let hearts = START_HEARTS;
  let hintActive = false;

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

  // Pick NUM_GROUPS groups that do not share any tile word (case-insensitive),
  // so a puzzle is never ambiguous by an exact-word overlap.
  function pickGroups() {
    const pool = shuffle(GROUPS);
    const chosen = [];
    const usedWords = new Set();

    for (const group of pool) {
      const words = group.tiles.map((t) => t.toLowerCase());
      const clashes = words.some((w) => usedWords.has(w));
      if (clashes) continue;
      chosen.push(group);
      words.forEach((w) => usedWords.add(w));
      if (chosen.length === NUM_GROUPS) break;
    }
    return chosen;
  }

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------
  function renderHearts() {
    let s = "";
    for (let i = 0; i < START_HEARTS; i++) {
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
  }

  function renderSolvedGroup(group, slot) {
    const div = document.createElement("div");
    div.className = "solved-group g" + slot;
    div.innerHTML =
      '<div class="solved-theme">' +
      (group.emoji ? '<span class="emoji">' + group.emoji + "</span>" : "") +
      "<span>" + escapeHtml(group.theme) + "</span></div>" +
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

  // ---------------------------------------------------------------------------
  // Game flow
  // ---------------------------------------------------------------------------
  function newGame() {
    puzzleGroups = pickGroups();
    tiles = [];
    puzzleGroups.forEach((group, gi) => {
      group.tiles.forEach((text) => tiles.push({ text: text, groupIndex: gi }));
    });
    tiles = shuffle(tiles);

    selected = [];
    solvedCount = 0;
    hearts = START_HEARTS;
    hintActive = false;

    solvedEl.innerHTML = "";
    overlay.classList.add("hidden");
    confettiEl.innerHTML = "";
    setMessage("Tap three tiles that belong together!");
    renderHearts();
    renderGrid();
    updateCheckBtn();
  }

  function onTileClick(text) {
    const idx = selected.indexOf(text);
    if (idx >= 0) {
      selected.splice(idx, 1); // deselect
    } else {
      if (selected.length >= GROUP_SIZE) return; // already have three
      selected.push(text);
    }
    clearHint();
    renderGrid();
    updateCheckBtn();
    if (selected.length > 0) setMessage("");
  }

  function updateCheckBtn() {
    checkBtn.disabled = selected.length !== GROUP_SIZE;
  }

  function checkSelection() {
    if (selected.length !== GROUP_SIZE) return;

    // Which group does the first selected tile belong to?
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
    // Celebrate the correct tiles, then glide the rest into place.
    animateTiles(selected, "correct");
    const group = puzzleGroups[groupIndex];
    const solvedTexts = selected.slice();
    selected = [];
    checkBtn.disabled = true;

    setTimeout(function () {
      transitionRemoveGroup(groupIndex, group, solvedTexts);
    }, 400);
  }

  // Smoothly remove a solved group: the solved tiles leave, and the remaining
  // tiles + the grid's height animate to their new layout (FLIP technique) so
  // rows never snap abruptly.
  function transitionRemoveGroup(groupIndex, group) {
    const oldBtns = Array.from(gridEl.querySelectorAll(".tile"));

    // FIRST: record where the remaining tiles are right now, and the grid size.
    const firstRects = {};
    oldBtns.forEach(function (b) {
      firstRects[b.textContent] = b.getBoundingClientRect();
    });
    const gridFirstHeight = gridEl.getBoundingClientRect().height;

    // Move the group to the solved area and drop its tiles from the grid.
    solvedCount += 1;
    renderSolvedGroup(group, solvedCount);
    tiles = tiles.filter(function (t) {
      return t.groupIndex !== groupIndex;
    });
    renderGrid();

    function finish() {
      updateCheckBtn();
      if (solvedCount === NUM_GROUPS) {
        win();
      } else {
        setMessage("Yay! You found one! 🎈", "good");
      }
    }

    if (prefersReducedMotion) {
      finish();
      return;
    }

    // LAST: measure the new layout.
    const newBtns = Array.from(gridEl.querySelectorAll(".tile"));
    const gridLastHeight = gridEl.getBoundingClientRect().height;

    // INVERT: pin the grid to its old height and offset each remaining tile
    // back to where it just was, with no transition yet.
    gridEl.style.height = gridFirstHeight + "px";
    newBtns.forEach(function (b) {
      const first = firstRects[b.textContent];
      if (!first) return;
      const last = b.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      b.style.transition = "none";
      b.style.transform = "translate(" + dx + "px, " + dy + "px)";
    });

    // PLAY: on the next frame, release everything to its final position.
    requestAnimationFrame(function () {
      gridEl.style.transition = "height 0.4s ease";
      gridEl.style.height = gridLastHeight + "px";
      newBtns.forEach(function (b) {
        b.style.transition = "transform 0.4s ease";
        b.style.transform = "";
      });
    });

    // Clean up inline styles once the glide is done.
    setTimeout(function () {
      gridEl.style.transition = "";
      gridEl.style.height = "";
      newBtns.forEach(function (b) {
        b.style.transition = "";
        b.style.transform = "";
      });
      finish();
    }, 430);
  }

  function handleWrong() {
    animateTiles(selected, "wrong");
    hearts -= 1;
    renderHearts();

    // Count how many are correct for a friendly hint.
    const first = tiles.find((t) => t.text === selected[0]);
    const targetGroup = first.groupIndex;
    const rightCount = selected.filter((text) => {
      const tile = tiles.find((t) => t.text === text);
      return tile.groupIndex === targetGroup;
    }).length;

    setTimeout(() => {
      selected = [];
      renderGrid();
      updateCheckBtn();
      if (hearts <= 0) {
        gameOver();
      } else if (rightCount === GROUP_SIZE - 1) {
        setMessage("So close! Two go together. 🤏", "bad");
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
    if (tiles.length === 0) return;
    clearHint();
    // Pick the group of a random remaining tile, highlight two of its tiles.
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
    const perfect = hearts === START_HEARTS;
    overlayEmoji.textContent = perfect ? "🏆" : "🎉";
    overlayTitle.textContent = perfect ? "Perfect!" : "You did it!";
    overlayText.textContent = perfect
      ? "You found all three groups with no mistakes!"
      : "You found all three groups! Great job!";
    overlayBtn.textContent = "Play Again ▶️";
    overlay.classList.remove("hidden");
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
    clearHint();
    tiles = shuffle(tiles);
    renderGrid();
  });
  hintBtn.addEventListener("click", giveHint);
  newgameBtn.addEventListener("click", newGame);
  overlayBtn.addEventListener("click", newGame);

  // ---- Go! ----
  newGame();
})();
