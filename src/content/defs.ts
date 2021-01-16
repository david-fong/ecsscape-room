
export interface EnumDesc {
	readonly id: string;
	readonly displayName: string;
	readonly svgSpriteId: string;
	readonly HtmlIdHas: string;
	readonly HtmlIdIs: string;
}
export interface PlayerDesc {
	readonly id: number;
	readonly displayName: string;
	readonly items: readonly EnumDesc[];
}


export const player1 = Object.freeze<PlayerDesc>({
	id: 0,
	displayName: "",
	items: ([
		{ dName: "froggy wallet" },
		{ dName: "", svgId: "" },
		{ dName: "", svgId: "" },
	]).map((desc, index) => {
		return {
			HtmlIdHas: "item-has-" + index,
			HtmlIdIs:  "item-is-"  + index,
			id: index.toString(),
			displayName: desc.dName,
			svgSpriteId: desc.svgId ?? desc.dName.replace(/\s+/,"-"),
		} as EnumDesc;
	}),
});
