/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 605:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const StateFactory_1 = __webpack_require__(99);
class PHPThunder {
    constructor(extensionContext) {
        console.log("Activating extension: PHPThunder...");
        this.extensionContext = extensionContext;
        this.state = StateFactory_1.default.createState(this.extensionContext);
        this.state.getLogService().log("PHPThunder extension activated.", null, 0);
        this.state.getPluginService().initPlugins();
    }
    getState() {
        return this.state;
    }
}
exports["default"] = PHPThunder;


/***/ }),

/***/ 495:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["debug"] = -1] = "debug";
    LogLevel[LogLevel["information"] = 0] = "information";
    LogLevel[LogLevel["warning"] = 1] = "warning";
    LogLevel[LogLevel["error"] = 2] = "error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));


/***/ }),

/***/ 141:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Config {
    constructor(enable, phpExecutablePath, composerExecutablePath, debug, composerJsonPath, formatConfig) {
        this.enable = enable;
        this.phpExecutablePath = phpExecutablePath;
        this.composerExecutablePath = composerExecutablePath;
        this.debug = debug;
        this.composerJsonPath = composerJsonPath;
        this.formatConfig = formatConfig;
    }
    isEnable() {
        return this.enable;
    }
    getPhpExecutablePath() {
        return this.phpExecutablePath;
    }
    getComposerExecutablePath() {
        return this.composerExecutablePath;
    }
    getComposerJsonPath() {
        return this.composerJsonPath;
    }
    getDebug() {
        return this.debug;
    }
    getFormatConfig() {
        return this.formatConfig;
    }
}
exports["default"] = Config;


/***/ }),

/***/ 1:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class FormatConfig {
    constructor(enable, onSave, onBracket, onSemicolon, formatHtml, documentFormattingProvider, standard, autoConfigSearch, ignorePatterns, errorSeverity, warningSeverity, showWarnings, showSources, traceServer, phpcsConfig, phpcbfConfig, phpcsfixerConfig, phpfmtConfig) {
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
    getEnable() {
        return this.enable;
    }
    getOnSave() {
        return this.onSave;
    }
    getOnBracket() {
        return this.onBracket;
    }
    getOnSemicolon() {
        return this.onSemicolon;
    }
    getFormatHtml() {
        return this.formatHtml;
    }
    getDocumentFormattingProvider() {
        return this.documentFormattingProvider;
    }
    getStandard() {
        return this.standard;
    }
    getAutoConfigSearch() {
        return this.autoConfigSearch;
    }
    getIgnorePatterns() {
        return this.ignorePatterns;
    }
    getErrorSeverity() {
        return this.errorSeverity;
    }
    getWarningSeverity() {
        return this.warningSeverity;
    }
    getShowWarnings() {
        return this.showWarnings;
    }
    getShowSources() {
        return this.showSources;
    }
    getTraceServer() {
        return this.traceServer;
    }
    getPhpcsConfig() {
        return this.phpcsConfig;
    }
    getPhpcbfConfig() {
        return this.phpcbfConfig;
    }
    getPhpcsfixerConfig() {
        return this.phpcsfixerConfig;
    }
    getPhpfmtConfig() {
        return this.phpfmtConfig;
    }
}
exports["default"] = FormatConfig;


/***/ }),

/***/ 774:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class PluginConfig {
    constructor(enable, executablePath) {
        this.enable = enable;
        this.executablePath = executablePath;
    }
    getEnable() {
        return this.executablePath !== null && this.enable;
    }
    getExecutablePath() {
        return this.executablePath;
    }
}
exports["default"] = PluginConfig;


/***/ }),

/***/ 635:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class State {
    constructor(extensionContext) {
        this.activeTextEditorDocumentUri = null;
        this.debug = false;
        this.extensionContext = extensionContext;
    }
    getExtensionContext() {
        return this.extensionContext;
    }
    setWorkspaceConfiguration(workspaceConfiguration) {
        this.workspaceConfiguration = workspaceConfiguration;
    }
    getWorkspaceConfiguration() {
        return this.workspaceConfiguration;
    }
    setBaseService(baseService) {
        this.baseService = baseService;
    }
    getBaseService() {
        return this.baseService;
    }
    setConfigService(configService) {
        this.configService = configService;
    }
    getConfigService() {
        return this.configService;
    }
    setLogService(logService) {
        this.logService = logService;
    }
    getLogService() {
        return this.logService;
    }
    setPluginService(pluginService) {
        this.pluginService = pluginService;
    }
    getPluginService() {
        return this.pluginService;
    }
    setActiveTextEditorDocumentUri(activeTextEditorDocumentUri) {
        this.activeTextEditorDocumentUri = activeTextEditorDocumentUri;
    }
    getActiveTextEditorDocumentUri() {
        return this.activeTextEditorDocumentUri;
    }
    setDebug(debug) {
        this.debug = debug;
    }
    getDebug() {
        return this.debug;
    }
}
exports["default"] = State;


