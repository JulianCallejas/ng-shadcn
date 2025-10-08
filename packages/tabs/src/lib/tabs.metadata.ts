export const tabsMetadata = {
  name: 'tabs',
  displayName: 'Tabs',
  description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  category: 'navigation',
  version: '1.0.0',
  dependencies: [],
  files: [
    'tabs.component.ts'
  ],
  examples: [
    {
      name: 'Basic Tabs',
      description: 'Simple horizontal tabs with content panels',
      code: `<ng-shadcn-tabs defaultValue="tab1">
  <ng-shadcn-tab-list>
    <ng-shadcn-tab-trigger value="tab1">Account</ng-shadcn-tab-trigger>
    <ng-shadcn-tab-trigger value="tab2">Password</ng-shadcn-tab-trigger>
  </ng-shadcn-tab-list>
  <ng-shadcn-tab-content value="tab1">
    <p>Make changes to your account here.</p>
  </ng-shadcn-tab-content>
  <ng-shadcn-tab-content value="tab2">
    <p>Change your password here.</p>
  </ng-shadcn-tab-content>
</ng-shadcn-tabs>`
    },
    {
      name: 'Vertical Tabs',
      description: 'Tabs arranged vertically',
      code: `<ng-shadcn-tabs defaultValue="tab1" orientation="vertical">
  <ng-shadcn-tab-list>
    <ng-shadcn-tab-trigger value="tab1">General</ng-shadcn-tab-trigger>
    <ng-shadcn-tab-trigger value="tab2">Security</ng-shadcn-tab-trigger>
    <ng-shadcn-tab-trigger value="tab3">Integrations</ng-shadcn-tab-trigger>
  </ng-shadcn-tab-list>
  <ng-shadcn-tab-content value="tab1">
    <p>General settings content.</p>
  </ng-shadcn-tab-content>
  <ng-shadcn-tab-content value="tab2">
    <p>Security settings content.</p>
  </ng-shadcn-tab-content>
  <ng-shadcn-tab-content value="tab3">
    <p>Integrations settings content.</p>
  </ng-shadcn-tab-content>
</ng-shadcn-tabs>`
    }
  ],
  props: {
    tabs: [
      {
        name: 'defaultValue',
        type: 'string',
        default: "''",
        description: 'The default active tab value'
      },
      {
        name: 'value',
        type: 'string',
        default: "''",
        description: 'The controlled active tab value'
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'The orientation of the tabs'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes'
      }
    ],
    tabList: [
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes'
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'The orientation of the tab list'
      }
    ],
    tabTrigger: [
      {
        name: 'value',
        type: 'string',
        default: "''",
        description: 'The unique value for this tab'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the tab is disabled'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes'
      }
    ],
    tabContent: [
      {
        name: 'value',
        type: 'string',
        default: "''",
        description: 'The unique value for this tab content'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes'
      }
    ]
  },
  events: {
    tabs: [
      {
        name: 'valueChange',
        type: 'EventEmitter<string>',
        description: 'Emitted when the active tab changes'
      }
    ]
  },
  accessibility: {
    roles: ['tablist', 'tab', 'tabpanel'],
    keyboardNavigation: [
      'Tab - Move focus to the next focusable element',
      'Shift + Tab - Move focus to the previous focusable element',
      'Enter/Space - Activate the focused tab',
      'Arrow Keys - Navigate between tabs (when focused)'
    ],
    ariaAttributes: [
      'aria-selected - Indicates the selected state of a tab',
      'aria-controls - References the associated tab panel',
      'aria-labelledby - References the associated tab trigger',
      'aria-orientation - Indicates the orientation of the tablist'
    ]
  }
};
