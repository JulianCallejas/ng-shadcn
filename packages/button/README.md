# Button Component

A versatile button component with multiple variants, sizes, and states. Built with Angular signals and TailwindCSS for modern, reactive UI development.

## Features

- ✅ **Multiple Variants**: 6 different visual styles (default, destructive, outline, secondary, ghost, link)
- ✅ **Flexible Sizing**: 4 size options (sm, default, lg, icon)
- ✅ **Signal-based State**: Modern Angular signals for reactive updates
- ✅ **Accessibility**: Full ARIA support and keyboard navigation
- ✅ **Form Integration**: Works seamlessly with Angular forms
- ✅ **Custom Styling**: Easy theming with CSS variables
- ✅ **TypeScript**: Full type safety with proper interfaces

## Installation

```bash
npx ng-shadcn install button
```

## Usage

Import the component in your module or standalone component:

```typescript
import { Component } from '@angular/core';
import { ButtonComponent } from './components/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <ng-shadcn-button>Click me</ng-shadcn-button>
  `,
})
export class ExampleComponent {}
```

### Basic Usage

```html
<ng-shadcn-button>Click me</ng-shadcn-button>
```

### Variants

```html
<ng-shadcn-button variant="default">Default</ng-shadcn-button>
<ng-shadcn-button variant="secondary">Secondary</ng-shadcn-button>
<ng-shadcn-button variant="destructive">Destructive</ng-shadcn-button>
<ng-shadcn-button variant="outline">Outline</ng-shadcn-button>
<ng-shadcn-button variant="ghost">Ghost</ng-shadcn-button>
<ng-shadcn-button variant="link">Link</ng-shadcn-button>
```

### Sizes

```html
<ng-shadcn-button size="sm">Small</ng-shadcn-button>
<ng-shadcn-button size="default">Default</ng-shadcn-button>
<ng-shadcn-button size="lg">Large</ng-shadcn-button>
<ng-shadcn-button size="icon">
  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
  </svg>
</ng-shadcn-button>
```

### With Icons

```html
<!-- Icon before text -->
<ng-shadcn-button>
  <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
  </svg>
  Add Item
</ng-shadcn-button>

<!-- Icon after text -->
<ng-shadcn-button>
  Download
  <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
  </svg>
</ng-shadcn-button>
```

### Event Handling

```typescript
@Component({
  template: `
    <ng-shadcn-button (clicked)="handleClick($event)">Click me</ng-shadcn-button>
  `,
})
export class ExampleComponent {
  handleClick(event: Event) {
    console.log('Button clicked!', event);
  }
}
```

### Disabled State

```html
<ng-shadcn-button [disabled]="true">Disabled</ng-shadcn-button>
<ng-shadcn-button [disabled]="isLoading">{{ isLoading ? 'Loading...' : 'Submit' }}</ng-shadcn-button>
```

### Loading State

```html
<ng-shadcn-button [disabled]="isLoading">
  <svg *ngIf="isLoading" class="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  {{ isLoading ? 'Loading...' : 'Submit' }}
</ng-shadcn-button>
```

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | The visual style variant |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | The size of the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `className` | `string` | `''` | Additional CSS classes |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `clicked` | `EventEmitter<Event>` | Emitted when button is clicked (not when disabled) |

### CSS Variables

The button component uses the following CSS variables for theming:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 47.4% 11.2%;
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --radius: 0.5rem;
}
```

## Accessibility

- **Keyboard Navigation**: Full support for Tab and Enter/Space keys
- **ARIA Attributes**: Proper ARIA labels and states
- **Focus Management**: Visible focus indicators and proper focus handling
- **Screen Reader**: Compatible with screen readers
- **High Contrast**: Supports high contrast mode

### ARIA Features

- `role="button"` (implicit)
- `tabindex="0"` (implicit)
- `aria-disabled` when disabled
- Focus-visible styles for keyboard navigation

## Examples

### Form Integration

```typescript
@Component({
  template: `
    <form (ngSubmit)="onSubmit()">
      <ng-shadcn-input [(ngModel)]="email" placeholder="Email"></ng-shadcn-input>
      <ng-shadcn-button type="submit" [disabled]="!isValid">Submit</ng-shadcn-button>
    </form>
  `,
})
export class FormComponent {
  email = '';
  
  get isValid() {
    return this.email.includes('@');
  }
  
  onSubmit() {
    console.log('Form submitted:', this.email);
  }
}
```

### Confirmation Dialog

```typescript
@Component({
  template: `
    <div class="space-x-2">
      <ng-shadcn-button variant="outline" (clicked)="cancel()">Cancel</ng-shadcn-button>
      <ng-shadcn-button variant="destructive" (clicked)="confirm()">Delete</ng-shadcn-button>
    </div>
  `,
})
export class ConfirmationComponent {
  cancel() {
    // Handle cancel
  }
  
  confirm() {
    // Handle confirmation
  }
}
```

## Testing

The button component includes comprehensive unit tests. Run tests with:

```bash
npm run test
```

### Test Coverage

- ✅ Rendering and basic functionality
- ✅ All variants and sizes
- ✅ Disabled state behavior
- ✅ Event handling
- ✅ Accessibility features
- ✅ Signal-based state updates
- ✅ Custom class application

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

See the main project [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

---

**Part of ng-shadcn component library** • [Documentation](../../README.md) • [Storybook](https://storybook.ng-shadcn.dev)