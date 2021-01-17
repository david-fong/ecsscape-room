import { EnumDesc, PlayerDesc, players } from "./defs";
import player_css from "./player.css";

export namespace EnumJsx {
	export function Has(p: EnumDesc) {
		return <input name={p.GroupId+"-has"} id={p.GroupId+"-has-"+p.id} type="checkbox" value={p.id} className="state"></input>;
	}
	export function Is(p: EnumDesc) {
		return <input name={p.GroupId+"-is"} id={p.GroupId+"-is-"+p.id} type="radio" value={p.id} className="state"></input>;
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
Object.freeze(EnumJsx);

export function Player(p: PlayerDesc) {
    return <div key={p.id} className={player_css["top_stateful-wrapper"]}>
        {p.items.flatMap((item) => [
            <EnumJsx.Has key={item.id} {...item}/>,
            <EnumJsx.Is  key={item.id + p.items.length} {...item}/>,
        ])}
        <div className={player_css["top"]}>
            <div>
				{p.items.map((item) => <EnumJsx.LabelIs key={item.id} {...item}/>)}
			</div>
            <div></div>
        </div>
    </div>;
}
export namespace Player {
	export function Is(p: PlayerDesc) {
		return <input name="player-is" id={"player-is-"+p.id} type="radio" value={p.id} className="state"></input>;
	}
	export function LabelIs(p: PlayerDesc) {
		return <label htmlFor={"player-is-"+p.id}>{p.displayName}</label>
	}
	export function Picker(p: { players: readonly PlayerDesc[] }) {
		return <div>
			{players.map((p) => <Player.LabelIs key={p.id} {...p}/>)}
		</div>;
	}
}
Object.freeze(Player);
