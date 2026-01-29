# Checkbox Component

A flexible and accessible checkbox component with support for indeterminate state, form integration, and multiple sizes. Built with Angular's standalone components and signals for optimal performance.

## Features

- ✅ **Modular Components**: Separate components for checkbox, label, icon, and description
- ✅ **Indeterminate State**: Support for mixed/indeterminate checkbox state
- ⌨️ **Keyboard Navigation**: Space and Enter key support for better accessibility
- 🎯 **Accessibility**: Full ARIA support and screen reader compatibility
- 📝 **Form Integration**: Implements `ControlValueAccessor` for both template-driven and reactive forms
- 🎨 **Multiple Sizes**: Small (`sm`), default, and large (`lg`) variants
- 🏷️ **Content Projection**: Flexible content projection with dedicated components
- 🚀 **Signal-based**: Uses Angular's signals for efficient change detection
- 🎨 **Customizable**: Supports custom class names and styling via input properties

## Installation

```bash
npm install @ng-shadcn/checkbox
```

## Usage

### Import the Component

```typescript
import { CheckboxComponent } from '@ng-shadcn/checkbox';

@Component({
  standalone: true,
  imports: [CheckboxComponent],
  // ...
})
export class MyComponent {}
```

### Basic Usage

```typescript
<ng-shadcn-checkbox [(checked)]="isChecked">
  <span slot="label">Accept terms and conditions</span>
</ng-shadcn-checkbox>
```

### With Description

```typescript
<ng-shadcn-checkbox [(checked)]="isSubscribed">
  <span slot="label">Subscribe to newsletter</span>
  <span slot="description">
    Get the latest updates and news delivered to your inbox.
  </span>
</ng-shadcn-checkbox>
```

### Indeterminate State

```typescript
<ng-shadcn-checkbox [indeterminate]="isIndeterminate" (checkedChange)="onSelectAllChange($event)">
  <span slot="label">Select all items</span>
</ng-shadcn-checkbox>
```

### Sizes

```typescript
<ng-shadcn-checkbox size="sm">
  <span slot="label">Small</span>
</ng-shadcn-checkbox>
<ng-shadcn-checkbox size="default">
  <span slot="label">Default</span>
</ng-shadcn-checkbox>
<ng-shadcn-checkbox size="lg">
  <span slot="label">Large</span>
</ng-shadcn-checkbox>
```

### With Form Controls

```typescript
// In your component class
myForm = this.fb.group({
  terms: [false, Validators.requiredTrue]
});

constructor(private fb: FormBuilder) {}
```

```html
<form [formGroup]="myForm">
  <ng-shadcn-checkbox formControlName="terms">
    <span slot="label">I agree to the terms and conditions</span>
  </ng-shadcn-checkbox>
</form>
```

## API Reference

## Components

### Checkbox Component (`ng-shadcn-checkbox`)

The main checkbox component that handles the core functionality.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | `string` | `''` | Unique identifier for the checkbox |
| `checked` | `boolean` | `false` | Whether the checkbox is checked |
| `indeterminate` | `boolean` | `false` | Whether the checkbox is in indeterminate state |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `size` | `'sm' | 'default' | 'lg'` | `'default'` | Size of the checkbox |
| `class` | `string` | `''` | Additional CSS classes to apply |

### Checkbox Label (`ng-shadcn-checkbox-label`)

Component for the checkbox label text.

#### Inputs
| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes to apply |

### Checkbox Description (`ng-shadcn-checkbox-description`)

Optional description text for the checkbox.

#### Inputs
| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes to apply |

### Checkbox Icon (`ng-shadcn-checkbox-icon`)

Optional custom icon for the checkbox.

#### Inputs
| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `class` | `string` | `''` | Additional CSS classes to apply |
| `ariaLabel` | `string` | `undefined` | ARIA label for accessibility |
| `ariaDescribedby` | `string` | `undefined` | ARIA describedby for accessibility |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `checkedChange` | `EventEmitter<boolean>` | Emits when the checked state changes |

