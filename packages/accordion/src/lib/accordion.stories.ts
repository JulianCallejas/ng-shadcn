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
      <ng-shadcn-accordion-item value="item-1">
        <ng-shadcn-accordion-trigger>Is it accessible?</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Yes. It adheres to the WAI-ARIA design pattern.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>

      <ng-shadcn-accordion-item value="item-2">
        <ng-shadcn-accordion-trigger>Is it styled?</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Yes. It comes with default styles that match the other components' aesthetics.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>

      <ng-shadcn-accordion-item value="item-3" disabled>
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
      <ng-shadcn-accordion-item value="item-1">
        <ng-shadcn-accordion-trigger>First Item</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          First item content.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>

      <ng-shadcn-accordion-item value="item-2">
        <ng-shadcn-accordion-trigger>Second Item</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Second item content.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>

      <ng-shadcn-accordion-item value="item-3">
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
        [value]="openItems()" 
        (valueChange)="openItems.set($event)">
        <ng-shadcn-accordion-item value="item-1">
          <ng-shadcn-accordion-trigger>Controlled Item 1</ng-shadcn-accordion-trigger>
          <ng-shadcn-accordion-content>
            This accordion item is controlled by the parent component.
          </ng-shadcn-accordion-content>
        </ng-shadcn-accordion-item>

        <ng-shadcn-accordion-item value="item-2">
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

  toggleItem(item: string) {
    if (this.isOpen(item)) {
      this.openItems.update(items => items.filter(i => i !== item));
    } else {
      this.openItems.update(items => [...items, item]);
    }
  }

  isOpen(item: string): boolean {
    return this.openItems().includes(item);
  }
}

// Collapsible Single
@Component({
  selector: 'story-accordion-collapsible',
  standalone: true,
  imports: [CommonModule, AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent],
  template: `
    <ng-shadcn-accordion [collapsible]="true">
      <ng-shadcn-accordion-item value="item-1">
        <ng-shadcn-accordion-trigger>Click to toggle</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          This accordion can be collapsed by clicking the active item.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>

      <ng-shadcn-accordion-item value="item-2">
        <ng-shadcn-accordion-trigger>Another item</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Another item's content.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
    </ng-shadcn-accordion>
  `,
})
class AccordionCollapsibleStory {}

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
  <ng-shadcn-accordion-item value="item-1">
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
    collapsible: {
      control: 'boolean',
      description: 'Whether the accordion can be collapsed when in single mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'text',
      description: 'The value of the currently expanded item(s)',
      table: {
        type: { summary: 'string | string[]' },
      },
    },
  },
  args: {
    type: 'single',
    collapsible: false,
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
  <ng-shadcn-accordion-item value="item-1">
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
  <ng-shadcn-accordion-item value="item-1">
    <ng-shadcn-accordion-trigger>First Item</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>Content 1</ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  <ng-shadcn-accordion-item value="item-2">
    <ng-shadcn-accordion-trigger>Second Item</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>Content 2</ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
</ng-shadcn-accordion>
        `,
        language: 'html',
      },
    },
  },
};

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
        story: 'Accordion with controlled state from the parent component.',
      },
    },
  },
};

export const Collapsible: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [AccordionCollapsibleStory],
    },
    template: '<story-accordion-collapsible></story-accordion-collapsible>',
  }),
  parameters: {
    docs: {
      description: {
        story: 'Single accordion that can be collapsed by clicking the active item.',
      },
      source: {
        code: `
<ng-shadcn-accordion [collapsible]="true">
  <ng-shadcn-accordion-item value="item-1">
    <ng-shadcn-accordion-trigger>Click to toggle</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>Content</ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
</ng-shadcn-accordion>
        `,
        language: 'html',
      },
    },
  },
};