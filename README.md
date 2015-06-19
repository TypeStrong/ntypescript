# TSC
Regularly-built snapshots of [Microsoft/TypeScript](https://github.com/Microsoft/TypeScript).

This is meant to be used as pre-release builds if you want to try the compiler / compiler API out but don't care to build it yourself. Note that this is a personal endeavor, not officially by Microsoft.

Some niceties: 

* `package.json` links you to typescript definitions
* We expose the internal APIs


## Install
Similar to `typescript` you can install and use `tsc` globally:

``` sh
npm install tsc -g
```

or in your package.json

```sh
npm install tsc --save
```

Each release is named after the day it was built and the git commit hash in Microsoft/TypeScript/master that it was built from.
