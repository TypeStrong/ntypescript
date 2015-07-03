# NTypeScript

[![BuildStatus](https://travis-ci.org/basarat/ntypescript.svg)](https://travis-ci.org/basarat/ntypescript)

Nightly build snapshots of [Microsoft/TypeScript](https://github.com/Microsoft/TypeScript).

Niceties:

* Automatic builds
* `package.json` links you to typescript definitions (using `typescript.definition` entry)
* We expose the internal APIs
* Consistent side by side usage (just add an `n` prefix): `require('ntypescript')`, `ntsc`, `ntsserver`

## Install
Similar to `typescript` you can install and use `ntypescript` globally:

``` sh
npm install ntypescript -g
```

or in your package.json

```sh
npm install ntypescript --save
```

Each release is named after the day it was built and the git commit hash in Microsoft/TypeScript/master that it was built from.

## Usage

### Globally
You can use `ntsc` and the `ntsserver` command line tools.

### Require
Use `require('ntypescript')`

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
### Keeping it updated
Because of the limited testing we do you might want to stick to *fixed* version numbers and then update using: 

```bash
npm install ntypescript@latest --save --force
```

# About
Note that this is a personal endeavor, not officially by Microsoft.
