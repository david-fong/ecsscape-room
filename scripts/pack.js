import path from "path";
require("ts-node").register({ project: path.resolve(__dirname, "../tsconfig.json") })
require("css-modules-require-hook")({}); // https://github.com/css-modules/css-modules-require-hook#usage

import process from "process";
import fs from "fs";
import stream from "stream";
import merge from "merge2";

import reactDom from "react-dom/server";
const IndexComponent = require("../src/index.tsx").Index;

const SRC_PATH  = (relative = "") => path.resolve(__dirname, "../src",  relative);
const DIST_PATH = (relative = "") => path.resolve(__dirname, "../dist", relative);
const MODE = (() => {
	const dev = process.env.NODE_ENV !== "production";
	return { dev, prod: !dev };
})();

merge(
	fs.createReadStream(SRC_PATH("head.html")),
	reactDom.renderToStaticNodeStream(IndexComponent),
	stream.Readable.from(["\n</html>"]),
)
.pipe(fs.createWriteStream(DIST_PATH("index.html"), {}))
.on("finish", () => {
	console.info("done.");
});