/***/ }),

/***/ 569:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(496);
const Config_1 = __webpack_require__(141);
const FormatConfig_1 = __webpack_require__(1);
const PHPCBFConfig_1 = __webpack_require__(896);
const PHPCSConfig_1 = __webpack_require__(413);
const PHPCSFixerConfig_1 = __webpack_require__(764);
const PHPFMTConfig_1 = __webpack_require__(606);
class ConfigFactory {
    static createConfig(workspaceConfiguration) {
        const enable = workspaceConfiguration.get("enable", true);
        const phpExecutablePath = this.getExecutablePath(workspaceConfiguration.get("phpExecutablePath", "/usr/bin/php"));
        const composerExecutablePath = this.getExecutablePath(workspaceConfiguration.get("composerExecutablePath", null));
        const debug = workspaceConfiguration.get("debug", false);
        const composerJsonPath = this.getExecutablePath(workspaceConfiguration.get("composerJsonPath", null));
        const formatConfig = this.createFormatConfig(workspaceConfiguration);
        return new Config_1.default(enable, phpExecutablePath, composerExecutablePath, debug, composerJsonPath, formatConfig);
    }
    static createFormatConfig(workspaceConfiguration) {
        const enable = workspaceConfiguration.get("format.enable", false);
        const onSave = workspaceConfiguration.get("format.onSave", false);
        const onBracket = workspaceConfiguration.get("format.onBracket", false);
        const onSemicolon = workspaceConfiguration.get("format.onSemicolon", false);
        const formatHtml = workspaceConfiguration.get("format.formatHtml", false);
        const documentFormattingProvider = workspaceConfiguration.get("format.documentFormattingProvider", false);
        let standard = this.getExecutablePath(workspaceConfiguration.get("format.standard", "PSR12"));
        const autoConfigSearch = workspaceConfiguration.get("format.autoConfigSearch", false);
        const ignorePatterns = workspaceConfiguration.get("format.ignorePatterns", []);
        const errorSeverity = workspaceConfiguration.get("format.errorSeverity", 5);
        const warningSeverity = workspaceConfiguration.get("format.warningSeverity", 5);
        const showWarnings = workspaceConfiguration.get("format.showWarnings", false);
        const showSources = workspaceConfiguration.get("format.showSources", false);
        const traceServer = workspaceConfiguration.get("format.traceServer", "off");
        const phpcsConfig = this.createPhpCSConfig(workspaceConfiguration);
        const phpcbfConfig = this.createPhpCBFConfig(workspaceConfiguration);
        const phpcsfixerConfig = this.createPhpCSFixerFConfig(workspaceConfiguration);
        const phpfmtConfig = this.createPhpFMTConfig(workspaceConfiguration);
        if (standard === null) {
            standard = "PSR12";
        }
        return new FormatConfig_1.default(enable, onSave, onBracket, onSemicolon, formatHtml, documentFormattingProvider, standard, autoConfigSearch, ignorePatterns, errorSeverity, warningSeverity, showWarnings, showSources, traceServer, phpcsConfig, phpcbfConfig, phpcsfixerConfig, phpfmtConfig);
    }
    static createPhpCSConfig(workspaceConfiguration) {
        const enable = workspaceConfiguration.get("format.phpcs.enable", false);
        const executablePath = this.getExecutablePath(workspaceConfiguration.get("format.phpcs.executablePath", null));
        return new PHPCSConfig_1.default(enable, executablePath);
    }
    static createPhpCBFConfig(workspaceConfiguration) {
        const enable = workspaceConfiguration.get("format.phpcbf.enable", false);
        const executablePath = this.getExecutablePath(workspaceConfiguration.get("format.phpcbf.executablePath", null));
        return new PHPCBFConfig_1.default(enable, executablePath);
    }
    static createPhpCSFixerFConfig(workspaceConfiguration) {
        const enable = workspaceConfiguration.get("format.phpcsfixer.enable", false);
        const executablePath = this.getExecutablePath(workspaceConfiguration.get("format.phpcsfixer.executablePath", null));
        const allowRisky = workspaceConfiguration.get("format.phpcsfixer.allowRisky", false);
        return new PHPCSFixerConfig_1.default(enable, executablePath, allowRisky);
    }
    static createPhpFMTConfig(workspaceConfiguration) {
        const enable = workspaceConfiguration.get("format.phpfmt.enable", false);
        const executablePath = this.getExecutablePath(workspaceConfiguration.get("format.phpfmt.executablePath", null));
        return new PHPFMTConfig_1.default(enable, executablePath);
    }
    static getExecutablePath(configPath) {
        if (configPath === null) {
            return null;
        }
        let modifiedPath = configPath;
        modifiedPath = modifiedPath.replace(/\$\{workspaceFolder\}/g, this.getDocumentWorkspaceFolder() || "");
        if (modifiedPath.startsWith("./")) {
            modifiedPath = this.getDocumentWorkspaceFolder() + modifiedPath.substring(1);
        }
        if (!modifiedPath.startsWith("/")) {
            if (modifiedPath.includes("/") || modifiedPath.includes(".")) {
                modifiedPath = this.getDocumentWorkspaceFolder() + "/" + modifiedPath;
            }
        }
        return modifiedPath;
    }
    static getDocumentWorkspaceFolder() {
        const fileName = vscode.window.activeTextEditor?.document.fileName;
        return vscode.workspace.workspaceFolders
            ?.map((folder) => folder.uri.fsPath)
            .filter((fsPath) => fileName?.startsWith(fsPath))[0];
    }
}
exports["default"] = ConfigFactory;


