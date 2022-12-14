const path = require("path");

const mode = process.env.NODE_ENV || "development";

const config = {
    mode,

    entry: {
        main: ["./src/bootstrap.js"], // in case of many files
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        // filename: '[name]-[hash:8]-bundel.js',
        filename: "[name]-bundel.js",
        publicPath: "/",
    },

    // watch: true, // no need for this in case of devServer

    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },

        port: 9000,

        hot: true,

        client: {
            overlay: {
                errors: true,
                warnings: true,
            },
        },
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },
        ],
    },
};

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.devtool = "source-map";
    }

    if (argv.mode === "production") {
        config.target = "browserslist"; // default is 'web'
    }

    return config;
};
