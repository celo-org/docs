// File got generated with 'yarn run swizzle @docusaurus/theme-live-codeblock ReactLiveScope --danger'

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import docusaurusConfig from '../../../docusaurus.config';
import React from 'react';

// Add react-live imports you need here
const ReactLiveScope = {
  ...{ React, ...React },
  ...docusaurusConfig.customFields.liveCodeScope,
};

export default ReactLiveScope;
