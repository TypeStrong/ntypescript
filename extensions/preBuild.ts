/**
 * Make modifications to typescript source pre build
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


var lineFixes = [{
    fileName: '../src/compiler/program.ts',
    orig: `export function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModule {`,
    new: `export var resolveModuleName = (moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModule => {`
}];

for (let fix of lineFixes) {
    writeFile(fix.fileName, readFile(fix.fileName).replace(fix.orig, fix.new));
}


