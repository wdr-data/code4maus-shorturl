const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

const inPath = path.join(__dirname, 'redirects.ejs');
const outPath = path.join(__dirname, 'site', '_redirects');

const domain = 'https://programmieren.wdrmaus.de';

ejs.renderFile(inPath, { domain }, (err, str) => {
    if (err) {
        console.error(err);
        return;
    }

    const outDir = path.dirname(outPath);
    try {
        const buildStat = fs.statSync(outDir);
        if (!buildStat.isDirectory) {
            throw new Error('No dir');
        }
    } catch(_) {
        fs.mkdirSync(outDir);
    }

    fs.writeFileSync(outPath, str);
    console.log("Template written to site/_redirects");
});
