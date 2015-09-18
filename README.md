# NTypeScript

[![BuildStatus](https://travis-ci.org/TypeStrong/ntypescript.svg)](https://travis-ci.org/TypeStrong/ntypescript)

**Naughty** [**TypeScript**](https://github.com/Microsoft/TypeScript). Main motivation is to make it easier to work with the compiler API. Kudos to the TypeScript team for maintaining all the code that this project depends on. This project is just a minor automation on top.

Naughty list:

* Releases everyday.
* Consistent side by side usage (just add an `n` prefix): `require('ntypescript')`, `ntsc`
* `package.json` links you to typescript definitions (using `typescript.definition` entry)
* Super Naughty: We expose the internal APIs (the ones that have `/* internal */`)
* Super Naughty: We expose the global `ts` variable. Just `require('ntypescript')` once and start using `ts` like you are in the actual compiler source code.
* Super Naughty: Converts `const enum` in the compiler definition to `enum`. This decreases the typescript compiler version dependence on your dev tools TS->JS emit.
* Easier to muck around with the compiler / language service when installed from NPM. Just open any file from `node_modules/ntypescript/src` folder in atom-typescript and press `f6` to get a new *local* rebuild.

Design incompatibilities:
* This project does not ship with `tsserver`.

## Install
Similar to `typescript` you can install and use `ntypescript` globally:

``` sh
npm install ntypescript -g
```

or in your package.json

```sh
npm install ntypescript@latest --save --save-exact
```

Each release is named after the day it was built and the git commit hash in Microsoft/TypeScript/master that it was built from. We recommend adding `save-exact` as there are no guarantees on when stuff might break and you want your users to get the same version you tested.

## Usage

### Globally
You can use `ntsc` *exactly* like the `tsc` command line tool.

### Require
Use `require('ntypescript')`

### Global `ts`
In addition to returning what `typescript` returns we also expose `ts` as a global.

```ts
declare var require: any;
require('ntypescript');
console.log(ts.createScanner);
```
Which makes it easy to use the compiler API if you are using it heavily. Note you only need to `require` *once* from any file.

### Replace TypeScript
For `require('typescript')` you can do that quite simply using your package.json:

```json
"dependencies": {
    "typescript": "https://github.com/basarat/ntypescript/tarball/<release name>"
}
```
Release name example : `1.201506301047.1+e1c9d28cb0706f81c14ca95b92fa3e2a223cc60b`

### Grunt
This project comes with a built in `grunt` task called `ntypescript`. Just has just one *task* level option:

* `project` : path to the project directory i.e. the *directory* that contains `tsconfig.json`.

Here is a sample `Gruntfile.js` for usage:

```ts
module.exports = function(grunt) {
    grunt.loadNpmTasks('ntypescript');

    grunt.initConfig({
        ntypescript: {
            options: {
                project: '.'
            }
        },
    });

    grunt.registerTask('default', ['ntypescript']);
};
```

### NPM Scripts
Init and setup in `package.json`
```bash
npm init
npm install ntypescript@latest --save --save-exact
```
```json
"scripts": {
    "build": "ntsc -p ./src"
},
```
And then you just need to do the following to build your project:
```bash
npm run build
```

# About
Note that this is a personal endeavor, not officially by Microsoft.
