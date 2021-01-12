
function LocHiddenRadio(prop) {
	const { which, id } = prop;
	return <input type="radio" tabIndex="-1" name={id} id={`${which}-goto-${id}`} style={{display:"none"}}></input>;
}

const locs = [
	{ id: "0" },
	{ id: "1" },
	{ id: "2" },
];

export const Index = <body className="top">
	{locs.map((loc) => <LocHiddenRadio key={loc.id} which="loc" {...loc}/>)}
</body>;