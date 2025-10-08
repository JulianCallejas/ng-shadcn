export const dropdownMenuMetadata = {
  name: 'dropdown-menu',
  displayName: 'Dropdown Menu',
  description: 'Displays a menu to the user—such as a set of actions or functions—triggered by a button.',
  category: 'navigation',
  version: '1.0.0',
  dependencies: [],
  files: [
    'dropdown-menu.component.ts'
  ],
  examples: [
    {
      name: 'Basic Dropdown',
      description: 'Simple dropdown menu with actions',
      code: `<ng-shadcn-dropdown-menu>
  <ng-shadcn-dropdown-menu-trigger>
    <button class="btn">Open Menu</button>
  </ng-shadcn-dropdown-menu-trigger>
  <ng-shadcn-dropdown-menu-content>
    <ng-shadcn-dropdown-menu-item label="Profile" (itemSelected)="openProfile()"></ng-shadcn-dropdown-menu-item>
    <ng-shadcn-dropdown-menu-item label="Settings" (itemSelected)="openSettings()"></ng-shadcn-dropdown-menu-item>
    <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
    <ng-shadcn-dropdown-menu-item label="Logout" (itemSelected)="logout()"></ng-shadcn-dropdown-menu-item>
  </ng-shadcn-dropdown-menu-content>
</ng-shadcn-dropdown-menu>`
    },
    {
      name: 'With Icons and Shortcuts',
      description: 'Dropdown menu with icons and keyboard shortcuts',
      code: `<ng-shadcn-dropdown-menu>
  <ng-shadcn-dropdown-menu-trigger>
    <button class="btn">Actions</button>
  </ng-shadcn-dropdown-menu-trigger>
  <ng-shadcn-dropdown-menu-content>
    <ng-shadcn-dropdown-menu-label>My Account</ng-shadcn-dropdown-menu-label>
    <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
    <ng-shadcn-dropdown-menu-item 
      label="Profile" 
      icon="👤" 
      shortcut="⌘P"
      (itemSelected)="openProfile()">
    </ng-shadcn-dropdown-menu-item>
    <ng-shadcn-dropdown-menu-item 
      label="Settings" 
      icon="⚙️" 
      shortcut="⌘S"
      (itemSelected)="openSettings()">
    </ng-shadcn-dropdown-menu-item>
  </ng-shadcn-dropdown-menu-content>
</ng-shadcn-dropdown-menu>`
    }
  ],
  props: {
    dropdownMenu: [
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes'
      },
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        description: 'Whether the dropdown is open (controlled)'
      }
    ],
    dropdownMenuTrigger: [
      {
        name: 'isOpen',
        type: 'boolean',
        default: 'false',
        description: 'Whether the dropdown is open'
      }
    ],
    dropdownMenuContent: [
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes'
      },
      {
        name: 'minWidth',
        type: 'number',
        default: '220',
        description: 'Minimum width of the dropdown content'
      }
    ],
    dropdownMenuItem: [
      {
        name: 'label',
        type: 'string',
        default: "''",
        description: 'The text label for the menu item'
      },
      {
        name: 'icon',
        type: 'string',
        default: "''",
        description: 'Icon HTML or text to display'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the menu item is disabled'
      },
      {
        name: 'shortcut',
        type: 'string',
        default: "''",
        description: 'Keyboard shortcut text to display'
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
    dropdownMenu: [
      {
        name: 'openChange',
        type: 'EventEmitter<boolean>',
        description: 'Emitted when the dropdown open state changes'
      }
    ],
    dropdownMenuTrigger: [
      {
        name: 'openChange',
        type: 'EventEmitter<boolean>',
        description: 'Emitted when the trigger is activated'
      }
    ],
    dropdownMenuItem: [
      {
        name: 'itemSelected',
        type: 'EventEmitter<void>',
        description: 'Emitted when the menu item is selected'
      }
    ]
  },
  accessibility: {
    roles: ['menu', 'menuitem', 'separator'],
    keyboardNavigation: [
      'Tab - Move focus to the trigger',
      'Enter/Space - Open/close the dropdown',
      'Escape - Close the dropdown',
      'Arrow Keys - Navigate between menu items (when open)'
    ],
    ariaAttributes: [
      'aria-haspopup - Indicates the trigger has a popup menu',
      'aria-expanded - Indicates whether the menu is expanded',
      'aria-disabled - Indicates disabled menu items',
      'role="menu" - Identifies the menu container',
      'role="menuitem" - Identifies individual menu items',
      'role="separator" - Identifies menu separators'
    ]
  }
};
