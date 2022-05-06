import ConfigAbstract from "@interface/ConfigAbstract";

export default class FormatConfig extends ConfigAbstract {
    private documentFormattingProviderEnabled: boolean = true;
    private formatOnSaveEnabled: boolean = true;
    private formatOnBracketEnabled: boolean = false;
    private formatOnSemicolonEnabled: boolean = false;
    private formatHtmlEnabled: boolean = true;
    private phpFormatter: string = "phpcbf";
    private phpFormatterChain: string[] = ["phpcbf"];

    public setDocumentFormattingProviderEnabled(documentFormattingProviderEnabled: boolean): FormatConfig {
        return this.setData("documentFormattingProviderEnabled", documentFormattingProviderEnabled) as FormatConfig;
    }

    public isDocumentFormattingProviderEnabled(): boolean {
        return this.documentFormattingProviderEnabled;
    }

    public setFormatOnSaveEnabled(formatOnSaveEnabled: boolean): FormatConfig {
        return this.setData("formatOnSaveEnabled", formatOnSaveEnabled) as FormatConfig;
    }

    public isFormatOnSaveEnabled(): boolean {
        return this.formatOnSaveEnabled;
    }

    public setFormatOnBracketEnabled(formatOnBracketEnabled: boolean): FormatConfig {
        return this.setData("formatOnBracketEnabled", formatOnBracketEnabled) as FormatConfig;
    }

    public isFormatOnBracketEnabled(): boolean {
        return this.formatOnBracketEnabled;
    }

    public setFormatOnSemicolonEnabled(formatOnSemicolonEnabled: boolean): FormatConfig {
        return this.setData("formatOnSemicolonEnabled", formatOnSemicolonEnabled) as FormatConfig;
    }

    public isFormatOnSemicolonEnabled(): boolean {
        return this.formatOnSemicolonEnabled;
    }

    public setFormatHtmlEnabled(formatHtmlEnabled: boolean): FormatConfig {
        return this.setData("formatHtmlEnabled", formatHtmlEnabled) as FormatConfig;
    }

    public isFormatHtmlEnabled(): boolean {
        return this.formatHtmlEnabled;
    }

    public setPhpFormatter(phpFormatter: string): FormatConfig {
        return this.setData("phpFormatter", phpFormatter) as FormatConfig;
    }

    public getPhpFormatter(): string {
        return this.phpFormatter;
    }

    public setPhpFormatterChain(phpFormatterChain: string[]): FormatConfig {
        return this.setData("phpFormatterChain", phpFormatterChain) as FormatConfig;
    }

    public getPhpFormatterChain(): string[] {
        return this.phpFormatterChain;
    }
}