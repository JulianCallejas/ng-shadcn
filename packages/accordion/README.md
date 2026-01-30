# Accordion Component

A flexible and accessible accordion component built with Angular. It provides a vertically stacked set of interactive headers that reveal associated sections of content. Perfect for FAQs, settings panels, and any scenario where you need to show and hide content sections.

## Features

- 🚀 **Standalone Components**: Built as modern Angular standalone components with Signals for reactive state management
- 🎨 **Fully Styled**: Beautiful default styling with smooth animations and transitions
- ♿ **Accessibility First**: Follows WAI-ARIA design patterns for maximum accessibility
- ⌨️ **Keyboard Navigation**: Full keyboard support with proper focus management
- 🎭 **Multiple Modes**: Support for both single and multiple open items
- 🔄 **Controlled & Uncontrolled**: Use it in controlled or uncontrolled mode
- 🛑 **Disabled State**: Support for disabled accordion items
- 🎯 **Type-Safe**: Fully typed with TypeScript for better developer experience
- 🎨 **Customizable**: Easy to style and extend with custom classes
- ⚡ **Performance Optimized**: Uses Angular's change detection strategies for optimal performance

## Installation

```bash
# Using npm
npm install @ng-shadcn/accordion

# Using yarn
yarn add @ng-shadcn/accordion

# Using pnpm
pnpm add @ng-shadcn/accordion
```

## Import

### Standalone Components (Recommended)

Import and use the individual components directly in your standalone components:

```typescript
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
  template: `
    <ng-shadcn-accordion type="single">
      <ng-shadcn-accordion-item id="item-1">
        <ng-shadcn-accordion-trigger>Item 1</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>Content 1</ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
    </ng-shadcn-accordion>
  `
})
export class ExampleComponent { }
```

### Using NgModule (Legacy)

If you're using NgModules, import the `AccordionModule`:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from '@ng-shadcn/accordion';

@NgModule({
  declarations: [YourComponent],
  imports: [
    CommonModule,
    AccordionModule
  ]
})
export class YourModule { }
```

Then use the components in your templates:

```html
<ng-shadcn-accordion type="single">
  <ng-shadcn-accordion-item id="item-1">
    <ng-shadcn-accordion-trigger>Item 1</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>Content 1</ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
</ng-shadcn-accordion>
```
```

## Basic Usage

### Single Item Open (Default)

```typescript
import { Component } from '@angular/core';
import { 
  AccordionComponent, 
  AccordionItemComponent, 
  AccordionTriggerComponent, 
  AccordionContentComponent 
} from '@ng-shadcn/accordion';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionTriggerComponent,
    AccordionContentComponent
  ],
  template: `
    <h2 class="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
    <ng-shadcn-accordion type="single" class="w-full max-w-2xl space-y-2">
      <ng-shadcn-accordion-item id="item-1">
        <ng-shadcn-accordion-trigger>
          How do I get started?
        </ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Getting started is easy! Follow our installation guide in the documentation to add the accordion component to your project.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
      
      <ng-shadcn-accordion-item id="item-2">
        <ng-shadcn-accordion-trigger>
          Is it accessible?
        </ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Yes! The accordion follows WAI-ARIA design patterns and includes proper keyboard navigation and screen reader support.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
      
      <ng-shadcn-accordion-item id="item-3">
        <ng-shadcn-accordion-trigger>
          Can I customize the styling?
        </ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Absolutely! The component is fully customizable using CSS variables and supports custom class names for complete control over the appearance.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
    </ng-shadcn-accordion>
  `,
})
export class FaqComponent {}
```

### Multiple Items Open

```typescript
<ng-shadcn-accordion type="multiple" class="w-full max-w-2xl space-y-2">
  <ng-shadcn-accordion-item id="item-1">
    <ng-shadcn-accordion-trigger>
      Multiple Items Open
    </ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      When type is set to "multiple", you can have multiple accordion items open at the same time.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  
  <ng-shadcn-accordion-item id="item-2">
    <ng-shadcn-accordion-trigger>
      Another Section
    </ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      This section can be open at the same time as others when in multiple mode.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
</ng-shadcn-accordion>
```
```

## Advanced Usage

### Controlled Accordion

For more control over the accordion's state, you can use it in controlled mode with Signals:

```typescript
import { Component, signal } from '@angular/core';
import { 
  AccordionComponent, 
  AccordionItemComponent, 
  AccordionTriggerComponent, 
  AccordionContentComponent 
} from '@ng-shadcn/accordion';

