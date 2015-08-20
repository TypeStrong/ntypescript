/**
 * This script is responsible for making required modifications to our version of TypeScript post build
 */

// Utilities
declare var require, __dirname;
var fs = require('fs');
var EOL: string = require('os').EOL;
export function readFile(filePath: string): string {
    return fs.readFileSync(__dirname + '/' + filePath, 'utf8');
}
export function writeFile(filePath: string, content: string) {
    fs.writeFileSync(__dirname + '/' + filePath, content);
}

// Read original files
var dtsOriginal = readFile('../bin/typescript.d.ts');
var jsOriginal = readFile('../bin/typescript.js');

// Setup final output destinations
var finalDtsLocation = '../bin/ntypescript.d.ts';
var finalJsLocation = '../bin/ntypescript.js';

// Setup final output
var finalDtsContent = dtsOriginal;
var finalJsContent = jsOriginal;

/**
 * Transform as needed
 */

// Add global import
finalDtsContent = finalDtsContent + EOL + `
declare module "ntypescript" {
    export = ts;
}
`;
// I think the `const enum` causes more pain than its worth for dev tools (everything needs to be rebuilt). So change to enum to prevent inlining
finalDtsContent = finalDtsContent.replace(/const enum /g, 'enum ');

// No need for `ts.executeCommandLine(ts.sys.args);` in ntypescript. Its called from `tsc` manually
finalJsContent = finalJsContent.replace(/ts.executeCommandLine\(ts\.sys\.args\);/g, '');

/**
 * Write out outputs
 */
writeFile(finalDtsLocation, finalDtsContent);
writeFile(finalJsLocation, finalJsContent);
