import * as vscode from "vscode";
import {
    LanguageClient,
    LanguageClientOptions,
    Middleware,
    Proposed,
    ProposedFeatures,
    ServerOptions,
    TransportKind,
} from "vscode-languageclient";
import * as childProcess from "child_process";
import * as path from "path";

import PluginAbstract from "@interface/PluginAbstract";

import State from "@model/State";
import Initializer from "./PHPCS/Initializer";
import ShowInfo from "./PHPCS/ShowInfo";
import DocumentActions from "./PHPCS/DocumentActions";

export default class PHPCS extends PluginAbstract {
    public pluginName: string = "PHPCS";

    public initializer: Initializer;
    public showInfo: ShowInfo;
    public documentActions: DocumentActions;

    constructor(extensionContext: vscode.ExtensionContext, state: State) {
        super(extensionContext, state);
        this.initializer = new Initializer(this);
        this.showInfo = new ShowInfo(this);
        this.documentActions = new DocumentActions(this);
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
        const phpExecutablePath = this.getConfig().getPHPCSConfig().getPHPExecutablePath();
        if (phpExecutablePath) {
            return phpExecutablePath;
        }
        return this.getToolsPHPExecutablePath();
    }

    public getToolExecutablePath(): string {
        const phpCSExecutablePath = this.getConfig().getPHPCSConfig().getExecutablePath();
        if (this.isEnabled() && phpCSExecutablePath) {
            return phpCSExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpcs is disabled.");
        throw new Error("PHPThunder: phpcs is disabled.");
    }

    public isEnabled(): boolean {
        if (super.isEnabled()) {
            return this.getConfig().getPHPCSConfig().isEnabled();
        }
        return false;
    }

    public getShowInfo(): ShowInfo {
        return this.showInfo;
    }

    public getDocumentActions(): DocumentActions {
        return this.documentActions;
    }
}
