import type { EnumDesc } from "./types";
const  state_css = require( "./state.css.json") as typeof import( "./state.css").default;
const player_css = require("./player.css.json") as typeof import("./player.css").default;


export namespace State {
	export function Has(p: TU.Pikk<EnumDesc,"field"|"id"|"default">) {
		return <input
			type="checkbox" className={state_css.this} name={p.field+"-has"+p.id}
			defaultChecked={!!p.default} id={p.field+"-has-"+p.id} value={p.id}
		/>;
	}
	export function Is(p: TU.Pikk<EnumDesc,"field"|"id"|"default">) {
		return <input
			type="radio" className={state_css.this} name={p.field+"-is"}
			defaultChecked={!!p.default} id={p.field+"-is-"+p.id} value={p.id}
		/>;
	}

	// There can be multiple labels for the same input.
	export function LabelHas(p: TU.Pikk<EnumDesc,"field"|"id"|"title">) {
		CssRxn["label-has"].targets.push(p);
		return <label className={state_css.label} htmlFor={p.field+"-has-"+p.id}>{p.title}</label>;
	}
	// There can be multiple labels for the same input.
	export function LabelIs(p: TU.Pikk<EnumDesc,"field"|"id"|"title">) {
		CssRxn["label-is"].targets.push(p);
		return <label className={state_css.label} htmlFor={p.field+"-is-"+p.id}>{p.title}</label>;
	}
}
Object.freeze(State);


export namespace CssRxn {
	export interface Fields {
		/** @default "is" */
		dependsOn?: "has" | "is",
		mkTarget: (p: TU.Pikk<EnumDesc,"field"|"id">) => string;
		rule: string;
		targets: TU.Pikk<EnumDesc,"field"|"id">[],
	}
	// Note: This namespace can only contain type declarations.
}
export const CssRxn = Object.freeze({
	"label-has": {
		dependsOn: "has",
		mkTarget: (p) => `[for="${p.field+"-has-"+p.id}"].${state_css.label}`,
		rule: `{ display: none; }`,
	} as CssRxn.Fields,
	"label-is": {
		mkTarget: (p) => `[for="${p.field+"-is-"+p.id}"].${state_css.label}`,
		rule: `{ opacity: 1.0; }`,
	} as CssRxn.Fields,

	"player-top": {
		mkTarget: (p) => `[data-player-id="${p.id}"].${player_css.top}`,
		rule: `{ visibility: visible; }`,
	} as CssRxn.Fields,
});
for (const key in CssRxn) {
	const fields = CssRxn[key as keyof typeof CssRxn];
	fields.dependsOn ??= "is";
	fields.targets = [];
	Object.freeze(fields);
}
Object.freeze(CssRxn);

/**
 * Returns CSS that provides state bindings rules.
 *
 * This should only be considered complete once the JSX has been
 * fully rendered to HTML.
 */
export function CssRxnBindings(): string {
	return Object.entries(CssRxn).map(([id, desc]) => {
		if (desc.targets.length === 0) { return ""; }
		return desc.targets.map((p) => {
			const id = `${p.field}-${desc.dependsOn}-${p.id}`;
			return `:checked#${id} ~ * ${desc.mkTarget(p)}`;
		}).join(",\n") + `\n${desc.rule}`;
	}).join("\n\n");
};