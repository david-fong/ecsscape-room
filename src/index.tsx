import { player1 } from "./content/defs";
import { Player } from "./content/player";

export const Index = <body>
	{/* TODO.impl global state here. */}
	{[player1,].map((player) => {
		return <Player key={player.id} {...player}/>
	})}
	{/* TODO.impl player-independent UI parts (ex. switch player radio menu 🥁) */}
</body>;
