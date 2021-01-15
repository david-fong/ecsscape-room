
export interface EnumDesc {
	readonly id: string;
	readonly displayName: string;
	readonly svgSpriteId: string;
	readonly HtmlIdHas: string;
	readonly HtmlIdIs: string;
}


export const player1 = Object.freeze({
	id: 0,
	displayName: "",
	items: ([
		{ dName: "froggy wallet", svgId: "" },
		{ dName: "", svgId: "" },
		{ dName: "", svgId: "" },
	] as const).map((desc, index) => {
		return {
			HtmlIdHas: "item-has-" + index,
			HtmlIdIs:  "item-is-"  + index,
			id: index.toString(),
			displayName: desc.dName,
			svgSpriteId: desc.svgId,
		} as EnumDesc;
	}),
} as const);
