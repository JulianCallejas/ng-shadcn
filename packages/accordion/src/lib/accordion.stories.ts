import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { 
  AccordionComponent, 
  AccordionItemComponent, 
  AccordionTriggerComponent, 
  AccordionContentComponent 
} from './accordion.component';
import { Component, signal } from '@angular/core';


const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        AccordionComponent,
        AccordionItemComponent,
        AccordionTriggerComponent,
        AccordionContentComponent
      ],
    }),
  ],
//   parameters: {
//     layout: 'centered',
//     docs: {
//       description: {
//         component: `An interactive component that allows users to toggle the display of content sections.

// ## Installation

// \`\`\`bash
// # Using npm
// npm install @your-scope/accordion

// # Using yarn
// yarn add @your-scope/accordion

// # Using pnpm
// pnpm add @your-scope/accordion
// \`\`\`

// Make sure to import the module in your Angular application's module:

// \`\`\`typescript
// import { AccordionModule } from '@your-scope/accordion';

// @NgModule({
//   imports: [
//     // ... other imports
//     AccordionModule
//   ]
// })
// export class YourModule { }
// \`\`\``,
//       },
//     },
//   },
  tags: ['autodocs'],
  subcomponents: {
    AccordionItemComponent: AccordionItemComponent,
    AccordionTriggerComponent: AccordionTriggerComponent,
    AccordionContentComponent: AccordionContentComponent
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `An interactive component that allows users to toggle the display of content sections.

## Installation

\`\`\`bash
# Using npm
npm install @your-scope/accordion

# Using yarn
yarn add @your-scope/accordion

# Using pnpm
pnpm add @your-scope/accordion
\`\`\`

Make sure to import the module in your Angular application's module:

\`\`\`typescript
import { AccordionModule } from '@your-scope/accordion';

@NgModule({
  imports: [
    // ... other imports
    AccordionModule
  ]
})
export class YourModule { }
\`\`\``,
      },
      extractComponentDescription: (component: any) => {
        if (component === AccordionComponent) {
          return 'The root component that contains all accordion items.';
        }
        if (component === AccordionItemComponent) {
          return 'A single collapsible section that contains a trigger and content.';
        }
        if (component === AccordionTriggerComponent) {
          return 'The clickable element that toggles the visibility of the accordion content.';
        }
        if (component === AccordionContentComponent) {
          return 'The collapsible content area that is shown/hidden when the trigger is clicked.';
        }
        return null;
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Type of the accordion behavior',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'single' },
      },
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    accordionItems: {
      control: 'object',
      table: {
        type: { 
          summary: 'QueryList<AccordionItemComponent>', 
          detail: 'Accordion Item container. An individual collapsible section that contains a trigger and content.',
        },
      },
    },
    accordionTriggers: {
      control: 'object',
      table: {
        type: { 
          summary: 'QueryList<AccordionTriggerComponent>', 
          detail: 'Accordion Trigger container. The clickable title element that toggles the visibility of the accordion content.',
        },
      },
    },
    accordionContents: {
      control: 'object',
      table: {
        type: { 
          summary: 'QueryList<AccordionContentComponent>', 
          detail: 'Accordion Content container. The collapsible content area that is shown/hidden when the trigger is clicked.',
        },
      },
    },
  },
  args: {
    type: 'single',
    class: '',
  },

};

export default meta;
type Story = StoryObj<AccordionComponent>;

//#region Basic Usage
export const Basic: Story = {
  parameters:{
    controls: {
      exclude: [
        'initialized',
        'isControlled',
        'seenItemIds',
        'autoExpandedItems',
        'computedClasses',
        'expandedItems',
        'ngAfterContentInit',
        'ngOnChanges',
        'initializeFromDefaults',
        'syncChildren',
        'toggleItem',
        'updateControlledState',
        'validateProps',
      ]
    }
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-100">
        <ng-shadcn-accordion [type]="type" [class]="class" >
          <ng-shadcn-accordion-item id="item-1">
            <ng-shadcn-accordion-trigger>Is it accessible?</ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content>
              Yes. It adheres to the WAI-ARIA design pattern.
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>

          <ng-shadcn-accordion-item id="item-2">
            <ng-shadcn-accordion-trigger>Is it styled?</ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content>
              Yes. It comes with default styles that match the other components' aesthetics.
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>

          <ng-shadcn-accordion-item id="item-3" [disabled]="true">
            <ng-shadcn-accordion-trigger>Can it be disabled?</ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content>
              Yes. You can disable the accordion by adding the disabled prop.
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>
        </ng-shadcn-accordion>
      </div>
    `,
  }),
};

//#region Multiple Items Open
export const Multiple: Story = {
  ...Basic,
  args: {
    ...Basic.args,
    type: 'multiple',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-100">
        <ng-shadcn-accordion [type]="type">
          <ng-shadcn-accordion-item id="item-1">
            <ng-shadcn-accordion-trigger>First Item</ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content>
              First item content.
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>

          <ng-shadcn-accordion-item id="item-2">
            <ng-shadcn-accordion-trigger>Second Item</ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content>
              Second item content.
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>

          <ng-shadcn-accordion-item id="item-3">
            <ng-shadcn-accordion-trigger>Third Item</ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content>
              Third item content.
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>
        </ng-shadcn-accordion>
      </div>
    `,
  }),
};

//#region Controlled Example

