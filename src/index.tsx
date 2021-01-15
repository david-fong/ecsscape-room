
function mkProto<T extends object>(proto: T): Readonly<T> {
	return Object.freeze(Object.assign(Object.create(null), proto));
}

export interface RadioStateDesc extends RadioStateDesc.Proto, RadioStateDesc.Inst {}
export namespace RadioStateDesc {
	export interface Proto {
		readonly htmlIdPrefix: string;
	}
	export interface Inst {
		readonly id: string;
		readonly displayName: string;
		readonly svgSpriteId: string;
	}
}
function LocHiddenRadio(p: RadioStateDesc) {
	return <input type="radio" name={p.id} id={`${p.htmlIdPrefix}-goto-${p.id}`} tabIndex={-1}></input>;
}



const ItemProto = mkProto({
	htmlIdPrefix: "item",
} as const);

const itemDescs = ([
	{ displayName: "", svgSpriteId: "" },
] as RadioStateDesc.Inst[]).map((desc, index) => {
	return Object.assign(Object.create(ItemProto), desc, { id: index }) as RadioStateDesc;
});

export const Index = <body className="top">
	{itemDescs.map((loc) => <LocHiddenRadio key={loc.id} {...loc}/>)}
</body>;