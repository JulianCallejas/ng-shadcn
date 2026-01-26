# Accordion Component

A flexible and accessible accordion component built with Angular. It provides a vertically stacked set of interactive headers that reveal associated sections of content. Perfect for FAQs, settings panels, and any scenario where you need to show and hide content sections.

## Features

- 🚀 **Standalone Components**: Built as modern Angular standalone components for better tree-shaking and performance
- 🧩 **NgModule Support**: Includes `AccordionModule` for compatibility with traditional NgModule-based applications
- 🔄 **Flexible API**: Supports both standalone and module-based usage patterns
- 🎨 **Fully Styled**: Beautiful default styling that matches the shadcn/ui design system
- ♿ **Accessibility First**: Follows WAI-ARIA design patterns for maximum accessibility
- ⌨️ **Keyboard Navigation**: Full keyboard support with proper focus management
- 🎭 **Multiple Modes**: Support for both single and multiple open items
- 🔄 **Controlled & Uncontrolled**: Use it in controlled or uncontrolled mode
- 🛑 **Disabled State**: Support for disabled accordion items
- 🎯 **Type-Safe**: Fully typed with TypeScript for better developer experience
- 🎨 **Customizable**: Easy to style and extend with custom classes

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
      <ng-shadcn-accordion-item value="item-1">
        <ng-shadcn-accordion-trigger>
          How do I get started?
        </ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Getting started is easy! Follow our installation guide in the documentation to add the accordion component to your project.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
      
      <ng-shadcn-accordion-item value="item-2">
        <ng-shadcn-accordion-trigger>
          Is it accessible?
        </ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Yes! The accordion follows WAI-ARIA design patterns and includes proper keyboard navigation and screen reader support.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
      
      <ng-shadcn-accordion-item value="item-3">
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
  <ng-shadcn-accordion-item value="item-1">
    <ng-shadcn-accordion-trigger>
      Multiple Items Open
    </ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      When type is set to "multiple", you can have multiple accordion items open at the same time.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  
  <ng-shadcn-accordion-item value="item-2">
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

For more control over the accordion's state, you can use it in controlled mode:

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
|----------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes for the content container |

## Styling

The accordion components use CSS variables for styling. You can override these variables to customize the appearance:

```css
:root {
  --accordion-border: 1px solid hsl(240, 3.7%, 93.7%);
  --accordion-border-radius: 0.5rem;
  --accordion-padding: 1rem;
  --accordion-trigger-bg: transparent;
  --accordion-trigger-hover: hsl(240, 4.8%, 95.9%);
  --accordion-trigger-active: hsl(240, 4.9%, 93.9%);
  --accordion-content-bg: white;
}

/* Dark mode support */
.dark {
  --accordion-border: 1px solid hsl(240, 3.7%, 15.9%);
  --accordion-trigger-bg: transparent;
  --accordion-trigger-hover: hsl(240, 3.7%, 15.9%);
  --accordion-trigger-active: hsl(240, 5%, 26.1%);
  --accordion-content-bg: hsl(240, 3.7%, 10.2%);
}
```

## Accessibility

The accordion component follows WAI-ARIA Authoring Practices for the accordion pattern:

- Uses proper ARIA attributes (`aria-expanded`, `aria-controls`, `aria-labelledby`)
- Implements keyboard navigation:
  - <kbd>Tab</kbd> - Move focus to the next focusable element
  - <kbd>Shift + Tab</kbd> - Move focus to the previous focusable element
  - <kbd>Space</kbd> or <kbd>Enter</kbd> - Toggle the selected accordion item
  - <kbd>Home</kbd> - Move focus to the first accordion header
  - <kbd>End</kbd> - Move focus to the last accordion header
  - <kbd>ArrowDown</kbd> - Move focus to the next accordion header
  - <kbd>ArrowUp</kbd> - Move focus to the previous accordion header

## Browser Support

The accordion component works in all modern browsers and is tested against:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## License

MIT

```typescript
@Component({
  template: `
    <ng-shadcn-accordion 
      type="single" 
      [value]="activeSection" 
      (valueChange)="onSectionChange($event)">
      <ng-shadcn-accordion-item value="section-1">
        <ng-shadcn-accordion-trigger>Section 1</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Content for section 1. Currently active: {{ activeSection }}
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
      
      <ng-shadcn-accordion-item value="section-2">
        <ng-shadcn-accordion-trigger>Section 2</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Content for section 2. Currently active: {{ activeSection }}
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
    </ng-shadcn-accordion>
    
    <div class="mt-4">
      <p class="text-sm text-muted-foreground">Active section: {{ activeSection || 'None' }}</p>
      <div class="flex space-x-2 mt-2">
        <button class="btn btn-sm" (click)="setActiveSection('section-1')">Open Section 1</button>
        <button class="btn btn-sm" (click)="setActiveSection('section-2')">Open Section 2</button>
        <button class="btn btn-sm btn-outline" (click)="setActiveSection('')">Close All</button>
      </div>
    </div>
  `,
})
export class ControlledAccordionComponent {
  activeSection = '';

  onSectionChange(value: string | string[]) {
    this.activeSection = Array.isArray(value) ? value[0] || '' : value;
    console.log('Active section changed to:', this.activeSection);
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
```

