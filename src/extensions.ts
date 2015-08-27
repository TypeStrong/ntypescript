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
