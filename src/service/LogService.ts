import * as vscode from "vscode";

import { LogLevel } from "@enum/logLevel";

export default class LogService {
    private phpThunderOutputChannel: vscode.OutputChannel | null = null;
    private debug: boolean = true;

    constructor() {}

    public createOuputChannel(): void {
        if(this.phpThunderOutputChannel === null) {
            this.phpThunderOutputChannel = vscode.window.createOutputChannel("PHPThunder");
        }
    }

    public setDebug(debug: boolean): void {
        this.debug = debug;
    }

    public log(
        message: string,
        logObject: Object | null = null,
        severity: LogLevel | number = LogLevel.debug,
        popup: boolean = false
    ): void {
        let messageString = message.toString();
        if (logObject) {
            let objectString = logObject.toString();
            if (objectString === "[object Object]") {
                objectString = JSON.stringify(logObject);
            }
            messageString += objectString;
        }
        if (severity === LogLevel.debug && this.debug) {
            this.writeToOuputChannel("[debug] " + messageString);
            if (popup) {
                vscode.window.showInformationMessage("Debug Message: " + messageString);
            }
        } else if (severity === LogLevel.information) {
            this.writeToOuputChannel("[info] " + messageString);
            if (popup) {
                vscode.window.showInformationMessage(messageString);
            }
        } else if (severity === LogLevel.error) {
            this.writeToOuputChannel("[error] " + messageString);
            if (popup) {
                vscode.window.showWarningMessage(messageString);
            }
        } else if (severity === LogLevel.warning) {
            this.writeToOuputChannel("[warning] " + messageString);
            if (popup) {
                vscode.window.showErrorMessage(messageString);
            }
        }
    }

    public writeToOuputChannel(message: string): void {
        if (this.phpThunderOutputChannel) {
            this.phpThunderOutputChannel.appendLine(message);
        }
    }
}
