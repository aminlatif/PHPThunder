// require('module-alias/register');

import * as vscode from "vscode";
import PHPThunder from "./PHPThunder";

export function activate(context: vscode.ExtensionContext) {
    const phpThunder = new PHPThunder(context);



    

    // phpThunder.getPHPCS().init(context);
    // phpThunder.getPHPCBF().init(context);
    // phpThunder.getPHPCSFixer().init(context);
    // phpThunder.getPHPFMT().init(context);
}

export function deactivate() {}
