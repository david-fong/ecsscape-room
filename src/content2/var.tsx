import { RuleBuilders, RuleBuilder } from "./css-bindings";
const  var_css = require( "./var.css.json") as typeof import( "./var.css").default;
// Styles:
// Accumulated active abilities (key items)
// Consumable items / environment state

/** A glorified combo-box. */
export interface Var {
	readonly index: number;
	readonly id: string;
	readonly title: string;
	readonly vals: readonly Val[];
}
export namespace Var {
	export interface ToplevelMkArgs {
		title: string;
		vals: readonly Val.ToplevelMkArgs[];
		default?: number;
	}
	export function mk(scopeId: string, index: number, args: ToplevelMkArgs): Var {
		const varId = `${scopeId}_var${index}`;
		if (args.default !== undefined && args.default >= args.vals.length) {
			throw new Error(`${varId}: default val ${args.default} is invalid.`);
		}
		const it: Var = {
			index: index,
			id: varId,
			title: args.title,
			vals: args.vals.map((args_, index_) => Val.mk(varId, index_, args_, {
				isDefault: index_ === args.default,
			})),
		};
		return Object.freeze(it);
	}
}


/** */
export interface Val {
	readonly index: number;
	/* Usable as an html id or form control name. */
	readonly id: string;
	readonly title: string;
	el: {
		readonly destroy: JSX.Element;
		readonly enable: JSX.Element;
		readonly select: JSX.Element;
		readonly labelForDestroy: () => JSX.Element;
		readonly labelForEnable: () => JSX.Element;
		readonly labelForSelect: () => JSX.Element;
	};
}
export namespace Val {
	export const CssRules = {
		labelEnable_enforceOnce: {
			selectors: [],
			declarations: "display: none;",
		} as RuleBuilder,
	};
	Object.values(CssRules).forEach((b) => RuleBuilders.push(b));

	export interface ToplevelMkArgs {
		title: string;
		/** @default false */
		defaultEnabled?: true;
	}
	export interface CalcMkArgs {
		isDefault: boolean;
	}
	export function mk(varId: string, index: number, tArgs: ToplevelMkArgs, calcArgs: CalcMkArgs): Val {
		const valId = `${varId}_val${index}`;
		const id = { destroy: valId + "_destroy", enable: valId + "_enable", select: valId + "_enable" };
		CssRules.labelEnable_enforceOnce.selectors.push(`#${id.enable}:checked ~ * label[for=${id.enable}]`);
		const it: Val = {
			index: index,
			id: valId,
			title: tArgs.title,
			el: {
				destroy: <input id={id.destroy} name={id.destroy} type="checkbox" defaultChecked={false}/>,
				enable:  <input id={id.enable } name={id.enable } type="checkbox" defaultChecked={!!tArgs.defaultEnabled}/>,
				select:  <input id={id.select } name={id.select } type="radio"    defaultChecked={calcArgs.isDefault}/>,
				labelForDestroy: () => (<label htmlFor={id.destroy}>Destroy {tArgs.title}</label>),
				labelForEnable:  () => (<label htmlFor={id.enable }>Enable {tArgs.title}</label>),
				labelForSelect:  () => (<label htmlFor={id.select }>Select {tArgs.title}</label>),
			},
		};
		Object.freeze(it.el);
		return Object.freeze(it);
	}
}


/** */
export interface VarScope {
	readonly index: number;
	readonly id: string;
	readonly vars: readonly Var[];
	readonly nest: readonly VarScope[];
}
export namespace VarScope {
	export interface ToplevelMkArgs {
		vars: readonly Var.ToplevelMkArgs[];
		nest: readonly ToplevelMkArgs[];
	}
	export function mk(parentId: string, index: number, args: ToplevelMkArgs): VarScope {
		const scopeId = (parentId || "varscope") + `-${index}`;
		const it: VarScope = {
			index: index,
			id: scopeId,
			vars: args.vars.map((args_, index_) => Var.mk(scopeId, index_, args_)),
			nest: args.nest.map((args_, index_) => mk(scopeId, index_, args_)),
		};
		return Object.freeze(it);
	}
}