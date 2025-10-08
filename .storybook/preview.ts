import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';

// Global styles are configured in angular.json

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      inlineStories: true,
    },
    options: {
      storySort: {
        order: ['Welcome', 'Introduction', '*'],
      },
    },
    backgrounds: {
      options: {
        light: {
          name: 'light',
          value: '#ffffff',
        },

        dark: {
          name: 'dark',
          value: '#0a0a0a',
        }
      }
    },
  },

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      
      // Apply theme to document element
      if (typeof document !== 'undefined') {
        document.documentElement.className = theme;
      }
      
      return story();
    },
  ],

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
};

export default preview;
