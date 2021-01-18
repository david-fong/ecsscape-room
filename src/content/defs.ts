

export interface EnumDesc {
	/** Must only be specified for one entry in the group. */
	readonly checked?: boolean;
	readonly GroupId: string;
	readonly id: string;
	readonly displayName: string;
	readonly svgSpriteId: string;
}
export interface PlayerDesc extends EnumDesc {
	readonly GroupId: "player";
	readonly id: string;
	readonly displayName: string;
	readonly items: readonly EnumDesc[];
}

function ItemEnumDescInit(
	owner: PlayerDesc["id"],
	min: { dName: string, svgId?: string, checked?: true },
	id: number,
): EnumDesc {
	return {
		GroupId: `player${owner}-item`,
		id: id.toString(),
		checked: min.checked,
		displayName: min.dName,
		svgSpriteId: min.svgId ?? min.dName.replace(/\s+/,"-"),
	}
}

export const players = Object.freeze<PlayerDesc[]>(([
	{
		checked: true,
		displayName: "player1",
		items: ([
			{ dName: "froggy wallet" },
			{ dName: "", svgId: "" },
			{ dName: "", svgId: "" },
		]),
	}, {
		displayName: "player2",
		items: ([
			{ dName: "" },
			{ dName: "", svgId: "" },
			{ dName: "", svgId: "" },
		]),
	}
]).map<PlayerDesc>((min, index) => {
	const id = index.toString();
	return {
		checked: min.checked,
		GroupId: "player",
		id: index.toString(),
		displayName: min.displayName,
		svgSpriteId: "player" + index,
		items: min.items.map(ItemEnumDescInit.bind(null, id)),
	};
}));
