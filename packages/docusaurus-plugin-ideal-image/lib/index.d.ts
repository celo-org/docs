/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { LoadContext, Plugin, OptionValidationContext } from '@docusaurus/types';
import type { PluginOptions } from '@docusaurus/plugin-ideal-image';
export default function pluginIdealImage(context: LoadContext, options: PluginOptions): Plugin<void>;
export declare function validateOptions({ validate, options, }: OptionValidationContext<PluginOptions, PluginOptions>): PluginOptions;
