import path from "path";
import fs from "fs";
import process from "process";
import stream from "stream";
import merge from "merge2";

const SRC_PATH  = (rel = "") => path.resolve(__dirname, "../src",  rel);
const DIST_PATH = (rel = "") => path.resolve(__dirname, "../dist", rel);
const MODE = (() => {
	const dev = process.env.NODE_ENV !== "production";
	return { dev, prod: !dev };
})();

require("ts-node").register({
	project: path.resolve(__dirname, "../tsconfig.json"),
});
const cssLocalIdent = MODE.dev ? "[local]_[hash:base64:5]" : "[hash:base64:7]";
require("css-modules-require-hook")({
	// https://github.com/css-modules/css-modules-require-hook#usage
	generateScopedName: cssLocalIdent,
});

// =========================================================================

import postcss from "postcss";
const postcssPromise = postcss([
	require("postcss-import")({
		root: SRC_PATH(),
	}),
	require("postcss-modules")({
		generateScopedName: cssLocalIdent,
	}),
])
.process("@import 'index.css'", {
	from: SRC_PATH("index.css"),
	to: DIST_PATH("index.css"),
})
.then(async (result) => {
	const writePromise = new Promise((resolve) => {
		fs.writeFile(result.opts.to, result.css, resolve);
	});
	console.info("postcss warnings:");
	console.info(result.warnings());
	return await writePromise;
})
.catch((reason) => {
	setImmediate(() => { throw reason; });
});


// =========================================================================


import ReactDom from "react-dom/server";
const IndexComponent = require("../src/index.tsx").Index;

postcssPromise.then(() => {
	merge(
		fs.createReadStream(SRC_PATH("head.html")),
		ReactDom.renderToStaticNodeStream(IndexComponent),
		stream.Readable.from(["\n</html>"]),
	)
	.pipe(fs.createWriteStream(DIST_PATH("index.html"), {}))
	.on("finish", () => {
		console.info("\ndone.");
	});
}).catch((reason) => {
	setImmediate(() => { throw reason; });
});
