const path = require("path");

const folders = new Set();


function svgrIndexTemplate(filePaths) {
    filePaths.forEach((folder) => {
        const parentFolder = path.basename(path.dirname(folder.path));
        if(parentFolder !== "icons") folders.add(parentFolder);
    });

    const imports = filePaths.map((file) => {
        const filePath = typeof file === "string" ? file : file.path;
        const basename = path.basename(filePath, path.extname(filePath));
        const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;

        const parentFolder = path.basename(path.dirname(filePath));
        if(parentFolder !== "icons") folders.add(parentFolder);

        return `export { default as ${exportName}Icon } from './${basename}';`;
    });

    const parentFolder = path.basename(path.dirname(filePaths[0].path));
    if(parentFolder === "icons") {
        return [...imports, ...Array.from(folders).map((folder) => `export * from './${folder}';`)].join("\n");
    }

    return [...imports].join("\n");
}

module.exports = svgrIndexTemplate;
