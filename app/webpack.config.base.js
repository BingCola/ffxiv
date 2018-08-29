/**
 * Base webpack config used across other specific configs
 */

import path from "path";
export const chunks = {
    app: [path.join(__dirname, "./index.js")]
};

export default {
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: "babel-loader",
                exclude: [/node_modules/]
            },
            {
                test
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].[chunkhash].js",
        publicPath: "./public"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".css"],
        modules: [__dirname, "node_modules"],
        alias: {
            common: path.resolve(__dirname, "./app/common")
        }
    }
};
