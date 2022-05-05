import * as vscode from "vscode";

import { LogLevel } from "@enum/logLevel";

export default class LogService {
    private phpThunderOutputChannel: vscode.OutputChannel;
    private debug: boolean = true;

    constructor() {
        this.phpThunderOutputChannel = vscode.window.createOutputChannel("PHPThunder");
    }

    public setDebug(debug: boolean): void {
        this.debug = debug;
    }

    public log(message: string, logObject: Object | null = null, severity: LogLevel | number = LogLevel.debug): void {
        let messageString = message.toString();
        if (logObject) {
            let objectString = logObject.toString();
            if (objectString === "[object Object]") {
                objectString = JSON.stringify(logObject);
            }
            messageString += objectString;
        }
        if (severity === LogLevel.debug && this.debug) {
            this.phpThunderOutputChannel.appendLine("[debug] " + messageString);
        } else if (severity === LogLevel.information) {
            this.phpThunderOutputChannel.appendLine("[info] " + messageString);
        } else if (severity === LogLevel.error) {
            this.phpThunderOutputChannel.appendLine("[error] " + messageString);
        } else if (severity === LogLevel.warning) {
            this.phpThunderOutputChannel.appendLine("[warning] " + messageString);
        }
    }
}
