# 🧩 Kid Connections

A simple, kid-friendly version of the NYT **Connections** game, built for ages **5–9**.

Instead of the tricky 4×4 grid with wordplay, this is a gentle **3×3 grid** with
**three groups of three tiles**. Kids find the hidden theme that links each set of
three — like *Farm Animals*, *Fruits*, or *Things That Fly*. No puns, no traps.

## How to play

1. Look at the nine tiles.
2. Tap **three** tiles you think go together.
3. Press **Check ✅**.
4. Find all **three groups** to win! 🎉

- **Shuffle 🔀** rearranges the tiles.
- **Hint 💡** highlights two tiles that belong together.
- **New Puzzle 🔄** starts a fresh board.
- You get **4 hearts** ❤️ — but even if you run out, the answers are revealed
  gently and you can try a new puzzle. It's meant to be encouraging, not stressful.

## Playing it

It's a single static page — no build step, no dependencies. Just open
`index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

The included workflow (`.github/workflows/deploy.yml`) publishes the site
automatically on every push to `main`. To turn it on:

1. Go to the repo's **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` — the site deploys to `https://<user>.github.io/<repo>/`.

## The puzzle bank

The ~200 seed groups live in [`puzzles.js`](puzzles.js). They were generated
with the help of an LLM and hardcoded for now — each is a theme plus three
simple tiles:

```js
{ theme: "Farm Animals", emoji: "🐄", tiles: ["Cow", "Pig", "Horse"] }
```

A puzzle is assembled at runtime by picking three groups that don't share any
tile word, then shuffling their nine tiles onto the grid. Adding more variety is
as easy as adding more entries to that array.

## Roadmap

- [ ] More seed groups (and maybe difficulty tiers by age).
- [ ] Daily puzzle mode.
- [ ] Sound effects and richer celebrations.
- [ ] A native mobile app wrapper.
