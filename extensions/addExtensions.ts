/**
 * This script is responsible for making required modifications to our version of TypeScript
 */
declare var require, __dirname;
var fs = require('fs');
var EOL: string = require('os').EOL;
function readFile(filePath: string): string {
    return fs.readFileSync(__dirname + '/' + filePath, 'utf8');
}
function writeFile(filePath: string, content: string) {
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
