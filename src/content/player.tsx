import { PlayerDesc, players } from "./defs";
import { State } from "./state";
const  state_css = require( "./state.css.json") as typeof import( "./state.css").default;
const player_css = require("./player.css.json") as typeof import("./player.css").default;

export function Player(p: PlayerDesc) {
    return <div key={p.id} className={player_css["top_stateful-wrapper"]}>
        {p.items.flatMap((item) => [
            <State.Has key={item.id} {...item}/>,
            <State.Is  key={item.id + p.items.length} {...item}/>,
        ])}
        <div className={player_css["top"]}>
            <div>
				{p.items.map((item) => <State.LabelIs key={item.id} {...item}/>)}
			</div>
            <div></div>
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
			{players.map((p) => <Player.LabelIs key={p.id} {...p}/>)}
		</div>;
	}
}
Object.freeze(Player);