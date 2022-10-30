const path = require("path");
module.exports = {
    entry: { app: "./src/public/ts/pages/web/index.ts" },
    devtool: "inline-source-map",
    mode: "development",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "build", "public", "js"),
        clean: true,
        publicPath: "",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    target: "node",

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
                include: [path.resolve(__dirname, "src", "public", "ts")],
            },

            {
                use: "babel-loader",
                test: /.(js)$/,
                exclude: "/node_modules/",
            },
        ],
    },
};
