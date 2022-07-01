"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = void 0;
const utils_validation_1 = require("@docusaurus/utils-validation");
const theme_translations_1 = require("@docusaurus/theme-translations");
function pluginIdealImage(context, options) {
    const { i18n: { currentLocale }, } = context;
    return {
        name: 'docusaurus-plugin-ideal-image',
        getThemePath() {
            return '../lib/theme';
        },
        getTypeScriptThemePath() {
            return '../src/theme';
        },
        getDefaultCodeTranslationMessages() {
            return (0, theme_translations_1.readDefaultCodeTranslationMessages)({
                locale: currentLocale,
                name: 'plugin-ideal-image',
            });
        },
        configureWebpack(_config, isServer) {
            const { disableInDev, ...loaderOptions } = options;
            if (disableInDev && process.env.NODE_ENV !== 'production') {
                return {};
            }
            return {
                mergeStrategy: {
                    'module.rules': 'prepend',
                },
                module: {
                    rules: [
                        {
                            test: /\.(?:png|jpe?g)$/i,
                            use: [
                                require.resolve('@docusaurus/lqip-loader'),
                                {
                                    loader: require.resolve('@docusaurus/responsive-loader'),
                                    options: {
                                        // Don't emit for server-side rendering
                                        emitFile: !isServer,
                                        // eslint-disable-next-line global-require
                                        adapter: require('@docusaurus/responsive-loader/sharp'),
                                        name: 'assets/ideal-img/[name].[hash:hex:7].[width].[ext]',
                                        ...loaderOptions,
                                    },
                                },
                            ],
                        },
                    ],
                },
            };
        },
    };
}
exports.default = pluginIdealImage;
function validateOptions({ validate, options, }) {
    const pluginOptionsSchema = utils_validation_1.Joi.object({
        disableInDev: utils_validation_1.Joi.boolean().default(true),
    }).unknown();
    return validate(pluginOptionsSchema, options);
}
exports.validateOptions = validateOptions;
