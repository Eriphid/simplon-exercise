"use strict";
module.exports = {
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'raw-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    }
};
