/// <reference path="./bin/typescriptServices.d.ts"/>
var t = require('./bin/typescript.js');
var fileExtension = ['.ts', '.tsx'];
exports.isTypeScript = function (file) {
    var r = new RegExp("\\.(" + fileExtension.join("|") + ")$");
    return r.test(file);
};
var fs = require('fs');
function loadFile(module, filename) {
    var configFile = t.findConfigFile(filename);
    var compilerOpts = {
        module: 1,
        target: 1
    };
    if (configFile) {
        var configFileContents = t.readConfigFile(configFile);
        var opts = configFileContents.config;
        opts.files = [];
        compilerOpts = t.parseConfigFile(opts, null, process.cwd()).options;
    }
    var js = t.transpile(fs.readFileSync(filename, 'utf8'), compilerOpts);
    module._compile(js, filename);
}
exports.loadFile = loadFile;
if (require.extensions) {
    for (var _i = 0; _i < fileExtension.length; _i++) {
        var ext = fileExtension[_i];
        require.extensions[ext] = loadFile;
    }
}
var child_process = require('child_process');
if (child_process) {
    var fork = child_process.fork;
    var binary = require.resolve('./bin/tse');
    child_process.fork = function (path, args, options) {
        if (exports.isTypeScript(path)) {
            if (!Array.isArray(args)) {
                options = args || {};
                args = [];
            }
            args = [path].concat(args);
            path = binary;
        }
        fork(path, args, options);
    };
}
