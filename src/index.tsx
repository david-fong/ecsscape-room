import { players } from "./content/defs";
import { Player } from "./content/player";

export const Index = <body>
	{players.map((p) => <Player.Is key={p.id} {...p}/>)}
	{players.map((p) => {
		return <Player key={p.id} {...p}/>
	})}
	<Player.Picker players={players}/>
</body>;
