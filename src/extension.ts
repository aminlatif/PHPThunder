import * as vscode from "vscode";
import PHPThunder from "./PHPThunder";

export function activate(context: vscode.ExtensionContext) {
    const phpThunder = new PHPThunder(context);
}

export function deactivate() {}
