import type { PlayerDesc } from "./defs";
import style from "./player.m.css";
import { EnumJsx } from "..";

export function Player(p: PlayerDesc) {
    return <div key={p.id} className="player-top_state-wrapper">
        {p.items.flatMap((desc) => [
            <EnumJsx.Has key={desc.id} {...desc}/>,
            <EnumJsx.Is  key={desc.id + p.items.length} {...desc}/>,
        ])}
        <div className={style["player-top"]}>
            <div className="player-top-"></div>
            <div></div>
        </div>
    </div>;
}