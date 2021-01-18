import type { EnumDesc } from "./defs";
const  state_css = require( "./state.css.json") as typeof import( "./state.css").default;
const player_css = require("./player.css.json") as typeof import("./player.css").default;


export namespace State {
	export function Has(p: TU.Pikk<EnumDesc,"GroupId"|"id"|"checked">) {
		// The value attribute is currently not used. Same for the Is component.
		return <input name={p.GroupId+"-has"} id={p.GroupId+"-has-"+p.id} type="checkbox" value={p.id} className={state_css.this} defaultChecked={p.checked}></input>;
	}
	export function Is(p: TU.Pikk<EnumDesc,"GroupId"|"id"|"checked">) {
		return <input name={p.GroupId+"-is"} id={p.GroupId+"-is-"+p.id} type="radio" value={p.id} className={state_css.this} defaultChecked={p.checked}></input>;
	}

	export function LabelHas(p: TU.Pikk<EnumDesc,"GroupId"|"id"|"displayName">) {
		LabelHas.CssSelectors.push(LabelHas.mkSel(p));
		return <label htmlFor={p.GroupId+"-has-"+p.id} className={state_css.label}>{p.displayName}</label>;
	}
	export function LabelIs(p: TU.Pikk<EnumDesc,"GroupId"|"id"|"displayName">) {
		LabelIs.CssSelectors.push(LabelIs.mkSel(p));
		return <label htmlFor={p.GroupId+"-is-"+p.id} className={state_css.label}>{p.displayName}</label>;
	}

	export namespace LabelHas {
		export function mkSel(p: TU.Pikk<EnumDesc,"GroupId"|"id">) {
			// When the "acquire" label is clicked, this makes it disappear:
			return `#${p.GroupId+"-has-"+p.id}:checked ~ * label[for="${p.GroupId+"-has-"+p.id}"]`;
		}
		export const CssSelectors: string[] = [];
	}
	export namespace LabelIs {
		export function mkSel(p: TU.Pikk<EnumDesc,"GroupId"|"id">) {
			return `#${p.GroupId+"-is-"+p.id}:checked ~ * label[for="${p.GroupId+"-is-"+p.id}"]`;
		}
		export const CssSelectors: string[] = [];
	}
	/**
	 * This should only be considered complete once the JSX has been
	 * fully rendered to HTML.
	 */
	export function CssBindings(): string {
		let retval = "";
		if (LabelHas.CssSelectors.length) {
			retval += LabelHas.CssSelectors.join(",\n") + "{ display: none; }";
		}
		if (LabelIs.CssSelectors.length) {
			retval += LabelIs.CssSelectors.join(",\n") + "{ opacity: 1.0; }";
		}
		return retval;
	};
}
Object.freeze(State);