/***/ }),

/***/ 99:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(496);
const State_1 = __webpack_require__(635);
const BaseService_1 = __webpack_require__(210);
const ConfigService_1 = __webpack_require__(506);
const LogService_1 = __webpack_require__(853);
const PluginService_1 = __webpack_require__(177);
const ConfigFactory_1 = __webpack_require__(569);
class StateFactory {
    static createState(extensionContext) {
        console.log("Loading PHPThunder state...");
        const state = new State_1.default(extensionContext);
        console.log("Loading log service...");
        state.setLogService(new LogService_1.default());
        state.getLogService().log("Log service loaded.", null, 0);
        state.getLogService().log("Loading active text editor...", null, 0);
        if (vscode.window.activeTextEditor) {
            state.getLogService().log("Active text editor: ", vscode.window.activeTextEditor);
            state.setActiveTextEditorDocumentUri(vscode.window.activeTextEditor.document.uri);
            state.getLogService().log("Active text editor loaded.", null, 0);
        }
        else {
            state.getLogService().log("No active text editor.", null, 0);
        }
        state.getLogService().log("Loading configuration...", null, 0);
        state.setWorkspaceConfiguration(vscode.workspace.getConfiguration("phpthunder", state.getActiveTextEditorDocumentUri()));
        state.getLogService().log("Document Workspace Folder: " + ConfigFactory_1.default.getDocumentWorkspaceFolder());
        state.setConfigService(new ConfigService_1.default(ConfigFactory_1.default.createConfig(state.getWorkspaceConfiguration())));
        state.setDebug(state.getConfigService().getConfig().getDebug());
        state.getLogService().setDebug(state.getDebug());
        state.getLogService().log("Debug mode: " + state.getDebug(), null, 0);
        state.getLogService().log("Config: ", state.getConfigService().getConfig());
        state.getLogService().log("Configuration loaded.", null, 0);
        state.getLogService().log("Loading base service...", null, 0);
        state.setBaseService(new BaseService_1.default(state));
        state.getLogService().log("Base service loaded.", null, 0);
        state.getLogService().log("Loading plugin service...", null, 0);
        state.setPluginService(new PluginService_1.default(state));
        state.getLogService().log("Plugin service loaded.", null, 0);
        state.getLogService().log("PHPThunder state loaded.", null, 0);
        return state;
    }
}
exports["default"] = StateFactory;


/***/ }),

/***/ 418:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(496);
const childProcess = __webpack_require__(81);
const Plugin_1 = __webpack_require__(779);
class Genral extends Plugin_1.default {
    constructor() {
        super(...arguments);
        this.pluginName = "General";
    }
    registerSubscriptionsTool() {
        this.getExtensionContext().subscriptions.push(vscode.commands.registerCommand("phpthunder.showPHPVersion", () => {
            this.showPHPVersion();
        }));
        this.getExtensionContext().subscriptions.push(vscode.commands.registerCommand("phpthunder.showComposerVersion", () => {
            this.showComposerVersion();
        }));
    }
    initTool() { }
    showPHPVersion() {
        if (!this.getConfig().isEnable()) {
            vscode.window.showWarningMessage("PHPThunder is disabled.");
            return;
        }
        const phpExecutablePath = this.getConfig().getPhpExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        childProcess.exec(phpExecutablePath + " -v", (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(err.toString());
                return;
            }
            const message = "PHP version: " + stdout.toString();
            vscode.window.showInformationMessage(message);
            this.log(message, null, 0);
        });
    }
    showComposerVersion() {
        if (!this.getConfig().isEnable()) {
            vscode.window.showWarningMessage("PHPThunder is disabled.");
            return;
        }
        if (this.getConfig().getComposerExecutablePath() === null) {
            vscode.window.showWarningMessage("PHPThunder: composer executable path not defined.");
            return;
        }
        const phpExecutablePath = this.getConfig().getPhpExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const composerExecutablePath = this.getConfig().getComposerExecutablePath();
        this.log("Composer Executable Path: " + composerExecutablePath, null, 0);
        childProcess.exec(phpExecutablePath + " " + composerExecutablePath + " --version", (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(err.toString());
                return;
            }
            const message = "Composer version: " + stdout.toString();
            vscode.window.showInformationMessage(message);
            this.log(message, null, 0);
        });
    }
}
exports["default"] = Genral;


