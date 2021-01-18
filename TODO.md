
# Things To Do

Start working on layout and z-index.

Add cssnano to the build process when I'm ready to do a test release.

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

### Interesting Cause-Effect Combinations
