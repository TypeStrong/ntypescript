# NTypeScript

![BuildStatus](https://travis-ci.org/basarat/ntypescript.svg)

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

# About
Note that this is a personal endeavor, not officially by Microsoft.
