import path from "path";
const SRC_PATH  = (rel = "") => path.resolve(__dirname, "../src",  rel);
const DIST_PATH = (rel = "") => path.resolve(__dirname, "../dist", rel);
const MODE = (() => {
	const dev = process.env.NODE_ENV !== "production";
	return { dev, prod: !dev };
})();

require("ts-node").register({ project: path.resolve(__dirname, "../tsconfig.json") });
require("css-modules-require-hook")({
	// https://github.com/css-modules/css-modules-require-hook#usage
	generateScopedName: "[local]_[hash:base64:5]",
});

import process from "process";
import fs from "fs";
import stream from "stream";
import merge from "merge2";

import ReactDom from "react-dom/server";
const IndexComponent = require("../src/index.tsx").Index;

merge(
	fs.createReadStream(SRC_PATH("head.html")),
	ReactDom.renderToStaticNodeStream(IndexComponent),
	stream.Readable.from(["\n</html>"]),
)
.pipe(fs.createWriteStream(DIST_PATH("index.html"), {}))
.on("finish", () => {
	console.info("done.");
});