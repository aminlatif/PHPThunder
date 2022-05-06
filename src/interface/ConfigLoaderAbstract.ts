import * as vscode from "vscode";

import Config from "@model/Config";

export default abstract class ConfigLoaderAbstract {
    public static getAbsolutePath(configPath: string | null): string | null {
        if (configPath === null) {
            return null;
        }
        let modifiedPath = configPath;
        modifiedPath = modifiedPath.replace(/\$\{workspaceFolder\}/g, this.getDocumentWorkspaceFolder() || "");
        if (modifiedPath.startsWith("./")) {
            modifiedPath = this.getDocumentWorkspaceFolder() + modifiedPath.substring(1);
        }
        if (!modifiedPath.startsWith("/")) {
            if (modifiedPath.includes("/") || modifiedPath.includes(".")) {
                modifiedPath = this.getDocumentWorkspaceFolder() + "/" + modifiedPath;
            }
        }
        return modifiedPath;
    }

    public static getDocumentWorkspaceFolder(): string | undefined {
        const fileName = vscode.window.activeTextEditor?.document.fileName;
        return vscode.workspace.workspaceFolders
            ?.map((folder) => folder.uri.fsPath)
            .filter((fsPath) => fileName?.startsWith(fsPath))[0];
    }
}
