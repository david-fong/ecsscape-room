require("@babel/register")({});
import process from "process";
import path from "path";
import fs from "fs";
import stream from "stream";
import reactDom from "react-dom/server";
const IndexComponent = require("../src/index.jsx").Index;

/** @param {stream.Readable[]} streams */
function mergeStreams(...streams) {
	let p = new stream.PassThrough();
	let waiting = streams.length;
	for (const stream of streams) {
		p = stream.pipe(p, { end: (waiting-- === 0) });
	}
	return p;
}

const SRC_PATH  = (relative = "") => path.resolve(__dirname, "../src",  relative);
const DIST_PATH = (relative = "") => path.resolve(__dirname, "../dist", relative);
const MODE = (() => {
	const dev = process.env.NODE_ENV !== "production";
	return { dev, prod: !dev };
})();

mergeStreams(
	// TODO.learn why isn't the order working? Should I just install a library?
	fs.createReadStream(SRC_PATH("index.html")),
	reactDom.renderToStaticNodeStream(IndexComponent),
	stream.Readable.from(["\n</html>"]),
)
.pipe(fs.createWriteStream(DIST_PATH("index.html"), {}))
.on("finish", () => {
	console.info("finished compiling react to markup.");
});