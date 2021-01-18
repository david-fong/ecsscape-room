

export interface EnumDesc {
	/** Must only be specified for one entry in the group. */
	readonly default?: boolean;
	readonly field: string;
	readonly id: string;
	readonly title: string;
	readonly svgId: string;
}
export interface PlayerDesc extends EnumDesc {
	readonly field: "player";
	readonly id: string;
	readonly title: string;
	readonly items: readonly EnumDesc[];
}

function ItemEnumDescInit(
	owner: PlayerDesc["id"],
	min: { dName: string, svgId?: string, checked?: true },
	id: number,
): EnumDesc {
	return {
		field: `player${owner}-item`,
		id: id.toString(),
		default: min.checked,
		title: min.dName,
		svgId: min.svgId ?? min.dName.replace(/\s+/,"-"),
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
		default: min.checked,
		field: "player",
		id: index.toString(),
		title: min.displayName,
		svgId: "player" + index,
		items: min.items.map(ItemEnumDescInit.bind(null, id)),
	};
}));