/***/ }),

/***/ 252:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(496);
const childProcess = __webpack_require__(81);
const fs = __webpack_require__(147);
const Plugin_1 = __webpack_require__(779);
class PHPCBF extends Plugin_1.default {
    constructor() {
        super(...arguments);
        this.pluginName = "PHPCBF";
    }
    registerSubscriptionsTool() {
        this.getExtensionContext().subscriptions.push(vscode.commands.registerCommand("phpthunder.showPHPCBFVersion", () => {
            this.showPHPCBFVersion();
        }));
        this.getExtensionContext().subscriptions.push(vscode.commands.registerCommand("phpthunder.showPHPCBFInstalledCodingStandards", () => {
            this.showPHPBFInstalledCodingStandards();
        }));
        this.getExtensionContext().subscriptions.push(vscode.commands.registerCommand("phpthunder.phpcbfDocument", () => {
            this.phpCBFCurrentDocument();
        }));
        this.getExtensionContext().subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider("php", {
            provideDocumentFormattingEdits: (document, options, token) => {
                return new Promise(async (resolve, reject) => {
                    this.log("Formatting document: " + document.fileName);
                    const originalText = document.getText();
                    let lastLine = document.lineAt(document.lineCount - 1);
                    let range = new vscode.Range(new vscode.Position(0, 0), lastLine.range.end);
                    const fixedText = await this.formatDocument(document);
                    if (fixedText.length > 0 && fixedText !== originalText) {
                        this.log("Document: " + document.fileName + " - formatted.");
                        resolve([new vscode.TextEdit(range, fixedText)]);
                    }
                    else if (fixedText === originalText) {
                        this.log("Document: " + document.fileName + " - no changes made.");
                    }
                    else {
                        this.log("Document: " + document.fileName + " - formatting failed.");
                    }
                    reject();
                });
            },
        }));
    }
    initTool() {
        this.setConfig("report_format", "full");
        if (this.getShowWarnings()) {
            this.setConfig("show_warnings", "1");
        }
        else {
            this.setConfig("show_warnings", "0");
        }
        this.setConfig("severity", this.getErrorSeverity().toString());
        this.setConfig("error_severity", this.getErrorSeverity().toString());
        this.setConfig("error_warning", this.getWarningSeverity().toString());
    }
    showPHPCBFVersion() {
        if (!this.getConfig().getFormatConfig().getPhpcbfConfig().getEnable()) {
            vscode.window.showWarningMessage("PHPThunder: phpcbf is disabled.");
            return;
        }
        const phpExecutablePath = this.getConfig().getPhpExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpCBFExecutablePath = this.getConfig().getFormatConfig().getPhpcbfConfig().getExecutablePath();
        this.log("PHPCBF Executable Path: " + phpCBFExecutablePath, null, 0);
        childProcess.exec(phpExecutablePath + " " + phpCBFExecutablePath + " --version", (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(err.toString());
                return;
            }
            const message = "PHPCBF version: " + stdout.toString();
            vscode.window.showInformationMessage(message);
            this.log(message, null, 0);
        });
    }
    async showPHPBFInstalledCodingStandards() {
        let phpcbfCommand = this.getExceuteBaseCommand();
        phpcbfCommand += " -i";
        await this.execute(phpcbfCommand);
    }
    phpCBFCurrentDocument() {
        this.phpCBFDocument(this.getCurrentlyOpenTabDocumentPath());
    }
    async phpCBFDocument(filePath) {
        let phpcbfCommand = this.getExceuteBaseCommand();
        phpcbfCommand += " --standard=" + this.getStandard() + " ";
        phpcbfCommand += "--no-colors ";
        phpcbfCommand += filePath;
        await this.execute(phpcbfCommand);
    }
    async formatDocument(document) {
        this.log("Formatting document: " + document.fileName);
        let text = document.getText();
        let phpcbfError = false;
        let tempFileName = this.getTempDirectory() +
            "/temp-" +
            Math.random()
                .toString(36)
                .replace(/[^a-z]+/g, "")
                .substr(0, 10) +
            ".php";
        this.log("Temp file name: " + tempFileName);
        fs.writeFileSync(tempFileName, text);
        let phpcbfCommand = this.getExceuteBaseCommand();
        if (this.isDebugEnabled()) {
            phpcbfCommand += "-l ";
        }
        else {
            phpcbfCommand += "-lq ";
        }
        phpcbfCommand += tempFileName + " ";
        phpcbfCommand += " --standard=" + this.getStandard() + " ";
        const formatSuccess = await this.execute(phpcbfCommand);
        let fixed = fs.readFileSync(tempFileName, "utf-8");
        return fixed;
    }
    async setConfig(name, value) {
        let phpcsConfig = this.getExceuteBaseCommand();
        phpcsConfig += "--config-set " + name + " " + value + " ";
        await this.execute(phpcsConfig);
    }
    getToolExecutablePath() {
        const phpCBFExecutablePath = this.getConfig().getFormatConfig().getPhpcbfConfig().getExecutablePath();
        if (this.isEnabled() && phpCBFExecutablePath) {
            return phpCBFExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpcbf is disabled.");
        throw new Error("PHPThunder: phpcbf is disabled.");
    }
    isEnabled() {
        if (super.isEnabled()) {
            return this.getConfig().getFormatConfig().getPhpcbfConfig().getEnable();
        }
        return false;
    }
}
exports["default"] = PHPCBF;


