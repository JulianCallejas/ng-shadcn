# Checkbox Component

A flexible checkbox component with indeterminate state, accessibility features, and form integration.

## Features

- ✅ **Indeterminate State**: Support for mixed/indeterminate checkbox state
- ⌨️ **Keyboard Support**: Space and Enter key navigation
- 🎯 **Accessibility**: Full ARIA support and screen reader compatibility
- 📝 **Form Integration**: Implements ControlValueAccessor for reactive forms
- 🎨 **Multiple Sizes**: Small, default, and large variants
- 🏷️ **Label Support**: Built-in label and description content projection

## Usage

### Basic Checkbox

```typescript
import { CheckboxComponent } from '@ng-shadcn/checkbox';

@Component({
  template: `
    <ng-shadcn-checkbox (checkedChange)="onCheckedChange($event)">
      <span slot="label">Accept terms and conditions</span>
    </ng-shadcn-checkbox>
  `
})
export class MyComponent {
  onCheckedChange(checked: boolean) {
    console.log('Checkbox checked:', checked);
  }
}
```

### With Description

```typescript
<ng-shadcn-checkbox>
  <span slot="label">Subscribe to newsletter</span>
  <span slot="description">Get the latest updates and news delivered to your inbox.</span>
</ng-shadcn-checkbox>
```

### Indeterminate State

```typescript
<ng-shadcn-checkbox [indeterminate]="true">
  <span slot="label">Select all items</span>
</ng-shadcn-checkbox>
```

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
  <span slot="label">Disabled checkbox</span>
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

### Label Slot
Use `slot="label"` to project label content:
```html
<ng-shadcn-checkbox>
  <span slot="label">Your label text</span>
</ng-shadcn-checkbox>
```

### Description Slot
Use `slot="description"` to project description content:
```html
<ng-shadcn-checkbox>
  <span slot="label">Main label</span>
  <span slot="description">Additional description text</span>
</ng-shadcn-checkbox>
```

## Accessibility

- Full keyboard navigation support (Space and Enter keys)
- ARIA attributes for screen readers
- Proper focus management
- Support for `aria-label` and `aria-describedby`
- Indeterminate state properly communicated to assistive technologies
