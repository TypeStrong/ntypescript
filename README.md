# NTypeScript
Nightly build snapshots of [Microsoft/TypeScript](https://github.com/Microsoft/TypeScript).

Niceties:

* Automatic builds
* `package.json` links you to typescript definitions (using `typescript.definition` entry)
* We expose the internal APIs

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
You can use `ntsc` command line (similar to `tsc` from the official repo) and `ntsserver` (similar to official `tsserver`).

### Require
Use `require('ntypescript')` (instead of `require('typescript')`).

# About
Note that this is a personal endeavor, not officially by Microsoft.
