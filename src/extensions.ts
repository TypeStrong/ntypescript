/**
 * Sample: add a new utility function
 */
module ts {
    export function syntaxKindToName(kind: ts.SyntaxKind): string {
        return (<any>ts).SyntaxKind[kind];
    }

    /**
     * Pulled straight out of `tsc.ts`. Ask to make it exported
     */
    export function reportDiagnostic(diagnostic: Diagnostic) {
        let output = "";

        if (diagnostic.file) {
            let loc = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);

            output += `${ diagnostic.file.fileName }(${ loc.line + 1 },${ loc.character + 1 }): `;
        }

        let category = DiagnosticCategory[diagnostic.category].toLowerCase();
        output += `${ category } TS${ diagnostic.code }: ${ flattenDiagnosticMessageText(diagnostic.messageText, sys.newLine) }${ sys.newLine }`;

        sys.write(output);
    }
}

/**
 * Make ts a global variable (this means we have a consistent typescript definition file)
 */
declare module NodeJS {
    export interface Global {
    }
}
declare var global: NodeJS.Global;
if (typeof global !== "undefined") {
    (global as any).ts = ts;
}
if (typeof window !== "undefined") {
    (window as any).ts = ts;
}

/**
 * Sample: Add additional options
 */
module ts {
    export var NDiagnostics = {
        initOption: { code: 20000, category: DiagnosticCategory.Message, key: "Creates a new tsconfig.json" },
        initAlreadyExists: { code: 20001, category: DiagnosticCategory.Error, key: "A local tsconfig.json already exits" },
        initFailed: { code: 20002, category: DiagnosticCategory.Error, key: "Failed to write a tsconfig.json" },
    };

    optionDeclarations.push({
        name: 'init',
        type: 'boolean',
        shortName: 'i',
        description: NDiagnostics.initOption
    });

    export interface CompilerOptions {
        init?: string;
    }

    let parseCommandLineOld = ts.parseCommandLine;
    ts.parseCommandLine = function(commandLine: string[]): ParsedCommandLine {
        let oldResult: ParsedCommandLine = parseCommandLineOld.apply(null, arguments);

        if (oldResult.options.init) {
            if (ts.sys.fileExists('./tsconfig.json')) {
                oldResult.errors.push(ts.createCompilerDiagnostic(NDiagnostics.initAlreadyExists));
            }
        }

        return oldResult;
    };

    let executeCommandLineOld = ts.executeCommandLine;
    ts.executeCommandLine = function(args: string[]): void {
        let commandLine = parseCommandLine(args);

        // If errors let the old code deal with it
        if (commandLine.errors.length > 0) {
            return executeCommandLineOld.apply(null, arguments);
        }

        // If not an option we've customized let the old code deal with it
        if (!commandLine.options.init) {
            return executeCommandLineOld.apply(null, arguments);
        }

        // Otherwise lets do our stuff
        if (commandLine.options.init) {
            try {
                ts.sys.writeFile('./tsconfig.json', '{}');
                return sys.exit(ExitStatus.Success);
            }
            catch (e) {
                reportDiagnostic(ts.createCompilerDiagnostic(NDiagnostics.initFailed));
                return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
        }
    };
}

/**
 * Support node_modules lookup
 * Code from https://github.com/Microsoft/TypeScript/pull/3147/files
 */
module ts {
    var resolvedExternalModuleCache: ts.Map<string> = {};
    ts.resolveModuleName = function(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModule {
        let normalizePath = ts.normalizePath;
        let combinePaths = ts.combinePaths;
        let removeFileExtension = ts.removeFileExtension;
        let getDirectoryPath = ts.getDirectoryPath;
        let forEach = ts.forEach;
        let fileExists = host.fileExists;
        let readFile = host.readFile;

        let cacheLookupName = moduleName + containingFile;
        if (resolvedExternalModuleCache[cacheLookupName]) {
            return {
                resolvedFileName: resolvedExternalModuleCache[cacheLookupName],
                failedLookupLocations: [] // TODO: later
            };
        }
        if (resolvedExternalModuleCache[cacheLookupName] === '') {
            return { resolvedFileName: undefined, failedLookupLocations: [] };
        }
        function getNameIfExists(fileName: string): string {
            if (fileExists(fileName)) {
                return fileName;
            }
        }
        while (true) {
            // Look at files by all extensions
            let supportedExtensions = ts.supportedExtensions;
            let found = ts.forEach(supportedExtensions,
                extension => getNameIfExists(ts.normalizePath(ts.combinePaths(containingFile, moduleName)) + extension));
                
            // If not found ... continue lookup but this time with `.d.ts` first
            supportedExtensions = ['.d.ts', '.ts', '.tsx'];
                
            // Also look at all files by node_modules
            if (!found) {
                found = ts.forEach(ts.supportedExtensions,
                    extension => getNameIfExists(ts.normalizePath(ts.combinePaths(ts.combinePaths(containingFile, "node_modules"), moduleName)) + extension));
            }
            // Also look at package.json's main in node_modules
            if (!found) {
                // If we found a package.json then look at its main field
                let pkgJson = getNameIfExists(normalizePath(combinePaths(combinePaths(combinePaths(containingFile, "node_modules"), moduleName), "package.json")));
                if (pkgJson) {
                    let pkgFile = JSON.parse(readFile(pkgJson));
                    if (pkgFile.main) {
                        var indexFileName = removeFileExtension(combinePaths(getDirectoryPath(pkgJson), pkgFile.main));
                        found = forEach(supportedExtensions,
                            extension => getNameIfExists(indexFileName + extension))
                    }
                }
            }
            // look at node_modules index
            if (!found) {
                found = forEach(supportedExtensions,
                    extension => getNameIfExists(normalizePath(combinePaths(combinePaths(combinePaths(containingFile, "node_modules"), moduleName), "index")) + extension));
            }
                
            // Finally cache and return or continue up the directory tree
            if (found) {
                resolvedExternalModuleCache[cacheLookupName] = found;

                return {
                    resolvedFileName: found,
                    failedLookupLocations: [] // TODO: use these at some point
                }
            }
            let parentPath = getDirectoryPath(containingFile);
            if (parentPath === containingFile) {
                resolvedExternalModuleCache[cacheLookupName] = '';
                return { resolvedFileName: undefined, failedLookupLocations: [] };
            }
            containingFile = parentPath;
        }
    }
}