/***/ }),

/***/ 896:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const PluginConfig_1 = __webpack_require__(774);
class PHPCBFConfig extends PluginConfig_1.default {
}
exports["default"] = PHPCBFConfig;


/***/ }),

/***/ 163:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(496);
const childProcess = __webpack_require__(81);
const Plugin_1 = __webpack_require__(779);
class PHPCS extends Plugin_1.default {
    constructor() {
        super(...arguments);
        this.pluginName = "PHPCS";
    }
    registerSubscriptionsTool() {
        this.getExtensionContext().subscriptions.push(vscode.commands.registerCommand("phpthunder.showPHPCSVersion", () => {
            this.showPHPCSVersion();
        }));
        this.getExtensionContext().subscriptions.push(vscode.commands.registerCommand("phpthunder.showPHPCSInstalledCodingStandards", () => {
            this.showPHPCSInstalledCodingStandards();
        }));
        this.getExtensionContext().subscriptions.push(vscode.commands.registerCommand("phpthunder.phpcsDocument", () => {
            this.phpCSCurrentDocument();
        }));
    }
    initTool() {
        this.setConfig("report_format", "full");
        if (this.getShowWarnings()) {
            this.setConfig("show_warnings", "1");
        }
        else {
            this.setConfig("show_warnings", "0");
        }
        this.setConfig("severity", this.getErrorSeverity().toString());
        this.setConfig("error_severity", this.getErrorSeverity().toString());
        this.setConfig("error_warning", this.getWarningSeverity().toString());
    }
    showPHPCSVersion() {
        if (!this.getConfig().getFormatConfig().getPhpcsConfig().getEnable()) {
            vscode.window.showWarningMessage("PHPThunder: phpcs is disabled.");
            return;
        }
        const phpExecutablePath = this.getConfig().getPhpExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpCSExecutablePath = this.getConfig().getFormatConfig().getPhpcsConfig().getExecutablePath();
        this.log("PHPCS Executable Path: " + phpCSExecutablePath, null, 0);
        childProcess.exec(phpExecutablePath + " " + phpCSExecutablePath + " --version", (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(err.toString());
                return;
            }
            const message = "PHPCS version: " + stdout.toString();
            vscode.window.showInformationMessage(message);
            this.log(message, null, 0);
        });
    }
    async showPHPCSInstalledCodingStandards() {
        let phpcsCommand = this.getExceuteBaseCommand();
        phpcsCommand += " -i";
        await this.execute(phpcsCommand);
    }
    phpCSCurrentDocument() {
        this.phpCSDocument(this.getCurrentlyOpenTabDocumentPath());
    }
    async phpCSDocument(filePath) {
        let phpcsCommand = this.getExceuteBaseCommand();
        phpcsCommand += " --standard=" + this.getStandard() + " ";
        phpcsCommand += "--no-colors ";
        phpcsCommand += filePath;
        await this.execute(phpcsCommand);
    }
    async setConfig(name, value) {
        let phpcsConfig = this.getExceuteBaseCommand();
        phpcsConfig += "--config-set " + name + " " + value + " ";
        await this.execute(phpcsConfig);
    }
    getToolExecutablePath() {
        const phpCSExecutablePath = this.getConfig().getFormatConfig().getPhpcsConfig().getExecutablePath();
        if (this.isEnabled() && phpCSExecutablePath) {
            return phpCSExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpcs is disabled.");
        throw new Error("PHPThunder: phpcs is disabled.");
    }
}
exports["default"] = PHPCS;


