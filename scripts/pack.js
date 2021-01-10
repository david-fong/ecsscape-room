import path from "path";
import ejs from "ejs";
import sass from "sass";

function SRC_PATH(relative) {
    return path.resolve(__dirname, "../src", relative);
}

ejs.renderFile(SRC_PATH("index.ejs"), {
}, {
    strict: true,
}, (err, str) => {
    ;
});

sass.renderSync({
    file: ""
});
