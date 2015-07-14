var fs = require('fs');
var EOL = require('os').EOL;
function readFile(filePath) {
    return fs.readFileSync(__dirname + '/' + filePath, 'utf8');
}
function writeFile(filePath, content) {
    fs.writeFileSync(__dirname + '/' + filePath, content);
}
var dtsWithGlobal = readFile('../bin/typescriptServices.d.ts');
var dtsWithNameSpace = readFile('../bin/typescript.d.ts').replace(/"typescript"/g, '"ntypescipt"');
var dtsExtensionsGlobal = readFile('./extensions.d.ts');
var dtsExtensionsWithNameSpace = dtsExtensionsGlobal.replace(/declare module ts/g, 'declare module "ts"');
var jsOriginal = readFile('../bin/typescript.js');
var jsExtensions = readFile('./extensions.js');
var finalDtsLocation = '../bin/ntypescript.d.ts';
var finalJsLocation = '../bin/ntypescript.js';
var finalDtsContent = dtsWithGlobal + EOL + dtsWithNameSpace + EOL + dtsExtensionsGlobal + EOL + dtsExtensionsWithNameSpace;
var finalJsContent = jsOriginal + EOL + jsExtensions;
writeFile(finalDtsLocation, finalDtsContent);
writeFile(finalJsLocation, finalJsContent);
