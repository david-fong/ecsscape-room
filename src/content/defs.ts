

export interface EnumDesc {
	readonly GroupId: string;
	readonly id: string;
	readonly displayName: string;
	readonly svgSpriteId: string;
}
export interface PlayerDesc {
	readonly id: number;
	readonly displayName: string;
	readonly items: readonly EnumDesc[];
}

function ItemEnumDescInit(
	owner: PlayerDesc["id"],
	min: { dName: string, svgId?: string },
	id: number,
): EnumDesc {
	return {
		GroupId: `player${owner}-item`,
		id: id.toString(),
		displayName: min.dName,
		svgSpriteId: min.svgId ?? min.dName.replace(/\s+/,"-"),
	}
}


const player1 = Object.freeze<PlayerDesc>({
	id: 0,
	displayName: "player1",
	items: ([
		{ dName: "froggy wallet" },
		{ dName: "", svgId: "" },
		{ dName: "", svgId: "" },
	]).map(ItemEnumDescInit.bind(null, 0)),
});

const player2 = Object.freeze<PlayerDesc>({
	id: 1,
	displayName: "player2",
	items: ([
		{ dName: "" },
		{ dName: "", svgId: "" },
		{ dName: "", svgId: "" },
	]).map(ItemEnumDescInit.bind(null, 1)),
});

export const players = Object.freeze([player1, player2]);
