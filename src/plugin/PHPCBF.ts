import * as vscode from "vscode";
import * as childProcess from "child_process";
import * as fs from "fs";

import PluginAbstract from "@interface/PluginAbstract";

import State from "@model/State";
import Initializer from "./PHPCBF/Initializer";
import ShowInfo from "./PHPCBF/ShowInfo";
import DocumentActions from "./PHPCBF/DocumentActions";
import StringActions from "./PHPCBF/StringActions";
import FormatActions from "./PHPCBF/FormatActions";

export default class PHPCBF extends PluginAbstract {
    public pluginName: string = "PHPCBF";

    public initializer: Initializer;
    public showInfo:ShowInfo;
    public documentActions: DocumentActions;
    public stringActions: StringActions;
    public formatActions: FormatActions;

    constructor(extensionContext: vscode.ExtensionContext, state: State) {
        super(extensionContext, state);
        this.initializer = new Initializer(this);
        this.showInfo = new ShowInfo(this);
        this.documentActions = new DocumentActions(this);
        this.stringActions = new StringActions(this);
        this.formatActions = new FormatActions(this);
    }

    public registerSubscriptionsTool(): void {
        this.initializer.registerSubscriptions();
    }

    public initTool(): void {
        this.initializer.init();
    }

    async setConfig(name: string, value: string): Promise<void> {
        let phpcsConfig = this.getExceuteBaseCommand();
        phpcsConfig += "--config-set " + name + " " + value + " ";
        await this.execute(phpcsConfig);
    }

    public getPluginPHPExecutablePath(): string {
        const phpExecutablePath = this.getConfig().getPHPCBFConfig().getPHPExecutablePath();
        if (phpExecutablePath) {
            return phpExecutablePath;
        }
        return this.getToolsPHPExecutablePath();
    }

    public getToolExecutablePath(): string {
        const phpCBFExecutablePath = this.getConfig().getPHPCBFConfig().getExecutablePath();
        if (this.isEnabled() && phpCBFExecutablePath) {
            return phpCBFExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpcbf is disabled.");
        throw new Error("PHPThunder: phpcbf is disabled.");
    }

    public isEnabled(): boolean {
        if (super.isEnabled()) {
            return this.getConfig().getPHPCBFConfig().isEnabled();
        }
        return false;
    }

    public getShowInfo(): ShowInfo {
        return this.showInfo;
    }

    public getDocumentActions(): DocumentActions {
        return this.documentActions;
    }

    public getStringActions(): StringActions {
        return this.stringActions;
    }

    public getFormatActions(): FormatActions {
        return this.formatActions;
    }
}
