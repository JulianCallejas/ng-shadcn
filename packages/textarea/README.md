# Textarea Component

A flexible textarea component with auto-resize functionality, character counting, and form integration.

## Features

- 📏 **Auto-resize**: Automatically adjusts height based on content
- 🔢 **Character Count**: Optional character counter with limit warnings
- 📝 **Form Integration**: Implements ControlValueAccessor for reactive forms
- 🎨 **Multiple Sizes**: Small, default, and large variants
- 🚫 **Max Length**: Built-in character limit enforcement
- ⌨️ **Keyboard Support**: Proper keyboard navigation and shortcuts
- 🎯 **Accessibility**: Full ARIA support and screen reader compatibility

## Usage

### Basic Textarea

```typescript
import { TextareaComponent } from '@ng-shadcn/textarea';

@Component({
  template: `
    <ng-shadcn-textarea
      placeholder="Enter your message..."
      (valueChange)="onValueChange($event)">
    </ng-shadcn-textarea>
  `
})
export class MyComponent {
  onValueChange(value: string) {
    console.log('Textarea value:', value);
  }
}
```

### With Auto-resize

```typescript
<ng-shadcn-textarea
  placeholder="This textarea will grow as you type..."
  [autoResize]="true"
  [minRows]="3"
  [maxRows]="10">
</ng-shadcn-textarea>
```

### With Character Count

```typescript
<ng-shadcn-textarea
  placeholder="Enter up to 500 characters..."
  [maxLength]="500"
  [showCharacterCount]="true">
</ng-shadcn-textarea>
```

### With Reactive Forms

```typescript
import { FormControl } from '@angular/forms';

@Component({
  template: `
    <ng-shadcn-textarea
      placeholder="Your feedback..."
      [formControl]="feedbackControl"
      [autoResize]="true"
      [showCharacterCount]="true"
      [maxLength]="1000">
    </ng-shadcn-textarea>
  `
})
export class MyComponent {
  feedbackControl = new FormControl('');
}
```

### Sizes

```typescript
<ng-shadcn-textarea size="sm" placeholder="Small textarea"></ng-shadcn-textarea>
<ng-shadcn-textarea size="default" placeholder="Default textarea"></ng-shadcn-textarea>
<ng-shadcn-textarea size="lg" placeholder="Large textarea"></ng-shadcn-textarea>
```

### Fixed Rows

```typescript
<ng-shadcn-textarea
  [rows]="5"
  placeholder="Fixed height textarea">
</ng-shadcn-textarea>
```

### Readonly State

```typescript
<ng-shadcn-textarea
  [readonly]="true"
  value="This content cannot be edited">
</ng-shadcn-textarea>
```

### Disabled State

```typescript
<ng-shadcn-textarea
  [disabled]="true"
  placeholder="Disabled textarea">
</ng-shadcn-textarea>
```

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `placeholder` | `string` | `undefined` | Placeholder text |
| `disabled` | `boolean` | `false` | Whether the textarea is disabled |
| `readonly` | `boolean` | `false` | Whether the textarea is readonly |
| `autoResize` | `boolean` | `false` | Enable automatic height adjustment |
| `maxLength` | `number` | `undefined` | Maximum character limit |
| `showCharacterCount` | `boolean` | `false` | Show character counter |
| `rows` | `number` | `3` | Number of visible rows (when not auto-resizing) |
| `maxRows` | `number` | `undefined` | Maximum rows when auto-resizing |
| `minRows` | `number` | `undefined` | Minimum rows when auto-resizing |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size variant |
| `className` | `string` | `''` | Additional CSS classes |
| `ariaLabel` | `string` | `undefined` | ARIA label for accessibility |
| `ariaDescribedby` | `string` | `undefined` | ARIA described-by for accessibility |
| `ariaInvalid` | `boolean` | `undefined` | ARIA invalid state |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `EventEmitter<string>` | Emitted when textarea value changes |
| `focused` | `EventEmitter<void>` | Emitted when textarea receives focus |
| `blurred` | `EventEmitter<void>` | Emitted when textarea loses focus |

### Public Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `focus()` | - | Programmatically focus the textarea |
| `blur()` | - | Programmatically blur the textarea |
| `select()` | - | Select all text in the textarea |
| `setSelectionRange()` | `start: number, end: number` | Set text selection range |

## Character Count Features

When `showCharacterCount` is enabled:
- Shows current character count
- Shows limit when `maxLength` is set
- Changes color to warning when near limit (80% of max)
- Changes color to error when over limit
- Prevents typing when at character limit

## Auto-resize Behavior

When `autoResize` is enabled:
- Textarea height adjusts automatically based on content
- Respects `minRows` and `maxRows` constraints
- Maintains proper padding and line height calculations
- Updates on value changes and initial load

## Accessibility

- Full keyboard navigation support
- ARIA attributes for screen readers
- Proper focus management
- Support for `aria-label`, `aria-describedby`, and `aria-invalid`
- Character count announcements for screen readers
