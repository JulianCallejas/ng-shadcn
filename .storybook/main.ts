import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { StorybookConfig } from '@storybook/angular';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: [
    '../src/stories/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../packages/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-docs"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/angular"),
    options: {},
  },

  docs: {
    autodocs: 'tag',
    defaultName: 'Welcome',
  },
  staticDirs: ['../src/assets'],

  typescript: {
    check: false,
  }
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
