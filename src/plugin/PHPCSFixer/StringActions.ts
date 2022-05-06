import * as vscode from "vscode";
import * as fs from "fs";

import PHPCSFixer from "@plugin/PHPCSFixer";

export default class StringActions {
    private plugin: PHPCSFixer;

    constructor(plugin: PHPCSFixer) {
        this.plugin = plugin;
    }

    public async runPHPCSFixerOnString(text: String): Promise<string> {
        this.plugin.log("Formatting string.");
        let tempFileName =
            this.plugin.getTempDirectory() +
            "/temp-" +
            Math.random()
                .toString(36)
                .replace(/[^a-z]+/g, "")
                .substr(0, 10) +
            ".php";
        this.plugin.log("Temp file name: " + tempFileName);
        await fs.promises.writeFile(tempFileName, text as string);
        await this.plugin.getDocumentActions().runPHPCSFixerOnDocument(tempFileName);
        const fixedText = await fs.promises.readFile(tempFileName, "utf-8");
        return fixedText;
    }
}