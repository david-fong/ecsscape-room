import type { PlayerDesc } from "./types";
import { Editable } from "./editable";
import { CssRxn, State } from "./state";
const player_css = require("./player.css.json") as typeof import("./player.css").default;

/**
 */
export function Player(p: PlayerDesc) {
	CssRxn["player-top"].targets.push(p);
	return <div key={p.id} className={player_css["top_stateful-wrapper"]}>
		{p.items.flatMap((item) => [
			<State.Has key={item.id} {...item}/>,
			<State.Is  key={item.id + p.items.length} {...item}/>,
		])}
		<div data-player-id={p.id} className={player_css["top"]}>
			<div>
				{p.items.map((item) => <State.LabelIs key={item.id} {...item}/>)}
			</div>
			<div>
				<Editable placeholder="<deleted>"/>
			</div>
		</div>
	</div>;
}
export namespace Player {
	export function Is(p: PlayerDesc) {
		return <State.Is {...p}/>;
	}
	export function LabelIs(p: PlayerDesc) {
		return <State.LabelIs {...p}/>;
	}
	export function Picker(p: { players: readonly PlayerDesc[] }) {
		return <div className={player_css.picker}>
			{p.players.map((p) => <Player.LabelIs key={p.id} {...p}/>)}
		</div>;
	}
}
Object.freeze(Player);