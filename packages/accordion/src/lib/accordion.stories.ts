import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { 
  AccordionComponent, 
  AccordionItemComponent, 
  AccordionTriggerComponent, 
  AccordionContentComponent 
} from './index';
import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@packages/button/src/public-api';


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
npm install @ng-shadcn/accordion
# Using yarn
yarn add @ng-shadcn/accordion
# Using pnpm
pnpm add @ng-shadcn/accordion
\`\`\`
## Usage
### Standalone Components (Recommended)
Import and use the individual components directly in your standalone components:

\`\`\`typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  AccordionComponent, 
  AccordionItemComponent,
  AccordionTriggerComponent,
  AccordionContentComponent
} from '@ng-shadcn/accordion';
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    CommonModule,
    AccordionComponent,
    AccordionItemComponent,
    AccordionTriggerComponent,
    AccordionContentComponent
  ],
  template: \`
    <ng-shadcn-accordion type="single">
      <ng-shadcn-accordion-item id="item-1">
        <ng-shadcn-accordion-trigger>Item 1</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>Content 1</ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
    </ng-shadcn-accordion>
  \`
})
export class ExampleComponent { }

\`\`\`

### Using NgModule (Legacy)
If you're using NgModules, import the \[AccordionModule\](cci:2://file:///d:/Documents/Desarrollos/jc-develop/Angular/monorepo-ui-components/packages/accordion/src/lib/accordion.module.ts:21:0-36:32):

\`\`\`typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from '@ng-shadcn/accordion';
@NgModule({
  declarations: [YourComponent],
  imports: [
    CommonModule,
    AccordionModule
  ],
  exports: [YourComponent]
})
export class YourModule { }

\`\`\`

Then use the components in your templates:

\`\`\`html
<ng-shadcn-accordion type="single">
  <ng-shadcn-accordion-item id="item-1">
    <ng-shadcn-accordion-trigger>Item 1</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>Content 1</ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
</ng-shadcn-accordion>

\`\`\`

## Features
- **Multiple or Single Item Open**: Control whether multiple items can be open at once
- **Controlled/Uncontrolled**: Use as controlled or uncontrolled component
- **Accessible**: Follows WAI-ARIA design patterns
- **Keyboard Navigation**: Full keyboard support
- **Customizable**: Style with your own CSS classes
- **TypeScript Support**: Fully typed API
`,
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
    expandedItems: {
      control: false,
      description: 'An array of item IDs that should be expanded, its used for controlled components',
      table: {
        type: { 
          summary: 'string[] | undefined',
          detail: 'Array of item IDs that should be expanded'
        },
        defaultValue: { summary: 'undefined' },
      },
    },
    defaultExpanded: {
      control: false,
      description: 'An array of item IDs that should be expanded by default',
      table: {
        type: { 
          summary: 'string[] | undefined',
        },
        defaultValue: { summary: 'undefined' },
      },
    },
    type: {
      control: 'radio',
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
      control: false,
      table: {
        type: { 
          summary: 'QueryList<AccordionItemComponent>', 
        },
      },
    },
    expandedItemsChange: {
      control: false,
      description: 'Event emitted when the expanded items change',
      table: {
        type: { 
          summary: '(items: string[]) => void',
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
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-100">
        <ng-shadcn-accordion type="multiple">
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
  imports: [AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent, ButtonComponent],
  template: `
    <div class="space-y-4 w-100">
      <div class="flex gap-2">
        <ng-shadcn-button 
          (click)="toggleItem('item-1')" 
          [variant] = "isOpen('item-1') ? 'default' : 'outline'"
        >
          Toggle Item 1
        </ng-shadcn-button>
        <ng-shadcn-button 
          (click)="toggleItem('item-2')" 
          [variant] = "isOpen('item-2') ? 'default' : 'outline'"
        >
          Toggle Item 2
        </ng-shadcn-button>
        <ng-shadcn-button 
          (click)="toogleDisabled()" 
          [variant] = "disabled() ? 'default' : 'outline'"
        >
          Disable Item 2
        </ng-shadcn-button>
      </div>

      <ng-shadcn-accordion 
        type="multiple"
        [expandedItems]="openItems()"
        (expandedItemsChange)="openItems.set($event)"
      >
        @for(item of accordionItems; track item.id) {
          <ng-shadcn-accordion-item  [id]="item.id" [disabled]="disabled()">
            <ng-shadcn-accordion-trigger (itemToggled)="toggleItem(item.id)" >
              {{item.title}}
            </ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content>
              {{item.content}}
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>
        }
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
  disabled = signal<boolean>(false);

  isOpen(id: string): boolean {
    return this.openItems().includes(id);
  }

  toogleDisabled(): void {
    this.disabled.update(value => !value);
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
  imports: [AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent, ButtonComponent],
  template: \`
    <div class="space-y-4 w-100">
      <div class="flex gap-2">
        <ng-shadcn-button 
          (click)="toggleItem('item-1')" 
          [variant] = "isOpen('item-1') ? 'default' : 'outline'"
        >
          Toggle Item 1
        </ng-shadcn-button>
        <ng-shadcn-button 
          (click)="toggleItem('item-2')" 
          [variant] = "isOpen('item-2') ? 'default' : 'outline'"
        >
          Toggle Item 2
        </ng-shadcn-button>
        <ng-shadcn-button 
          (click)="toogleDisabled()" 
          [variant] = "disabled() ? 'default' : 'outline'"
        >
          Disable Item 2
        </ng-shadcn-button>
      </div>

      <ng-shadcn-accordion 
        type="multiple"
        [expandedItems]="openItems()"
        (expandedItemsChange)="openItems.set($event)"
      >
        @for(item of accordionItems; track item.id) {
          <ng-shadcn-accordion-item  [id]="item.id" [disabled]="disabled()">
            <ng-shadcn-accordion-trigger (itemToggled)="toggleItem(item.id)" >
              {{item.title}}
            </ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content>
              {{item.content}}
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>
        }
      </ng-shadcn-accordion>
    </div>
  \`,
})
class AccordionControlledStory {
  private accordionItems = [
    { id: 'item-1', title: 'Controlled Item 1', content: 'This accordion item is controlled by the parent component.' },
    { id: 'item-2', title: 'Controlled Item 2', content: 'This accordion item is also controlled by the parent component.' },
  ];
  
  openItems = signal<string[]>(['item-1']);
  disabled = signal<boolean>(false);

  isOpen(id: string): boolean {
    return this.openItems().includes(id);
  }

  toogleDisabled(): void {
    this.disabled.update(value => !value);
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
