import type { EnumDesc, PlayerDesc } from "./defs";
import style from "./player.css";

export namespace EnumJsx {
	export function Has(p: EnumDesc) {
		return <input name={p.id} id={p.HtmlIdHas} tabIndex={-1} type="checkbox"></input>;
	}
	export function Is(p: EnumDesc) {
		return <input name={p.id} id={p.HtmlIdIs} tabIndex={-1} type="radio"></input>;
	}

	// Note: tabIndex must be -1 to prevent keyboard accessibility after
	// the has variable is set to true. If we had JS, we could disable
	// the has input when checked, but we don't have JS.
	export function LabelHas(p: EnumDesc) {
		return <label htmlFor={p.HtmlIdHas} tabIndex={-1}></label>;
	}
	export function LabelIs(p: EnumDesc) {
		return <label htmlFor={p.HtmlIdIs} tabIndex={-1}></label>;
	}
	/* TODO.impl emit these all to a css source file before running postCSS. */
	export function CssHas(p: EnumDesc) {
		// When the "acquire" label is clicked, this makes it disappear:
		return `#${p.HtmlIdHas} ~ player-top label[for="${p.HtmlIdHas}"] { display: initial; }`;
	}
}

export function Player(p: PlayerDesc) {
    return <div key={p.id} className={style["player-top_state-wrapper"]}>
        {p.items.flatMap((desc) => [
            <EnumJsx.Has key={desc.id} {...desc}/>,
            <EnumJsx.Is  key={desc.id + p.items.length} {...desc}/>,
        ])}
        <div className={style["player-top"]}>
            <div></div>
            <div></div>
        </div>
    </div>;
}
