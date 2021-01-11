const process = require("process");
const path = require("path");
const fs = require("fs");

require("@babel/register")({});
const reactDom = require("react-dom/server");
const IndexComponent = require("../src/index.jsx").Index;

// import process from "process";
// import path from "path";
// import fs from "fs";

// require("@babel/register")({});
// import reactDom from "react-dom/server";
// import IndexComponent from "../src/index.jsx";

//const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const SRC_PATH  = (relative = "") => path.resolve(__dirname, "../src",  relative);
const DIST_PATH = (relative = "") => path.resolve(__dirname, "../dist", relative);
const MODE = (() => {
    const dev = process.env.NODE_ENV !== "production";
    return { dev, prod: !dev };
})();

reactDom.renderToStaticNodeStream(IndexComponent)
.pipe(fs.createWriteStream(DIST_PATH("index.html"), {}))
.on("finish", () => {
    console.info("finished compiling react to markup.");
});