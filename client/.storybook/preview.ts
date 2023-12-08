import React from 'react';
import { Suspense } from 'react';

import type { Preview } from '@storybook/react';

import '@/index.scss';
import '@/i18n';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
