import type { EnumDesc, PlayerDesc } from "content/defs";


function ItemEnumDescInit(
	owner: PlayerDesc["id"],
	min: { title: string, svgId?: string, default?: true },
	id: number,
): EnumDesc {
	return {
		field: `player${owner}-item`,
		id: id.toString(),
		default: min.default,
		title: min.title,
		svgId: min.svgId ?? min.title.replace(/\s+/,"-"),
	}
}

export const players = Object.freeze(<PlayerDesc[]>([
	{
		default: true,
		displayName: "player1",
		items: ([
			{ title: "unhelpful frog" },
			{ title: "tooltip thingy", svgId: "" },
			{ title: "bland crayon", svgId: "" },
		]),
	}, {
		displayName: "player2",
		items: ([
			{ title: "broken flashlight" },
			{ title: "ping-pong ball", svgId: "" },
			{ title: "<redacted>", svgId: "" },
		]),
	}
]).map<PlayerDesc>((min, index) => {
	const id = index.toString();
	return {
		default: min.default,
		field: "player",
		id: index.toString(),
		title: min.displayName,
		svgId: "player" + index,
		items: min.items.map(ItemEnumDescInit.bind(null, id)),
	};
}));