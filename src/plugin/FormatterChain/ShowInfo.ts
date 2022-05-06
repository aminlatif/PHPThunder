import * as vscode from "vscode";

import FormatterChain from "@plugin/FormatterChain";

export default class ShowInfo {
    private plugin: FormatterChain;

    constructor(plugin: FormatterChain) {
        this.plugin = plugin;
    }

    public showFormatterChain(): void {
        this.plugin.log("PHPThunder: Formatter chain: ", this.plugin.getConfig().getFormatConfig().getPhpFormatterChain(), 0, true);
    }
}