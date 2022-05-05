import PHPCBFConfig from "@plugin/PHPCBF/PHPCBFConfig";
import PHPCSConfig from "@plugin/PHPCS/PHPCSConfig";
import PHPCSFixerConfig from "@plugin/PHPCSFixer/PHPCSFixerConfig";
import PHPFMTConfig from "@plugin/PHPFMT/PHPFMTConfig";

export default class FormatConfig {
    private enable: boolean;
    private onSave: boolean;
    private onBracket: boolean;
    private onSemicolon: boolean;
    private formatHtml: boolean;
    private documentFormattingProvider: boolean;
    private standard: string;
    private autoConfigSearch: boolean;
    private ignorePatterns: string[];
    private errorSeverity: number;
    private warningSeverity: number;
    private showWarnings: boolean;
    private showSources: boolean;
    private traceServer: string;

    private phpcsConfig: PHPCSConfig;
    private phpcbfConfig: PHPCBFConfig;
    private phpcsfixerConfig: PHPCSFixerConfig;
    private phpfmtConfig: PHPFMTConfig;

    constructor(
        enable: boolean,
        onSave: boolean,
        onBracket: boolean,
        onSemicolon: boolean,
        formatHtml: boolean,
        documentFormattingProvider: boolean,
        standard: string,
        autoConfigSearch: boolean,
        ignorePatterns: string[],
        errorSeverity: number,
        warningSeverity: number,
        showWarnings: boolean,
        showSources: boolean,
        traceServer: string,
        phpcsConfig: PHPCSConfig,
        phpcbfConfig: PHPCBFConfig,
        phpcsfixerConfig: PHPCSFixerConfig,
        phpfmtConfig: PHPFMTConfig
    ) {
        this.enable = enable;
        this.onSave = onSave;
        this.onBracket = onBracket;
        this.onSemicolon = onSemicolon;
        this.formatHtml = formatHtml;
        this.documentFormattingProvider = documentFormattingProvider;
        this.standard = standard;
        this.autoConfigSearch = autoConfigSearch;
        this.ignorePatterns = ignorePatterns;
        this.errorSeverity = errorSeverity;
        this.warningSeverity = warningSeverity;
        this.showWarnings = showWarnings;
        this.showSources = showSources;
        this.traceServer = traceServer;
        this.phpcsConfig = phpcsConfig;
        this.phpcbfConfig = phpcbfConfig;
        this.phpcsfixerConfig = phpcsfixerConfig;
        this.phpfmtConfig = phpfmtConfig;
    }

    public getEnable(): boolean {
        return this.enable;
    }

    public getOnSave(): boolean {
        return this.onSave;
    }

    public getOnBracket(): boolean {
        return this.onBracket;
    }

    public getOnSemicolon(): boolean {
        return this.onSemicolon;
    }

    public getFormatHtml(): boolean {
        return this.formatHtml;
    }

    public getDocumentFormattingProvider(): boolean {
        return this.documentFormattingProvider;
    }

    public getStandard(): string {
        return this.standard;
    }

    public getAutoConfigSearch(): boolean {
        return this.autoConfigSearch;
    }

    public getIgnorePatterns(): string[] {
        return this.ignorePatterns;
    }

    public getErrorSeverity(): number {
        return this.errorSeverity;
    }

    public getWarningSeverity(): number {
        return this.warningSeverity;
    }

    public getShowWarnings(): boolean {
        return this.showWarnings;
    }

    public getShowSources(): boolean {
        return this.showSources;
    }

    public getTraceServer(): string {
        return this.traceServer;
    }

    public getPhpcsConfig(): PHPCSConfig {
        return this.phpcsConfig;
    }

    public getPhpcbfConfig(): PHPCBFConfig {
        return this.phpcbfConfig;
    }

    public getPhpcsfixerConfig(): PHPCSFixerConfig {
        return this.phpcsfixerConfig;
    }

    public getPhpfmtConfig(): PHPFMTConfig {
        return this.phpfmtConfig;
    }
}