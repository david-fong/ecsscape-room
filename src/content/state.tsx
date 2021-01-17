import type { EnumDesc } from "./defs";
const style = require("./state.css.json") as typeof import("./state.css").default;

export namespace State {
	export function Has(p: EnumDesc) {
		return <input name={p.GroupId+"-has"} id={p.GroupId+"-has-"+p.id} type="checkbox" value={p.id} className={style.this}></input>;
	}
	export function Is(p: EnumDesc) {
		return <input name={p.GroupId+"-is"} id={p.GroupId+"-is-"+p.id} type="radio" value={p.id} className={style.this}></input>;
	}

	// Note: tabIndex must be -1 to prevent keyboard accessibility after
	// the has variable is set to true. If we had JS, we could disable
	// the has input when checked, but we don't have JS.
	export function LabelHas(p: EnumDesc) {
		return <label htmlFor={p.GroupId+"-has-"+p.id}>{p.displayName}</label>;
	}
	export function LabelIs(p: EnumDesc) {
		return <label htmlFor={p.GroupId+"-is-"+p.id}>{p.displayName}</label>;
	}
	/* TODO.impl emit these all to a css source file before running postCSS. */
	export function CssHas(p: EnumDesc) {
		// When the "acquire" label is clicked, this makes it disappear:
		return `#${p.GroupId+"-has-"+p.id} ~ player-top label[for="${p.GroupId+"-has-"+p.id}"] { display: initial; }`;
	}
}
Object.freeze(State);