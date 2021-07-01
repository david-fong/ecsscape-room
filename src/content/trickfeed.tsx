const util_css = require("../style/util.css.json") as typeof import("../style/util.css").default;
const feed_css = require("./trickfeed.css.json") as typeof import("./trickfeed.css").default;

export interface TrickFeedChildDesc {
	readonly id: number;
}
export interface TrickFeedDesc {
	readonly children: readonly TrickFeedChildDesc[];
}

export namespace TrickFeed {
}
export function TrickFeed(p: TrickFeedDesc) {
	const children = [...p.children];
	children.unshift(...children.splice(-1));
	return <span className={[util_css["hide-scrollbars"], feed_css.trickfeed].join(" ")}>
		{children.map((child) => <div key={child.id} className={feed_css.item}>{child.id}</div>)}
	</span>
}