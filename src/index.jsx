
function LocHiddenRadio(prop) {
	const { which, id } = prop;
	return <input type="radio" name={id} id={`${which}-goto-${id}`} tabIndex="-1"></input>;
}

const locs = [
	{ id: "0" },
	{ id: "1" },
	{ id: "2" },
];

export const Index = <body className="top">
	{locs.map((loc) => <LocHiddenRadio key={loc.id} which="loc" {...loc}/>)}
</body>;