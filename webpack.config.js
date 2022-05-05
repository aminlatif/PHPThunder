/* eslint-disable @typescript-eslint/naming-convention */
//@ts-check

"use strict";

const path = require("path");

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
    target: "node", // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
    mode: "none", // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
    entry: "./src/extension.ts", // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
    output: {
        // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
        path: path.resolve(__dirname, "dist"),
        filename: "extension.js",
        libraryTarget: "commonjs2",
    },
    // node: {
    //     __dirname: false,
    // },
    externals: {
        vscode: "commonjs vscode", // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
        // modules added here also need to be added in the .vscodeignore file
    },
    resolve: {
        // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
        extensions: [".ts", ".js"],
        alias: {
            "@cmt": path.resolve(__dirname, "src"),
            "@enum": path.resolve(__dirname, "src/enum"),
            "@model": path.resolve(__dirname, "src/model"),
            "@plugin": path.resolve(__dirname, "src/plugin"),
            "@service": path.resolve(__dirname, "src/service"),
        },
        // mainFields: ["main", "module"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        // configure TypeScript loader:
                        // * enable sources maps for end-to-end source maps
                        loader: "ts-loader",
                        options: {
                            compilerOptions: {
                                sourceMap: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
    devtool: "source-map",
    optimization: {
        minimize: false,
    },
    stats: {
        warnings: true,
    },
    infrastructureLogging: {
        level: "log", // enables logging required for problem matchers
    },
};

// if (process.env.BUILD_VSCODE_NLS) {
//     // rewrite nls call when being asked for
//     extensionConfig.module.rules.unshift({
//         loader: "vscode-nls-dev/lib/webpack-loader",
//         options: {
//             base: __dirname,
//         },
//     });
// }

module.exports = [extensionConfig];
