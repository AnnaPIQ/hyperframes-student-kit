# EcomIQ local fonts

Self-hosted brand fonts so renders never depend on Google Fonts at render time
(faster, deterministic, lint-clean). Both are originally Google Fonts.

| File | Family | Notes |
|---|---|---|
| `RethinkSans.woff2` | Rethink Sans | variable, covers weights 400–800 (latin) |
| `HedvigLettersSerif.woff2` | Hedvig Letters Serif | 400 (latin), used italic for emphasis |
| `fonts-full.css` + `reth-*.woff2` / `hedv-*.woff2` | both | full subset set (latin-ext, symbols, math) — use only if you need extended glyphs |

## Use in a composition (the pattern the generator emits)
```html
<style>
  @font-face { font-family: 'Rethink Sans'; font-weight: 400 800; font-display: block;
    src: url(assets/fonts/RethinkSans.woff2) format('woff2'); }
  @font-face { font-family: 'Hedvig Letters Serif'; font-weight: 400; font-display: block;
    src: url(assets/fonts/HedvigLettersSerif.woff2) format('woff2'); }
</style>
```
Then name the families **literally** in your CSS rules
(`font-family: 'Rethink Sans', sans-serif;`) — the linter doesn't resolve CSS
variables, so `var(--font-sans)` would trip a false `font_family_without_font_face`
warning even though it renders fine. Keep colors as `--brand-*` tokens; pin the
two brand fonts by name.

Need extended glyphs (accents, symbols)? Link `fonts-full.css` instead and ship
all the `reth-*`/`hedv-*` files with it.
