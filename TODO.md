
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

- HTML Form / REST server component?
  - Clientside HTML wrapped by a form element
    - Multiple submission buttons set the `formaction` attribute to communicate with various serverside actions.

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

## Development Notes / Practices

- With JSX, for highly used elements, sort attributes by how common they are between instances. This should improve compression. But for CSS, always put the most discriminating part of the selector as far right as possible.