/***/ }),

/***/ 413:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const PluginConfig_1 = __webpack_require__(774);
class PHPCSConfig extends PluginConfig_1.default {
}
exports["default"] = PHPCSConfig;


/***/ }),

/***/ 616:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(496);
const childProcess = __webpack_require__(81);
const Plugin_1 = __webpack_require__(779);
class PHPCSFixer extends Plugin_1.default {
    constructor() {
        super(...arguments);
        this.pluginName = "PHPCSFixer";
    }
    registerSubscriptionsTool() {
        this.getExtensionContext().subscriptions.push(vscode.commands.registerCommand("phpthunder.showPHPCSFixerVersion", () => {
            this.showPHPCSFixerVersion();
        }));
        this.getExtensionContext().subscriptions.push(vscode.commands.registerCommand("phpthunder.phpcsfixerDocument", () => {
            this.phpCSFixerCurrentDocument();
        }));
    }
    initTool() { }
    showPHPCSFixerVersion() {
        if (!this.getConfig().getFormatConfig().getPhpcsfixerConfig().getEnable()) {
            vscode.window.showWarningMessage("PHPThunder: php-cs-fixer is disabled.");
            return;
        }
        const phpExecutablePath = this.getConfig().getPhpExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpCSFixerExecutablePath = this.getConfig().getFormatConfig().getPhpcsfixerConfig().getExecutablePath();
        this.log("PHP-CS-Fixer Executable Path: " + phpCSFixerExecutablePath, null, 0);
        childProcess.exec(phpExecutablePath + " " + phpCSFixerExecutablePath + " --version", (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(err.toString());
                return;
            }
            const message = "PHP-CS-Fixer version: " + stdout.toString();
            vscode.window.showInformationMessage(message);
            this.log(message, null, 0);
        });
    }
    phpCSFixerCurrentDocument() {
        this.phpCSFixerDocument(this.getCurrentlyOpenTabDocumentPath());
    }
    async phpCSFixerDocument(filePath) {
        let phpcsfixerCommand = this.getExceuteBaseCommand();
        phpcsfixerCommand += " --standard=" + this.getStandard() + " ";
        phpcsfixerCommand += "--no-colors ";
        phpcsfixerCommand += filePath;
        await this.execute(phpcsfixerCommand);
    }
    async setConfig(name, value) {
        let phpcsConfig = this.getExceuteBaseCommand();
        phpcsConfig += "--config-set " + name + " " + value + " ";
        await this.execute(phpcsConfig);
    }
    getToolExecutablePath() {
        const phpCSFixerExecutablePath = this.getConfig().getFormatConfig().getPhpcsfixerConfig().getExecutablePath();
        if (this.isEnabled() && phpCSFixerExecutablePath) {
            return phpCSFixerExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpcsfixer is disabled.");
        throw new Error("PHPThunder: phpcsfixer is disabled.");
    }
    isEnabled() {
        if (super.isEnabled()) {
            return this.getConfig().getFormatConfig().getPhpcsfixerConfig().getEnable();
        }
        return false;
    }
}
exports["default"] = PHPCSFixer;


/***/ }),

/***/ 764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const PluginConfig_1 = __webpack_require__(774);
class PHPCSFixerConfig extends PluginConfig_1.default {
    constructor(enable, executablePath, allowRisky) {
        super(enable, executablePath);
        this.allowRisky = allowRisky;
    }
    getAllowRisky() {
        return this.allowRisky;
    }
}
exports["default"] = PHPCSFixerConfig;


/***/ }),

