import process from "process";
import path from "path";
import url from "url";
import fs from "fs";
import ejs from "ejs";
import sass from "sass";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
function SRC_PATH(relative = "") {
    return path.resolve(__dirname, "../src", relative);
}
function DIST_PATH(relative = "") {
    return path.resolve(__dirname, "../dist", relative);
}
const MODE = (() => {
    const dev = process.env.NODE_ENV !== "production";
    return { dev, prod: !dev };
})();


ejs.renderFile(SRC_PATH("index.ejs"), {
    stations: [],
    cars: [],
}, {
    root: SRC_PATH(),
    strict: true,
    compileDebug: MODE.dev,
    rmWhitespace: MODE.prod,
}, (err, str) => {
    if (err) {
        console.error(err);
        return;
    }
    fs.writeFileSync(DIST_PATH("index.html"), str, {
        encoding: "utf-8",
    }, () => {
        console.log("done ejs rendering");
    });
});

sass.renderSync({
    file: SRC_PATH("index.scss"),
    outFile: DIST_PATH("index.css"),
    indentType: "tab", indentWidth: 1,
    sourceMap: MODE.dev,
    outputStyle: MODE.dev ? "expanded" : "compressed",
});