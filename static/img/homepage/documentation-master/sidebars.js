module.exports = {
  docs: [
    {
      type: 'category',
      label: 'AGILETS',
      collapsed: false,
      items: [
        'main/introduction',
        'main/installation',
        'main/style-guide',
        'main/frameworks',
        'main/contributing',
      ],
    },
    {
      type: 'category',
      label: 'QUICK START',
      collapsed: false,
      items: ['quick_start/react', 'quick_start/vue'],
    },
    {
      type: 'category',
      label: 'PACKAGES',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'core',
          collapsed: false,
          items: [
            'packages/core/introduction',
            'packages/core/installation',
            {
              type: 'category',
              label: 'Guides',
              items: [
                'packages/core/guides/typescript',
                'packages/core/guides/debugging',
                'packages/core/guides/testing',
              ],
            },
            {
              type: 'category',
              label: 'API',
              items: [
                {
                  type: 'category',
                  label: 'Agile Instance',
                  items: [
                    'packages/core/api/agile-instance/introduction',
                    'packages/core/api/agile-instance/properties',
                    'packages/core/api/agile-instance/methods',
                  ],
                },
                {
                  type: 'category',
                  label: 'State',
                  items: [
                    'packages/core/api/state/introduction',
                    'packages/core/api/state/properties',
                    'packages/core/api/state/methods',
                  ],
                },
                {
                  type: 'category',
                  label: 'Collection',
                  items: [
                    'packages/core/api/collection/introduction',
                    'packages/core/api/collection/methods',
                    'packages/core/api/collection/properties',
                    {
                      type: 'category',
                      label: 'Group',
                      items: [
                        'packages/core/api/collection/group/introduction',
                        'packages/core/api/collection/group/methods',
                        'packages/core/api/collection/group/properties',
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Selector',
                      items: [
                        'packages/core/api/collection/selector/introduction',
                        'packages/core/api/collection/selector/methods',
                        'packages/core/api/collection/selector/properties',
                      ],
                    },
                  ],
                },
                {
                  type: 'category',
                  label: 'Computed',
                  items: [
                    'packages/core/api/computed/introduction',
                    'packages/core/api/computed/methods',
                    'packages/core/api/computed/properties',
                  ],
                },
                {
                  type: 'category',
                  label: 'Storage',
                  items: [
                    'packages/core/api/storage/introduction',
                    'packages/core/api/storage/persisting-data',
                  ],
                },
                'packages/core/api/integration/introduction',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'react',
          items: [
            'packages/react/introduction',
            'packages/react/installation',
            {
              type: 'category',
              label: 'API',
              items: [
                'packages/react/api/hooks',
                'packages/react/api/agileHOC',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'vue',
          items: ['packages/vue/introduction', 'packages/vue/installation'],
        },
        {
          type: 'category',
          label: 'logger',
          items: [
            'packages/logger/introduction',
            'packages/logger/installation',
          ],
        },
        {
          type: 'category',
          label: '⚠️ WIP',
          items: [
            {
              type: 'category',
              label: '⚠️ api',
              items: ['packages/api/introduction', 'packages/api/installation'],
            },
            {
              type: 'category',
              label: '⚠️ event',
              items: [
                'packages/event/introduction',
                'packages/event/installation',
                {
                  type: 'category',
                  label: 'API',
                  items: ['packages/event/api/hooks'],
                },
              ],
            },
            {
              type: 'category',
              label: '⚠️ multieditor',
              items: [
                'packages/multieditor/introduction',
                'packages/multieditor/installation',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'EXAMPLES',
      items: [
        'examples/introduction',
        'examples/react/introduction',
        'examples/react-native/introduction',
        'examples/vue/introduction',
      ],
    },
    'interfaces',
  ],
};
