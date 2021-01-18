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
const cssLocalIdent = MODE.dev ? "[name]__[local]" : "[hash:base64:7]";

// =========================================================================

import postcss from "postcss";
const postcssPromise = postcss([
	require("postcss-import")({
		root: SRC_PATH(),
		plugins: [
			require("postcss-modules")({
				root: SRC_PATH(),
				generateScopedName: cssLocalIdent,
			}),
		],
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

postcssPromise.then(() => {
	require("ts-node").register({
		project: path.resolve(__dirname, "../tsconfig.json"),
	});
	const IndexComponent = require("../src/index").Index;

	merge(
		fs.createReadStream(SRC_PATH("head.html")),
		require("react-dom/server").renderToStaticNodeStream(IndexComponent),
		stream.Readable.from(["\n</html>"]),
	)
	.pipe(fs.createWriteStream(DIST_PATH("index.html"), {}))
	.on("finish", () => {
		console.info("\ndone rendering HTML from JSX.");

		fs.writeFileSync(
			DIST_PATH("bindings.css"),
			require("../src/content/state").State.CssBindings(),
		);
		console.info("\ndone emitting state-binding css rules.");
	});
}).catch((reason) => {
	setImmediate(() => { throw reason; });
});