/***/ 325:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(496);
const childProcess = __webpack_require__(81);
const Plugin_1 = __webpack_require__(779);
class PHPFMT extends Plugin_1.default {
    constructor() {
        super(...arguments);
        this.pluginName = "PHPFMT";
    }
    registerSubscriptionsTool() {
        this.getExtensionContext().subscriptions.push(vscode.commands.registerCommand("phpthunder.showPHPFMTVersion", () => {
            this.showPHPFMTVersion();
        }));
        this.getExtensionContext().subscriptions.push(vscode.commands.registerCommand("phpthunder.phpfmtDocument", () => {
            this.phpFMTCurrentDocument();
        }));
    }
    initTool() { }
    showPHPFMTVersion() {
        if (!this.getConfig().getFormatConfig().getPhpfmtConfig().getEnable()) {
            vscode.window.showWarningMessage("PHPThunder: phpfmt is disabled.");
            return;
        }
        const phpExecutablePath = this.getConfig().getPhpExecutablePath();
        this.log("PHP Executable Path: " + phpExecutablePath, null, 0);
        const phpFMTFixerExecutablePath = this.getConfig().getFormatConfig().getPhpfmtConfig().getExecutablePath();
        this.log("PHPFMT Executable Path: " + phpFMTFixerExecutablePath, null, 0);
        childProcess.exec(phpExecutablePath + " " + phpFMTFixerExecutablePath + " --version", (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(err.toString());
                return;
            }
            const message = "PHPFMT version: " + stdout.toString();
            vscode.window.showInformationMessage(message);
            this.log(message, null, 0);
        });
    }
    phpFMTCurrentDocument() {
        this.phpFMTDocument(this.getCurrentlyOpenTabDocumentPath());
    }
    async phpFMTDocument(filePath) {
        let phpfmtCommand = this.getExceuteBaseCommand();
        phpfmtCommand += " --standard=" + this.getStandard() + " ";
        phpfmtCommand += "--no-colors ";
        phpfmtCommand += filePath;
        await this.execute(phpfmtCommand);
    }
    async setConfig(name, value) {
        let phpcsConfig = this.getExceuteBaseCommand();
        phpcsConfig += "--config-set " + name + " " + value + " ";
        await this.execute(phpcsConfig);
    }
    getToolExecutablePath() {
        const phpFMTExecutablePath = this.getConfig().getFormatConfig().getPhpfmtConfig().getExecutablePath();
        if (this.isEnabled() && phpFMTExecutablePath) {
            return phpFMTExecutablePath;
        }
        vscode.window.showWarningMessage("PHPThunder: phpfmt is disabled.");
        throw new Error("PHPThunder: phpfmt is disabled.");
    }
    isEnabled() {
        if (super.isEnabled()) {
            return this.getConfig().getFormatConfig().getPhpfmtConfig().getEnable();
        }
        return false;
    }
}
exports["default"] = PHPFMT;


/***/ }),

/***/ 606:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const PluginConfig_1 = __webpack_require__(774);
class PHPFMTConfig extends PluginConfig_1.default {
}
exports["default"] = PHPFMTConfig;


/***/ }),

/***/ 779:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(496);
const childProcess = __webpack_require__(81);
const os = __webpack_require__(37);
const logLevel_1 = __webpack_require__(495);
class Plugin {
    constructor(extensionContext, state) {
        this.pluginName = "Plugin";
        this.state = state;
        this.extensionContext = extensionContext;
    }
    registerSubscriptions() {
        if (this.isEnabled()) {
            this.log("Registring plugin: " + this.getPluginName() + "...", null, 0);
            this.registerSubscriptionsTool();
            this.log("Plugin " + this.getPluginName() + " registered.", null, 0);
        }
        else {
            this.log("Plugin " + this.getPluginName() + " is disabled.", null, 0);
        }
    }
    init() {
        if (this.isEnabled()) {
            this.log("Initiating plugin: " + this.getPluginName() + "...", null, 0);
            this.initTool();
            this.registerSubscriptions();
            this.log("Plugin " + this.getPluginName() + " initiated.", null, 0);
        }
        else {
            this.log("Plugin " + this.getPluginName() + " is disabled.", null, 0);
        }
    }
    getExceuteBaseCommand() {
        return this.getPHPExecutablePath() + " " + this.getToolExecutablePath() + " ";
    }
    getPHPExecutablePath() {
        const phpExecutablePath = this.getConfig().getPhpExecutablePath();
        if (this.getConfig().isEnable() && phpExecutablePath) {
            return phpExecutablePath;
        }
        throw new Error("PHPThunder is not enabled.");
    }
    getToolExecutablePath() {
        return "";
    }
    async setConfig(name, value) { }
    async execute(command) {
        this.log("Command: " + command);
        return new Promise((resolve, reject) => {
            childProcess.exec(command, (err, stdout, stderr) => {
                if (err && err.code !== 1) {
                    vscode.window.showErrorMessage(err.toString() + "\n" + stderr.toString());
                    this.log("", err, 2);
                    this.log("", stderr, 2);
                    this.log("OUT: ", stdout, 0);
                    reject(false);
                    return;
                }
                this.log("", stdout, 0);
                resolve(true);
            });
        });
    }
    getCurrentlyOpenTabDocumentPath() {
        if (vscode.window.activeTextEditor) {
            return vscode.window.activeTextEditor.document.fileName;
        }
        else {
            throw new Error("No active tab document.");
        }
    }
    getStandard() {
        return this.getConfig().getFormatConfig().getStandard();
    }
    getErrorSeverity() {
        return this.getConfig().getFormatConfig().getErrorSeverity();
    }
    getWarningSeverity() {
        return this.getConfig().getFormatConfig().getWarningSeverity();
    }
    getShowWarnings() {
        return this.getConfig().getFormatConfig().getShowWarnings();
    }
    getShowSources() {
        return this.getConfig().getFormatConfig().getShowSources();
    }
    isEnabled() {
        return this.getConfig().getFormatConfig().getEnable();
    }
    provideDocumentFormatting() {
        return this.getConfig().getFormatConfig().getDocumentFormattingProvider();
    }
    getTempDirectory() {
        return os.tmpdir();
    }
    isDebugEnabled() {
        return this.getConfig().getDebug();
    }
    log(message, logObject = null, severity = logLevel_1.LogLevel.debug) {
        this.getLogService().log(this.getPluginName() + ": " + message, logObject, severity);
    }
    getConfig() {
        return this.getConfigService().getConfig();
    }
    getConfigService() {
        return this.state.getConfigService();
    }
    getLogService() {
        return this.state.getLogService();
    }
    getState() {
        return this.state;
    }
    getExtensionContext() {
        return this.extensionContext;
    }
    setPluginName(pluginName) {
        this.pluginName = pluginName;
    }
    getPluginName() {
        return this.pluginName;
    }
}
exports["default"] = Plugin;


