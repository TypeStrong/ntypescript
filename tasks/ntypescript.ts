/*
 * ntypescript
 * https://github.com/basarat/ntypescript
 *
 * Copyright (c) 2015 Basarat Syed
 * Licensed under the MIT license.
 */

function gruntPlugin(grunt) {
    grunt.registerMultiTask('ntypescript', 'TypeScript grunt plugin', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            tsconfig: '.'
        });

        var done = this.async();
        grunt.util.spawn({
            cmd: process.execPath,
            args: `-p ${options.tsconfig}`
        }, (error, result, code: number) => {
            grunt.log(result.stdout);
            done(!!code);
        });
    });
};

export = gruntPlugin;