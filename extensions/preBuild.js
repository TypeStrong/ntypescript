var fs = require('fs');
var EOL = require('os').EOL;
function readFile(filePath) {
    return fs.readFileSync(__dirname + '/' + filePath, 'utf8');
}
exports.readFile = readFile;
function writeFile(filePath, content) {
    fs.writeFileSync(__dirname + '/' + filePath, content);
}
exports.writeFile = writeFile;
var lineFixes = [{
        fileName: '../src/compiler/program.ts',
        orig: "export function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModule {",
        new: "export var resolveModuleName = (moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModule => {"
    }];
for (var _i = 0; _i < lineFixes.length; _i++) {
    var fix = lineFixes[_i];
    writeFile(fix.fileName, readFile(fix.fileName).replace(fix.orig, fix.new));
}
