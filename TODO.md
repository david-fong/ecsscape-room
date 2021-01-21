
# Things To Do

Start working on layout and z-index.

- Add cssnano to the build process when I'm ready to do a test release.
- If I want git to delta-compress my generated html, install stream-replace to modify ReactDom.render... to prepend a newline character before starting angle brackets.

## Ideas

### High-Level Features

- Playing as multiple characters?
- Restorable save-points? Not sure how this would work if story-progression isn't strictly linear.

### Low-Level Mechanics

- HTML global attributes
  - title
  - tabindex
  - draggable
  - dir
  - contenteditable
  - accesskey (?)

- CSS
  - `:target` This is super cool. I'll definitely use this.
  - media query on `script-enable`, `width`, `height`, and `print`.
  - resize
  - font-family
    - Make various custom fonts that look like another language. Then I can have dictionary items, where selecting them in the inventory and then hovering over some text will change the font-family. Maybe I can even be extra fancy and look into making ligatures.

### Causes

- selector based on validity, placeholder-shown

### Effects

- grid area / position / z-index
- user-select / pointer-events
- width / height

- A mouse following puzzle:
  - An element that can only complete an animation while being hovered.
  - The path must be cleared of other overlapping elements.

## Story Brainstorming

### Prompt Questions

- What kind of mood / atmosphere?
  - Ex.
    - Suspenseful
    - Calm / relaxed
  - This decision will affect:
    - Color palette
    - Background music
- What kind of common narratives do I want to be part of this game's story?
- .

### Item Ideas

- broken: flashlight
- dubious
- bland: crayon?
- scared: hamster
- expired: milk

#### Various Frogs

useless, unhelpful, uncooperative, upside-down, injured, delusional, confused, dead, dried up, multi-purpose, rickroll, stinky, wildcard, itchy.