### Content Projection

| Selector | Description |
|----------|-------------|
| `[slot="label"]` | Content to display as the checkbox label |
| `[slot="description"]` | Optional description text below the label |

## Accessibility

The checkbox component includes built-in accessibility features:

- Proper ARIA attributes (`aria-checked`, `aria-disabled`, `aria-label`, `aria-describedby`)
- Keyboard navigation (Space/Enter to toggle)
- Focus management
- Screen reader support

## Styling

The component uses `class-variance-authority` for styling and supports custom class names through the `class` input. You can also target the following CSS variables for theming:

```css
:root {
  --primary: #007bff;
  --primary-foreground: #ffffff;
  --ring: #93c5fd;
  --border: #e2e8f0;
  --background: #ffffff;
  --foreground: #1e293b;
  --muted-foreground: #64748b;
}
```

## Dependencies

- `@angular/core`: ^16.0.0
- `@angular/forms`: ^16.0.0
- `class-variance-authority`: ^0.7.0``

### With Reactive Forms

```typescript
import { FormControl } from '@angular/forms';

@Component({
  template: `
    <ng-shadcn-checkbox [formControl]="agreeControl">
      <span slot="label">I agree to the terms</span>
    </ng-shadcn-checkbox>
  `
})
export class MyComponent {
  agreeControl = new FormControl(false);
}
```

### Sizes

```typescript
<ng-shadcn-checkbox size="sm">
  <span slot="label">Small checkbox</span>
</ng-shadcn-checkbox>

<ng-shadcn-checkbox size="default">
  <span slot="label">Default checkbox</span>
</ng-shadcn-checkbox>

<ng-shadcn-checkbox size="lg">
  <span slot="label">Large checkbox</span>
</ng-shadcn-checkbox>
```

### Disabled State

```typescript
<ng-shadcn-checkbox [disabled]="true">
  <ng-shadcn-checkbox-label>Disabled checkbox</ng-shadcn-checkbox-label>
</ng-shadcn-checkbox>
```

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `indeterminate` | `boolean` | `false` | Whether the checkbox is in indeterminate state |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size variant |
| `className` | `string` | `''` | Additional CSS classes |
| `ariaLabel` | `string` | `undefined` | ARIA label for accessibility |
| `ariaDescribedby` | `string` | `undefined` | ARIA described-by for accessibility |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `checkedChange` | `EventEmitter<boolean>` | Emitted when checkbox state changes |

## Content Projection

### Label
Use the `ng-shadcn-checkbox-label` component for the checkbox label:

```html
<ng-shadcn-checkbox>
  <ng-shadcn-checkbox-label>Your label text</ng-shadcn-checkbox-label>
</ng-shadcn-checkbox>
```

### Description
Use the `ng-shadcn-checkbox-description` component for additional descriptive text:

```html
<ng-shadcn-checkbox>
  <ng-shadcn-checkbox-label>Main label</ng-shadcn-checkbox-label>
  <ng-shadcn-checkbox-description>Additional description text</ng-shadcn-checkbox-description>
</ng-shadcn-checkbox>
```

### Custom Icon
Use the `ng-shadcn-checkbox-icon` component to provide a custom icon:

```html
<ng-shadcn-checkbox>
  <ng-shadcn-checkbox-label>With custom icon</ng-shadcn-checkbox-label>
  <ng-shadcn-checkbox-icon>
    <svg>...</svg>
  </ng-shadcn-checkbox-icon>
</ng-shadcn-checkbox>
```

Each subcomponent supports a `class` input for custom styling and inherits accessibility attributes from the parent checkbox component.

## Accessibility

- Full keyboard navigation support (Space and Enter keys)
- ARIA attributes for screen readers
- Proper focus management
- Support for `aria-label` and `aria-describedby`
- Indeterminate state properly communicated to assistive technologies