### FAQ Example

```html
<ng-shadcn-accordion type="single" [collapsible]="true" class="w-full max-w-2xl">
  <ng-shadcn-accordion-item value="faq-1">
    <ng-shadcn-accordion-trigger>What is ng-shadcn?</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      <div class="space-y-2">
        <p>ng-shadcn is a modern Angular component library inspired by shadcn/ui, built for Angular 19+ with TailwindCSS.</p>
        <p>It provides a collection of reusable, accessible, and customizable components that follow modern design principles.</p>
      </div>
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  
  <ng-shadcn-accordion-item value="faq-2">
    <ng-shadcn-accordion-trigger>How do I install components?</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      <div class="space-y-2">
        <p>You can install components individually using the CLI:</p>
        <code class="block bg-muted p-2 rounded text-sm">npx ng-shadcn install accordion</code>
        <p>This will copy the component files to your project so you have full control over the code.</p>
      </div>
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  
  <ng-shadcn-accordion-item value="faq-3">
    <ng-shadcn-accordion-trigger>Is it accessible?</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      <div class="space-y-2">
        <p>Yes! All components are built with accessibility in mind:</p>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Full keyboard navigation support</li>
          <li>Proper ARIA attributes and roles</li>
          <li>Screen reader compatibility</li>
          <li>Focus management</li>
          <li>High contrast support</li>
        </ul>
      </div>
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  
  <ng-shadcn-accordion-item value="faq-4">
    <ng-shadcn-accordion-trigger>Can I customize the styling?</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      <div class="space-y-2">
        <p>Absolutely! The components use CSS variables for theming and TailwindCSS classes for styling.</p>
        <p>You can:</p>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Modify CSS variables for global theme changes</li>
          <li>Add custom TailwindCSS classes</li>
          <li>Override styles with your own CSS</li>
          <li>Modify the component code directly (it's copied to your project)</li>
        </ul>
      </div>
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
</ng-shadcn-accordion>
```

### Settings Panel Example

```typescript
@Component({
  template: `
    <ng-shadcn-accordion type="multiple" class="w-full max-w-md">
      <ng-shadcn-accordion-item value="account">
        <ng-shadcn-accordion-trigger>Account Settings</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">Display Name</label>
              <input class="input" [(ngModel)]="settings.displayName" placeholder="Your display name" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Email</label>
              <input class="input" type="email" [(ngModel)]="settings.email" placeholder="your@email.com" />
            </div>
          </div>
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
      
      <ng-shadcn-accordion-item value="notifications">
        <ng-shadcn-accordion-trigger>Notification Preferences</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium">Email Notifications</label>
              <input type="checkbox" [(ngModel)]="settings.emailNotifications" />
            </div>
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium">Push Notifications</label>
              <input type="checkbox" [(ngModel)]="settings.pushNotifications" />
            </div>
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium">SMS Notifications</label>
              <input type="checkbox" [(ngModel)]="settings.smsNotifications" />
            </div>
          </div>
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
      
      <ng-shadcn-accordion-item value="privacy">
        <ng-shadcn-accordion-trigger>Privacy Settings</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium">Profile Visibility</label>
              <select class="input" [(ngModel)]="settings.profileVisibility">
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium">Show Online Status</label>
              <input type="checkbox" [(ngModel)]="settings.showOnlineStatus" />
            </div>
          </div>
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
    </ng-shadcn-accordion>
  `,
})
export class SettingsPanelComponent {
  settings = {
    displayName: '',
    email: '',
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    profileVisibility: 'public',
    showOnlineStatus: true
  };
}
```

### With Disabled Items

```html
<ng-shadcn-accordion type="single" [collapsible]="true">
  <ng-shadcn-accordion-item value="available">
    <ng-shadcn-accordion-trigger>Available Feature</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      This feature is available and can be accessed.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  
  <ng-shadcn-accordion-item value="disabled" [disabled]="true">
    <ng-shadcn-accordion-trigger>Premium Feature (Disabled)</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      This feature requires a premium subscription.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  
  <ng-shadcn-accordion-item value="coming-soon" [disabled]="true">
    <ng-shadcn-accordion-trigger>Coming Soon (Disabled)</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      This feature is coming soon in a future update.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
</ng-shadcn-accordion>
```

## API Reference

### AccordionComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | `'single'` | Whether one or multiple items can be opened at the same time |
| `collapsible` | `boolean` | `false` | When type is "single", allows closing the open item |
| `defaultValue` | `string \| string[]` | `''` | The default value of the item(s) to expand |
| `value` | `string \| string[]` | `''` | The controlled value of the item(s) to expand |
| `className` | `string` | `''` | Additional CSS classes |

#### Events

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `EventEmitter<string \| string[]>` | Emitted when the expanded items change |

### AccordionItemComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | A unique value for the item |
| `disabled` | `boolean` | `false` | Whether the item is disabled |
| `className` | `string` | `''` | Additional CSS classes |

### AccordionTriggerComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | The value of the item this trigger belongs to |
| `disabled` | `boolean` | `false` | Whether the trigger is disabled |
| `className` | `string` | `''` | Additional CSS classes |

#### Events

| Event | Type | Description |
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
