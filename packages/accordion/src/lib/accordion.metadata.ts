export const accordionMetadata = {
  name: 'accordion',
  displayName: 'Accordion',
  description: 'A vertically stacked set of interactive headings that each reveal a section of content.',
  category: 'disclosure',
  version: '1.0.0',
  dependencies: [],
  files: [
    'accordion.component.ts'
  ],
  examples: [
    {
      name: 'Basic Accordion',
      description: 'Simple accordion with collapsible sections',
      code: `<ng-shadcn-accordion type="single" collapsible="true">
  <ng-shadcn-accordion-item value="item-1">
    <ng-shadcn-accordion-trigger>Is it accessible?</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      Yes. It adheres to the WAI-ARIA design pattern.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  <ng-shadcn-accordion-item value="item-2">
    <ng-shadcn-accordion-trigger>Is it styled?</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      Yes. It comes with default styles that match the other components' aesthetic.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
</ng-shadcn-accordion>`
    },
    {
      name: 'Multiple Accordion',
      description: 'Accordion allowing multiple sections to be open',
      code: `<ng-shadcn-accordion type="multiple" [defaultValue]="['item-1', 'item-2']">
  <ng-shadcn-accordion-item value="item-1">
    <ng-shadcn-accordion-trigger>Can I open multiple sections?</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      Yes, when type is set to "multiple", you can have multiple sections open at once.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  <ng-shadcn-accordion-item value="item-2">
    <ng-shadcn-accordion-trigger>Is it animated?</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      Yes. It includes smooth animations for opening and closing sections.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  <ng-shadcn-accordion-item value="item-3">
    <ng-shadcn-accordion-trigger>Can sections be disabled?</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      Yes. Individual sections can be disabled by setting the disabled property.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
</ng-shadcn-accordion>`
    }
  ],
  props: {
    accordion: [
      {
        name: 'type',
        type: "'single' | 'multiple'",
        default: "'single'",
        description: 'Whether one or multiple items can be opened at the same time'
      },
      {
        name: 'collapsible',
        type: 'boolean',
        default: 'false',
        description: 'When type is "single", allows closing the open item'
      },
      {
        name: 'defaultValue',
        type: 'string | string[]',
        default: "''",
        description: 'The default value of the item(s) to expand'
      },
      {
        name: 'value',
        type: 'string | string[]',
        default: "''",
        description: 'The controlled value of the item(s) to expand'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes'
      }
    ],
    accordionItem: [
      {
        name: 'value',
        type: 'string',
        default: "''",
        description: 'A unique value for the item'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the item is disabled'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes'
      }
    ],
    accordionTrigger: [
      {
        name: 'value',
        type: 'string',
        default: "''",
        description: 'The value of the item this trigger belongs to'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the trigger is disabled'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes'
      }
    ],
    accordionContent: [
      {
        name: 'value',
        type: 'string',
        default: "''",
        description: 'The value of the item this content belongs to'
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
    accordion: [
      {
        name: 'valueChange',
        type: 'EventEmitter<string | string[]>',
        description: 'Emitted when the expanded items change'
      }
    ],
    accordionTrigger: [
      {
        name: 'itemToggled',
        type: 'EventEmitter<string>',
        description: 'Emitted when the trigger is activated'
      }
    ]
  },
  accessibility: {
    roles: ['region'],
    keyboardNavigation: [
      'Tab - Move focus to the next trigger',
      'Shift + Tab - Move focus to the previous trigger',
      'Enter/Space - Toggle the focused trigger',
      'Arrow Keys - Navigate between triggers'
    ],
    ariaAttributes: [
      'aria-expanded - Indicates whether the section is expanded',
      'aria-controls - References the associated content panel',
      'aria-labelledby - References the associated trigger',
      'role="region" - Identifies the content area'
    ]
  }
};
