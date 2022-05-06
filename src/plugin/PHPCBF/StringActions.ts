import * as vscode from "vscode";
import * as fs from "fs";

import PHPCBF from "@plugin/PHPCBF";

export default class StringActions {
    private plugin: PHPCBF;

    constructor(plugin: PHPCBF) {
        this.plugin = plugin;
    }

    public async runPHPCBFOnString(text: String): Promise<string> {
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
        await this.plugin.getDocumentActions().runPHPCBFOnDocument(tempFileName);
        const fixedText = await fs.promises.readFile(tempFileName, "utf-8");
        return fixedText;
    }
}