# Accordion Component

A vertically stacked set of interactive headings that each reveal a section of content. Perfect for FAQs, settings panels, and collapsible content sections. Built with Angular signals for modern, reactive UI development.

## Features

- ✅ **Single & Multiple Modes**: Control whether one or multiple sections can be open
- ✅ **Collapsible**: Option to close the currently open section in single mode
- ✅ **Smooth Animations**: Built-in animations for expanding and collapsing
- ✅ **Signal-based State**: Modern Angular signals for reactive updates
- ✅ **Accessibility**: Full ARIA support with proper roles and attributes
- ✅ **Keyboard Navigation**: Full keyboard support for navigation
- ✅ **Disabled Items**: Support for disabled accordion sections
- ✅ **TypeScript**: Full type safety with proper interfaces

## Installation

```bash
npx ng-shadcn install accordion
```

## Usage

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { 
  AccordionComponent, 
  AccordionItemComponent, 
  AccordionTriggerComponent, 
  AccordionContentComponent 
} from './components/accordion';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionTriggerComponent,
    AccordionContentComponent
  ],
  template: `
    <ng-shadcn-accordion type="single" [collapsible]="true">
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
      
      <ng-shadcn-accordion-item value="item-3">
        <ng-shadcn-accordion-trigger>Is it animated?</ng-shadcn-accordion-trigger>
        <ng-shadcn-accordion-content>
          Yes. It includes smooth animations for opening and closing sections using CSS transitions.
        </ng-shadcn-accordion-content>
      </ng-shadcn-accordion-item>
    </ng-shadcn-accordion>
  `,
})
export class ExampleComponent {}
```

### Multiple Sections Open

```html
<ng-shadcn-accordion type="multiple" [defaultValue]="['item-1', 'item-3']">
  <ng-shadcn-accordion-item value="item-1">
    <ng-shadcn-accordion-trigger>Can multiple sections be open?</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      Yes, when type is set to "multiple", you can have multiple sections open at once.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  
  <ng-shadcn-accordion-item value="item-2">
    <ng-shadcn-accordion-trigger>How do I control which sections are open?</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      Use the defaultValue prop to set initially open sections, or value prop for controlled behavior.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
  
  <ng-shadcn-accordion-item value="item-3">
    <ng-shadcn-accordion-trigger>Is it responsive?</ng-shadcn-accordion-trigger>
    <ng-shadcn-accordion-content>
      Yes. The accordion works well on all screen sizes and follows responsive design principles.
    </ng-shadcn-accordion-content>
  </ng-shadcn-accordion-item>
</ng-shadcn-accordion>
```

### Controlled Accordion

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
