import * as vscode from "vscode";
import * as childProcess from "child_process";

import PluginAbstract from "@interface/PluginAbstract";

import State from "@model/State";
import Initializer from "./PHPFMT/Initializer";
import ShowInfo from "./PHPFMT/ShowInfo";
import DocumentActions from "./PHPFMT/DocumentActions";
import StringActions from "./PHPFMT/StringActions";
import FormatActions from "./PHPFMT/FormatActions";

export default class PHPFMT extends PluginAbstract {
    public pluginName: string = "PHPFMT";

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
        const phpExecutablePath = this.getConfig().getPHPFMTConfig().getPHPExecutablePath();
        if (phpExecutablePath) {
            return phpExecutablePath;
        }
        return this.getToolsPHPExecutablePath();
    }

    public getToolExecutablePath(): string {
        const phpFMTExecutablePath = this.getConfig().getPHPFMTConfig().getExecutablePath();
        if (this.isEnabled() && phpFMTExecutablePath) {
            return phpFMTExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpfmt is disabled.");
        throw new Error("PHPThunder: phpfmt is disabled.");
    }

    public isEnabled(): boolean {
        if (super.isEnabled()) {
            return this.getConfig().getPHPFMTConfig().isEnabled();
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
