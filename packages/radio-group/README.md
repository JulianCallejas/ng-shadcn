# Radio Group Component

A flexible radio group component with form integration, keyboard navigation, and accessibility features.

## Features

- 🎯 **Single Selection**: Mutually exclusive radio button selection
- ⌨️ **Keyboard Navigation**: Arrow keys, Home, End, Space, and Enter support
- 🎯 **Accessibility**: Full ARIA support and screen reader compatibility
- 📝 **Form Integration**: Implements ControlValueAccessor for reactive forms
- 🎨 **Multiple Sizes**: Small, default, and large variants
- 📐 **Orientation**: Horizontal or vertical layout options
- 🚫 **Disabled States**: Support for disabled options and entire group

## Usage

### Basic Radio Group

```typescript
import { RadioGroupComponent, RadioOption } from '@ng-shadcn/radio-group';

@Component({
  template: `
    <ng-shadcn-radio-group
      [options]="options"
      (selectionChange)="onSelectionChange($event)">
    </ng-shadcn-radio-group>
  `
})
export class MyComponent {
  options: RadioOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  onSelectionChange(option: RadioOption) {
    console.log('Selected:', option);
  }
}
```

### With Descriptions

```typescript
options: RadioOption[] = [
  { 
    value: 'basic', 
    label: 'Basic Plan',
    description: 'Perfect for individuals getting started'
  },
  { 
    value: 'pro', 
    label: 'Pro Plan',
    description: 'Best for growing teams and businesses'
  },
  { 
    value: 'enterprise', 
    label: 'Enterprise Plan',
    description: 'Advanced features for large organizations'
  }
];
```

### Horizontal Layout

```typescript
<ng-shadcn-radio-group
  [options]="options"
  orientation="horizontal">
</ng-shadcn-radio-group>
```

### With Reactive Forms

```typescript
import { FormControl } from '@angular/forms';

@Component({
  template: `
    <ng-shadcn-radio-group
      [options]="options"
      [formControl]="planControl">
    </ng-shadcn-radio-group>
  `
})
export class MyComponent {
  planControl = new FormControl('basic');
}
```

### Sizes

```typescript
<ng-shadcn-radio-group [options]="options" size="sm"></ng-shadcn-radio-group>
<ng-shadcn-radio-group [options]="options" size="default"></ng-shadcn-radio-group>
<ng-shadcn-radio-group [options]="options" size="lg"></ng-shadcn-radio-group>
```

### Disabled Options

```typescript
options: RadioOption[] = [
  { value: 'option1', label: 'Available Option' },
  { value: 'option2', label: 'Disabled Option', disabled: true },
  { value: 'option3', label: 'Another Available Option' }
];
```

### Disabled Group

```typescript
<ng-shadcn-radio-group
  [options]="options"
  [disabled]="true">
</ng-shadcn-radio-group>
```

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `options` | `RadioOption[]` | `[]` | Array of radio options |
| `disabled` | `boolean` | `false` | Whether the entire group is disabled |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout orientation |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size variant |
| `className` | `string` | `''` | Additional CSS classes |
| `ariaLabel` | `string` | `undefined` | ARIA label for the group |
| `ariaDescribedby` | `string` | `undefined` | ARIA described-by for the group |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `selectionChange` | `EventEmitter<RadioOption>` | Emitted when selection changes |

### RadioOption Interface

```typescript
interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}
```

## Keyboard Navigation

- **Arrow Keys**: Navigate between options
- **Home**: Move to first option
- **End**: Move to last option
- **Space/Enter**: Select focused option
- **Tab**: Move focus to/from the radio group

## Accessibility

- Full ARIA radiogroup implementation
- Proper focus management with roving tabindex
- Screen reader announcements for state changes
- Support for `aria-label` and `aria-describedby`
- Disabled states properly communicated