@Component({
  selector: 'story-accordion-controlled',
  standalone: true,
  imports: [AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent],
  template: `
    <div class="space-y-4">
      <div class="flex gap-2">
        <button 
          (click)="toggleItem('item-1')" 
          class="px-3 py-1 text-sm border rounded"
          [class.bg-blue-100]="isOpen('item-1')">
          Toggle Item 1
        </button>
        <button 
          (click)="toggleItem('item-2')" 
          class="px-3 py-1 text-sm border rounded"
          [class.bg-blue-100]="isOpen('item-2')">
          Toggle Item 2
        </button>
      </div>

      <ng-shadcn-accordion 
        type="multiple"
        [expandedItems]="openItems()"
        (expandedItemsChange)="openItems.set($event)">
        <ng-shadcn-accordion-item id="item-1">
          <ng-shadcn-accordion-trigger (itemToggled)="toggleItem('item-1')" >
            Controlled Item 1
          </ng-shadcn-accordion-trigger>
          <ng-shadcn-accordion-content>
            This accordion item is controlled by the parent component.
          </ng-shadcn-accordion-content>
        </ng-shadcn-accordion-item>

        <ng-shadcn-accordion-item id="item-2">
          <ng-shadcn-accordion-trigger (itemToggled)="toggleItem('item-2')">
            Controlled Item 2
          </ng-shadcn-accordion-trigger>
          <ng-shadcn-accordion-content>
            This accordion item is also controlled by the parent component.
          </ng-shadcn-accordion-content>
        </ng-shadcn-accordion-item>
      </ng-shadcn-accordion>
    </div>
  `,
})
class AccordionControlledStory {
  private accordionItems = [
    { id: 'item-1', title: 'Controlled Item 1', content: 'This accordion item is controlled by the parent component.' },
    { id: 'item-2', title: 'Controlled Item 2', content: 'This accordion item is also controlled by the parent component.' },
  ];

  
  openItems = signal<string[]>(['item-1']);

  isOpen(id: string): boolean {
    return this.openItems().includes(id);
  }

  toggleItem(id: string): void {
    this.openItems.update(items => 
      items.includes(id) 
        ? items.filter(item => item !== id)
        : [...items, id]
    );
  }
}






export const Controlled: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [AccordionControlledStory],
    },
    template: '<story-accordion-controlled></story-accordion-controlled>',
  }),
  parameters: {
    docs: {
      description: {
        story: 'Accordion with controlled state from the parent component using expandedItems and expandedItemsChange.',
      },
      source: {
        // 1. Set type to 'code' to force Storybook to use this exact string
        type: 'code', 
        language: 'typescript',
        code: `
        // Component Class
        @Component({
          selector: 'story-accordion-controlled',
          standalone: true,
          imports: [AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent],
          template: \`
            <div class="space-y-4">
              <div class="flex gap-2">
                <button 
                  (click)="toggleItem('item-1')" 
                  class="px-3 py-1 text-sm border rounded"
                  [class.bg-blue-100]="isOpen('item-1')">
                  Toggle Item 1
                </button>
                <button 
                  (click)="toggleItem('item-2')" 
                  class="px-3 py-1 text-sm border rounded"
                  [class.bg-blue-100]="isOpen('item-2')">
                  Toggle Item 2
                </button>
              </div>

              <ng-shadcn-accordion 
                type="multiple"
                [expandedItems]="openItems()"
                (expandedItemsChange)="openItems.set($event)">
                <ng-shadcn-accordion-item id="item-1">
                  <ng-shadcn-accordion-trigger (itemToggled)="toggleItem('item-1')" >
                    Controlled Item 1
                  </ng-shadcn-accordion-trigger>
                  <ng-shadcn-accordion-content>
                    This accordion item is controlled by the parent component.
                  </ng-shadcn-accordion-content>
                </ng-shadcn-accordion-item>

                <ng-shadcn-accordion-item id="item-2">
                  <ng-shadcn-accordion-trigger (itemToggled)="toggleItem('item-2')">
                    Controlled Item 2
                  </ng-shadcn-accordion-trigger>
                  <ng-shadcn-accordion-content>
                    This accordion item is also controlled by the parent component.
                  </ng-shadcn-accordion-content>
                </ng-shadcn-accordion-item>
              </ng-shadcn-accordion>
            </div>
          \`,
        })
        class AccordionControlledStory {
          openItems = signal<string[]>(['item-1']);

          isOpen(id: string): boolean {
            return this.openItems().includes(id);
          }

          toggleItem(id: string): void {
            this.openItems.update(items => 
              items.includes(id) 
                ? items.filter(item => item !== id)
                : [...items, id]
            );
          }
        }
        `,
      },
    },
  },
};

//#region Single with Collapsible
export const SingleWithCollapsible: Story = {
  ...Basic,
  args: {
    ...Basic.args,
    type: 'single',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-100">
        <ng-shadcn-accordion [type]="type">
          <ng-shadcn-accordion-item id="item-1">
            <ng-shadcn-accordion-trigger>First Item</ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content>
              First item content.
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>

          <ng-shadcn-accordion-item id="item-2">
            <ng-shadcn-accordion-trigger>Second Item</ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content>
              Second item content.
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>
        </ng-shadcn-accordion>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Single accordion with collapsible behavior where all items can be closed.',
      },
    },
  },
};
