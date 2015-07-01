/*
 * ntypescript
 * https://github.com/basarat/ntypescript
 *
 * Copyright (c) 2015 Basarat Syed
 * Licensed under the MIT license.
 */
function gruntPlugin(grunt) {
    grunt.registerMultiTask('ntypescript', 'TypeScript grunt plugin', function () {
        var options = this.options({
            tsconfig: '.'
        });
        var done = this.async();
        grunt.util.spawn({
            cmd: process.execPath,
            args: "-p " + options.tsconfig
        }, function (error, result, code) {
            grunt.log(result.stdout);
            done(!!code);
        });
    });
}
;
module.exports = gruntPlugin;
