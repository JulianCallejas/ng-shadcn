import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent } from './accordion.component';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Basic Usage
@Component({
  selector: 'story-accordion-basic',
  standalone: true,
  imports: [CommonModule, AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent],
  template: `
    <ng-shadcn-accordion>
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

      <ng-shadcn-accordion-item id="item-3" disabled>
        <ng-shadcn-accordion-trigger>Can it be disabled?</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Yes. You can disable the accordion by adding the disabled prop.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
    </ng-shadcn-accordion>
  `,
})
class AccordionBasicStory {}

// Multiple Items Open
@Component({
  selector: 'story-accordion-multiple',
  standalone: true,
  imports: [CommonModule, AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent],
  template: `
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
  `,
})
class AccordionMultipleStory {}

// Controlled Example
@Component({
  selector: 'story-accordion-controlled',
  standalone: true,
  imports: [CommonModule, AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent],
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
          <ng-shadcn-accordion-trigger>Controlled Item 1</ng-shadcn-accordion-trigger>
          <ng-shadcn-accordion-content>
            This accordion item is controlled by the parent component.
          </ng-shadcn-accordion-content>
        </ng-shadcn-accordion-item>

        <ng-shadcn-accordion-item id="item-2">
          <ng-shadcn-accordion-trigger>Controlled Item 2</ng-shadcn-accordion-trigger>
          <ng-shadcn-accordion-content>
            This accordion item is also controlled by the parent component.
          </ng-shadcn-accordion-content>
        </ng-shadcn-accordion-item>
      </ng-shadcn-accordion>
    </div>
  `,
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

// Single with Collapsible Behavior
@Component({
  selector: 'story-accordion-single',
  standalone: true,
  imports: [CommonModule, AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent],
  template: `
    <ng-shadcn-accordion type="single">
      <ng-shadcn-accordion-item id="item-1">
        <ng-shadcn-accordion-trigger>Can I open just one item at a time?</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Yes. You can set the type prop to 'single' to ensure only one item can be opened at a time.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>

      <ng-shadcn-accordion-item id="item-2">
        <ng-shadcn-accordion-trigger>Can I close an item by clicking it again?</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Yes. In 'single' mode, clicking an open item will close it.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
    </ng-shadcn-accordion>
  `,
})
class AccordionSingleStory {}

const meta: Meta = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### A vertically stacked set of interactive headings that each reveal a section of content.

#### Features
- Supports single and multiple expanded items
- Keyboard navigation support
- Fully accessible with proper ARIA attributes
- Collapsible single item mode
- Controlled and uncontrolled usage
- Customizable styling with TailwindCSS

#### Installation
\`\`\`bash
npm install @ng-shadcn/accordion
\`\`\`

#### Basic Usage
\`\`\`html
<ng-shadcn-accordion>
  <ng-shadcn-accordion-item id="item-1">
    <ng-shadcn-accordion-trigger>Title</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>Content</ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
</ng-shadcn-accordion>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Type of the accordion behavior',
      table: {
        type: { summary: '"single" | "multiple"' },
        defaultValue: { summary: 'single' },
      },
    },
    expandedItems: {
      control: 'text',
      description: 'The identifier(s) of the currently expanded item(s)',
      table: {
        type: { summary: 'string | string[]' },
      },
    },
  },
  args: {
    type: 'single',
  },
};

export default meta;

type Story = StoryObj<AccordionComponent>;

export const Basic: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [AccordionBasicStory],
    },
    template: '<story-accordion-basic></story-accordion-basic>',
  }),
  parameters: {
    docs: {
      source: {
        code: `
<ng-shadcn-accordion>
  <ng-shadcn-accordion-item id="item-1">
    <ng-shadcn-accordion-trigger>Is it accessible?</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      Yes. It adheres to the WAI-ARIA design pattern.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
</ng-shadcn-accordion>
        `,
        language: 'html',
      },
    },
  },
};

export const Multiple: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [AccordionMultipleStory],
    },
    template: '<story-accordion-multiple></story-accordion-multiple>',
  }),
  parameters: {
    docs: {
      description: {
        story: 'Accordion with multiple items that can be expanded simultaneously.',
      },
      source: {
        code: `
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
</ng-shadcn-accordion>
        `,
        language: 'html',
      },
    },
  },
};

const par = ()=>{
  return `
  // Template
<ng-shadcn-accordion 
  type="multiple"
  [expandedItems]="openItems()"
  (expandedItemsChange)="openItems.set($event)">
  <ng-shadcn-accordion-item id="item-1">
    <ng-shadcn-accordion-trigger>Item 1</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      Content for item 1
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  
  <ng-shadcn-accordion-item id="item-2">
    <ng-shadcn-accordion-trigger>Item 2</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      Content for item 2
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
</ng-shadcn-accordion>

// Component Class
export class MyComponent {
  openItems = signal<string[]>([]);
  
  toggleItem(id: string) {
    this.openItems.update(items => 
      items.includes(id) 
        ? items.filter(item => item !== id)
        : [...items, id]
    );
  }
}

  `
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
        export class MyComponent {
          openItems = signal<string[]>([]);
          toggleItem(id: string) {
            this.openItems.update(items => 
              items.includes(id) 
                ? items.filter(item => item !== id)
                : [...items, id]
            );
          }
        }

                // Template
        <ng-shadcn-accordion 
          type="multiple"
          [expandedItems]="openItems()"
          >
          <ng-shadcn-accordion-item id="item-1">
            <ng-shadcn-accordion-trigger (itemToggled)="toggleItem('item-1')">
             Item 1
            </ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content>
              Content for item 1
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>
          
          <ng-shadcn-accordion-item id="item-2">
            <ng-shadcn-accordion-trigger (itemToggled)="toggleItem('item-2')">
             Item 2
            </ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content>
              Content for item 2
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>
        </ng-shadcn-accordion>
        `,
      },
    },
  },
};