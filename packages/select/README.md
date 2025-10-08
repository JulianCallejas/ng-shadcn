# Select Component

A flexible select dropdown component with search functionality, keyboard navigation, and form integration.

## Features

- 🔍 **Searchable**: Optional search functionality to filter options
- ⌨️ **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, and Escape
- 🎯 **Accessibility**: ARIA attributes and screen reader support
- 📝 **Form Integration**: Implements ControlValueAccessor for reactive forms
- 🎨 **Customizable**: Multiple sizes and styling options
- 🚫 **Disabled States**: Support for disabled options and component

## Usage

### Basic Select

```typescript
import { SelectComponent, SelectOption } from '@ng-shadcn/select';

@Component({
  template: `
    <ng-shadcn-select
      [options]="options"
      placeholder="Choose an option"
      (selectionChange)="onSelectionChange($event)">
    </ng-shadcn-select>
  `
})
export class MyComponent {
  options: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' }
  ];

  onSelectionChange(option: SelectOption | null) {
    console.log('Selected:', option);
  }
}
```

### With Search

```typescript
<ng-shadcn-select
  [options]="options"
  [searchable]="true"
  placeholder="Search and select...">
</ng-shadcn-select>
```

### With Reactive Forms

```typescript
import { FormControl } from '@angular/forms';

@Component({
  template: `
    <ng-shadcn-select
      [options]="options"
      [formControl]="selectControl">
    </ng-shadcn-select>
  `
})
export class MyComponent {
  selectControl = new FormControl('apple');
}
```

### Sizes

```typescript
<ng-shadcn-select [options]="options" size="sm"></ng-shadcn-select>
<ng-shadcn-select [options]="options" size="default"></ng-shadcn-select>
<ng-shadcn-select [options]="options" size="lg"></ng-shadcn-select>
```

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `options` | `SelectOption[]` | `[]` | Array of options to display |
| `placeholder` | `string` | `undefined` | Placeholder text when no option is selected |
| `disabled` | `boolean` | `false` | Whether the select is disabled |
| `searchable` | `boolean` | `false` | Enable search functionality |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size variant |
| `className` | `string` | `''` | Additional CSS classes |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `selectionChange` | `EventEmitter<SelectOption \| null>` | Emitted when selection changes |

### SelectOption Interface

```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Keyboard Navigation

- **Enter/Space**: Open/close dropdown
- **Arrow Down**: Navigate to next option or open dropdown
- **Arrow Up**: Navigate to previous option
- **Escape**: Close dropdown
- **Type to search**: When searchable is enabled
