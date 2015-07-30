/** 
 * Sample: add a new utility function
 */
module ts {
    export function syntaxKindToName(kind: ts.SyntaxKind): string {
        return (<any>ts).SyntaxKind[kind];
    }
}

/**
 * Make ts a global variable (this means we have a consistent typescript definition file)
 */
declare var global: any;
if (typeof global !== "undefined") {
    (global as any).ts = ts;
}
if (typeof window !== "undefined") {
    (window as any).ts = ts;
}

/**
 * Sample: Add additional options
 */
/*module ts {
    export var NDiagnostics = {
        initOption: { code: 20000, category: DiagnosticCategory.Message, key: "Creates a new tsconfig.json" },
        initAlreadyExists: { code: 20001, category: DiagnosticCategory.Error, key: "A local tsconfig.json already exits" },
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
        if (commandLine.options.init){
            
        }
        
    };
}*/