@Component({
  selector: 'app-controlled-accordion',
  standalone: true,
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionTriggerComponent,
    AccordionContentComponent
  ],
  template: `
    <ng-shadcn-accordion 
      type="multiple" 
      [expandedItems]="expandedItems()"
      (expandedItemsChange)="onExpandedItemsChange($event)"
      class="w-full max-w-2xl space-y-2"
    >
      <ng-shadcn-accordion-item id="item-1">
        <ng-shadcn-accordion-trigger>Item 1</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>Content 1</ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
      
      <ng-shadcn-accordion-item id="item-2">
        <ng-shadcn-accordion-trigger>Item 2</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>Content 2</ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
    </ng-shadcn-accordion>
  `
})
export class ControlledAccordionComponent {
  expandedItems = signal<string[]>(['item-1']);

  onExpandedItemsChange(ids: string[]): void {
    this.expandedItems.set(ids);
  }
}
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionTriggerComponent,
    AccordionContentComponent
  ],
  template: `
    <div class="space-y-4">
      <div class="flex gap-2 mb-4">
        <button 
          *ngFor="let item of items"
          (click)="toggleItem(item.id)"
          [class.bg-primary]="isOpen(item.id)"
          class="px-3 py-1 rounded border"
        >
          Toggle {{ item.title }}
        </button>
      </div>

      <ng-shadcn-accordion 
        type="multiple" 
        [expandedItems]="openItems()"
        (expandedItemsChange)="openItems.set($event)"
        class="w-full max-w-2xl space-y-2"
      >
        <ng-shadcn-accordion-item 
          *ngFor="let item of items" 
          [value]="item.id"
        >
          <ng-shadcn-accordion-trigger>
            {{ item.title }}
          </ng-shadcn-accordion-trigger>
          <ng-shadcn-accordion-content>
            {{ item.content }}
          </ng-shadcn-accordion-content>
        </ng-shadcn-accordion-item>
      </ng-shadcn-accordion>
    </div>
  `,
})
export class ControlledAccordionComponent {
  items = [
    { id: 'item-1', title: 'First Item', content: 'Content for the first item' },
    { id: 'item-2', title: 'Second Item', content: 'Content for the second item' },
    { id: 'item-3', title: 'Third Item', content: 'Content for the third item' },
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
```

### Disabled Items

You can disable individual accordion items:

```html
<ng-shadcn-accordion type="single">
  <ng-shadcn-accordion-item value="item-1">
    <ng-shadcn-accordion-trigger>Enabled Item</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>This item can be toggled.</ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  
  <ng-shadcn-accordion-item value="item-2" [disabled]="true">
    <ng-shadcn-accordion-trigger>Disabled Item</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>This content is not accessible when disabled.</ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
</ng-shadcn-accordion>
```

## API Reference

### AccordionComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'single' | 'multiple'` | `'single'` | Whether an accordion item should be closed when another is opened ('single') or allow multiple items to be open ('multiple') |
| `expandedItems` | `string[]` | `undefined` | Array of currently expanded item values (controlled mode) |
| `defaultExpanded` | `string | string[]` | `''` | Default expanded item(s) when using uncontrolled mode |
| `class` | `string` | `''` | Additional CSS classes for the accordion container |
| `expandedItemsChange` | `EventEmitter<string[]>` | - | Emits when expanded items change (controlled mode) |

### AccordionItemComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | A unique value for the item (required) |
| `disabled` | `boolean` | `false` | Whether the item is disabled |
| `class` | `string` | `''` | Additional CSS classes for the item |
| `isExpanded` | `boolean` | `false` | Whether the item is expanded (uncontrolled mode) |

### AccordionTriggerComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes for the trigger button |

### AccordionContentComponent

| Property | Type | Default | Description |
| `disabled` | `boolean` | `false` | Whether the trigger is disabled |

|-------|------|-------------|
| `itemToggled` | `EventEmitter<string>` | Emitted when the trigger is activated |

### AccordionContentComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | The value of the item this content belongs to |
| `className` | `string` | `''` | Additional CSS classes |

## Accessibility

- **Keyboard Navigation**: Full support for Tab, Shift+Tab, Enter, Space, and Arrow keys
- **ARIA Attributes**: Proper ARIA labels, roles, and states
- **Focus Management**: Visible focus indicators and proper focus handling
- **Screen Reader**: Compatible with screen readers
- **Semantic Structure**: Uses proper heading and region roles

### ARIA Features

- `role="region"` on accordion content
- `aria-expanded` indicates whether section is expanded
- `aria-controls` references the associated content panel
- `aria-labelledby` references the associated trigger
- `aria-disabled` indicates disabled items

### Keyboard Navigation

- **Tab**: Move focus to next trigger
- **Shift + Tab**: Move focus to previous trigger
- **Enter/Space**: Toggle the focused trigger
- **Arrow Keys**: Navigate between triggers

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

See the main project [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

---

**Part of ng-shadcn component library** • [Documentation](../../README.md) • [Storybook](https://storybook.ng-shadcn.dev)
