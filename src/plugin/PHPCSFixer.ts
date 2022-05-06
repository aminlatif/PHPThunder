import * as vscode from "vscode";
import * as childProcess from "child_process";

import PluginAbstract from "@interface/PluginAbstract";

import State from "@model/State";
import Initializer from "./PHPCSFixer/Initializer";
import ShowInfo from "./PHPCSFixer/ShowInfo";
import DocumentActions from "./PHPCSFixer/DocumentActions";
import StringActions from "./PHPCSFixer/StringActions";
import FormatActions from "./PHPCSFixer/FormatActions";

export default class PHPCSFixer extends PluginAbstract {
    public pluginName: string = "PHPCSFixer";

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
        const phpExecutablePath = this.getConfig().getPHPCSFixerConfig().getPHPExecutablePath();
        if (phpExecutablePath) {
            return phpExecutablePath;
        }
        return this.getToolsPHPExecutablePath();
    }

    public getToolExecutablePath(): string {
        const phpCSFixerExecutablePath = this.getConfig().getPHPCSFixerConfig().getExecutablePath();
        if (this.isEnabled() && phpCSFixerExecutablePath) {
            return phpCSFixerExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpcsfixer is disabled.");
        throw new Error("PHPThunder: phpcsfixer is disabled.");
    }

    public isEnabled(): boolean {
        if (super.isEnabled()) {
            return this.getConfig().getPHPCSFixerConfig().isEnabled();
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
