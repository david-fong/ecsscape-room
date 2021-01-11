import React from "react";

function LocHiddenRadio(prop) {
	const { id } = prop;
	return <input type="radio" tabIndex="-1" name={id} id={"loc-goto-"+id}></input>;
}

const locs = [{ id: "0" }];

export const Index = <body>
{locs.map((loc) => <LocHiddenRadio key={loc.id} id={loc.id}/>)}
</body>;