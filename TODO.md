
# Things To Do

Start working on layout and z-index.

- Add cssnano to the build process when I'm ready to do a test release.
- If I want git to delta-compress my generated html, install stream-replace to modify ReactDom.render... to prepend a newline character before starting angle brackets.
- Use css `:is` when it gets widely supported.

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

### Story

- JS is really cocky and thinks they can do everything without HTML and CSS. They like to summon clones of themselves through workers to show off things like the CSS paint api.
- JS gets trapped in a while-true loop with a try-catch stack overflow that just logs the error (HTML tricks them into running a script).
  - A while-true loop will block the event loop until it gets broken. The only way to break it is to hit a break statement, or leave an inner error uncaught. If the body is empty, then as far as I know, there's no way to save the tab except closing it. I don't think it's even possible to save it through use of current browser devtools.
- To prevent the "kill-page or wait" dialog from appearing, HTML and CSS render the entire site and all reactive components without JS, and pause the JS engine (pausing it is required to prevent the main thread from hanging and reactivity being completely lost. note that pausing the main thread does not prevent execution of some code in the console).
  - TODO: Story writing: why do they try to save JS?
    - Because they're forgiving?
    - Because they know that JS will always be a significant part of the future of the web.
    - Because somehow their lives depend on it?
- HTML summons a worker asking for help. The worker arrives expecting to have been summoned by JS to do more show-offing, but it's surprised to realize that there's no communication happening over the postMessage line. The worker can't interact with the main thread since it's paused, and it can't communicate with HTML, but it [can communicate with CSS](https://developers.google.com/web/updates/2018/01/paintapi).
- The worker tells them they can break the loop by redefining a function called inside the loop's inner catch block to throw an exception.
- Somehow in the process, HTML and CSS learn that JS is under incredible pressure to take up huge responsibilities that it was never originally designed for. They gain some sympathy for JS.
  - Perhaps the worker tells them.
- Upon breaking the loop,
  - JS sees the entire site built with HTML and CSS and stands in awe and shame for their pride.
  - HTML apologizes, and CSS assures JS that they are all a team and they always will be- that JS doesn't have to do everything. The web needs them all together, and combined, they are better than the sum of their parts.

#### More Info

- https://en.wikipedia.org/wiki/Cross-site_scripting#Exploit_examples
- https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work#parsing

## Development Notes / Practices

- With JSX, for highly used elements, sort attributes by how common they are between instances. This should improve compression. But for CSS, always put the most discriminating part of the selector as far right as possible.