/***/ }),

/***/ 210:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class BaseService {
    constructor(state) {
        this.state = state;
    }
}
exports["default"] = BaseService;


/***/ }),

/***/ 506:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class ConfigService {
    constructor(config) {
        this.config = config;
    }
    getConfig() {
        return this.config;
    }
}
exports["default"] = ConfigService;


/***/ }),

/***/ 853:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(496);
const logLevel_1 = __webpack_require__(495);
class LogService {
    constructor() {
        this.debug = true;
        this.phpThunderOutputChannel = vscode.window.createOutputChannel("PHPThunder");
    }
    setDebug(debug) {
        this.debug = debug;
    }
    log(message, logObject = null, severity = logLevel_1.LogLevel.debug) {
        let messageString = message.toString();
        if (logObject) {
            let objectString = logObject.toString();
            if (objectString === "[object Object]") {
                objectString = JSON.stringify(logObject);
            }
            messageString += objectString;
        }
        if (severity === logLevel_1.LogLevel.debug && this.debug) {
            this.phpThunderOutputChannel.appendLine("[debug] " + messageString);
        }
        else if (severity === logLevel_1.LogLevel.information) {
            this.phpThunderOutputChannel.appendLine("[info] " + messageString);
        }
        else if (severity === logLevel_1.LogLevel.error) {
            this.phpThunderOutputChannel.appendLine("[error] " + messageString);
        }
        else if (severity === logLevel_1.LogLevel.warning) {
            this.phpThunderOutputChannel.appendLine("[warning] " + messageString);
        }
    }
}
exports["default"] = LogService;


/***/ }),

/***/ 177:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const General_1 = __webpack_require__(418);
const PHPCS_1 = __webpack_require__(163);
const PHPCBF_1 = __webpack_require__(252);
const PHPCSFixer_1 = __webpack_require__(616);
const PHPFMT_1 = __webpack_require__(325);
class PluginService {
    constructor(state) {
        this.state = state;
        const extensionContext = state.getExtensionContext();
        this.general = new General_1.default(extensionContext, state);
        this.phpCS = new PHPCS_1.default(extensionContext, state);
        this.phpCBF = new PHPCBF_1.default(extensionContext, state);
        this.phpCSFixer = new PHPCSFixer_1.default(extensionContext, state);
        this.phpFMT = new PHPFMT_1.default(extensionContext, state);
    }
    initPlugins() {
        this.general.init();
        this.phpCS.init();
        this.phpCBF.init();
        this.phpCSFixer.init();
        this.phpFMT.init();
    }
}
exports["default"] = PluginService;


/***/ }),

/***/ 496:
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),

/***/ 81:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 37:
/***/ ((module) => {

module.exports = require("os");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

// require('module-alias/register');
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const PHPThunder_1 = __webpack_require__(605);
function activate(context) {
    const phpThunder = new PHPThunder_1.default(context);
    // phpThunder.getPHPCS().init(context);
    // phpThunder.getPHPCBF().init(context);
    // phpThunder.getPHPCSFixer().init(context);
    // phpThunder.getPHPFMT().init(context);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;