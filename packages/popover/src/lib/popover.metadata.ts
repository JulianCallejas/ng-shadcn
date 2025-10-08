export const popoverMetadata = {
  name: 'popover',
  displayName: 'Popover',
  description: 'Displays rich content in a portal, triggered by a button.',
  category: 'overlay',
  version: '1.0.0',
  dependencies: [],
  files: [
    'popover.component.ts'
  ],
  examples: [
    {
      name: 'Basic Popover',
      description: 'Simple popover with content',
      code: `<ng-shadcn-popover>
  <ng-shadcn-popover-trigger>
    <button class="btn">Open Popover</button>
  </ng-shadcn-popover-trigger>
  <ng-shadcn-popover-content>
    <div class="space-y-2">
      <h4 class="font-medium leading-none">Dimensions</h4>
      <p class="text-sm text-muted-foreground">
        Set the dimensions for the layer.
      </p>
    </div>
  </ng-shadcn-popover-content>
</ng-shadcn-popover>`
    },
    {
      name: 'Popover with Form',
      description: 'Popover containing a form',
      code: `<ng-shadcn-popover placement="bottom-start">
  <ng-shadcn-popover-trigger>
    <button class="btn">Settings</button>
  </ng-shadcn-popover-trigger>
  <ng-shadcn-popover-content class="w-80">
    <div class="space-y-4">
      <div class="space-y-2">
        <h4 class="font-medium leading-none">Settings</h4>
        <p class="text-sm text-muted-foreground">
          Configure your preferences.
        </p>
      </div>
      <div class="grid gap-2">
        <label class="text-sm font-medium">Width</label>
        <input class="input" placeholder="100%" />
      </div>
      <div class="grid gap-2">
        <label class="text-sm font-medium">Max width</label>
        <input class="input" placeholder="300px" />
      </div>
    </div>
  </ng-shadcn-popover-content>
</ng-shadcn-popover>`
    }
  ],
  props: {
    popover: [
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
        description: 'Whether the popover is open (controlled)'
      },
      {
        name: 'placement',
        type: 'PopoverPlacement',
        default: "'bottom'",
        description: 'The placement of the popover relative to the trigger'
      },
      {
        name: 'modal',
        type: 'boolean',
        default: 'false',
        description: 'Whether the popover should be modal'
      },
      {
        name: 'closeOnClickOutside',
        type: 'boolean',
        default: 'true',
        description: 'Whether to close when clicking outside'
      }
    ],
    popoverTrigger: [
      {
        name: 'isOpen',
        type: 'boolean',
        default: 'false',
        description: 'Whether the popover is open'
      }
    ],
    popoverContent: [
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes'
      },
      {
        name: 'placement',
        type: 'PopoverPlacement',
        default: "'bottom'",
        description: 'The placement of the popover'
      },
      {
        name: 'showArrow',
        type: 'boolean',
        default: 'true',
        description: 'Whether to show the arrow pointer'
      },
      {
        name: 'modal',
        type: 'boolean',
        default: 'false',
        description: 'Whether the popover is modal'
      }
    ]
  },
  events: {
    popover: [
      {
        name: 'openChange',
        type: 'EventEmitter<boolean>',
        description: 'Emitted when the popover open state changes'
      }
    ],
    popoverTrigger: [
      {
        name: 'openChange',
        type: 'EventEmitter<boolean>',
        description: 'Emitted when the trigger is activated'
      }
    ]
  },
  types: {
    PopoverPlacement: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'"
  },
  accessibility: {
    roles: ['dialog'],
    keyboardNavigation: [
      'Tab - Move focus to the trigger',
      'Enter/Space - Open/close the popover',
      'Escape - Close the popover'
    ],
    ariaAttributes: [
      'aria-haspopup - Indicates the trigger has a popup',
      'aria-expanded - Indicates whether the popover is expanded',
      'aria-modal - Indicates if the popover is modal',
      'role="dialog" - Identifies the popover content as a dialog'
    ]
  }
};
