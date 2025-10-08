# Switch Component

A toggle switch component for binary choices with full form integration and accessibility support.

## Installation

```bash
npx ng-shadcn install switch
```

## Usage

Import the component in your module or standalone component:

```typescript
import { SwitchComponent } from '@ng-shadcn/switch';

@Component({
  imports: [SwitchComponent],
  // ...
})
```

### Basic Usage

```html
<ng-shadcn-switch></ng-shadcn-switch>
```

### With Initial Value

```html
<ng-shadcn-switch [checked]="true"></ng-shadcn-switch>
```

### With Label

```html
<div class="flex items-center space-x-2">
  <ng-shadcn-switch id="notifications"></ng-shadcn-switch>
  <label for="notifications" class="text-sm font-medium">
    Enable notifications
  </label>
</div>
```

### Form Integration

```html
<!-- Template-driven forms -->
<ng-shadcn-switch [(ngModel)]="isEnabled"></ng-shadcn-switch>

<!-- Reactive forms -->
<ng-shadcn-switch [formControl]="toggleControl"></ng-shadcn-switch>
```

### Event Handling

```html
<ng-shadcn-switch (checkedChange)="onToggle($event)"></ng-shadcn-switch>
```

## API

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| id | string | auto-generated | Unique identifier |
| checked | boolean | false | Checked state |
| disabled | boolean | false | Disabled state |

### Events

| Name | Type | Description |
|------|------|-------------|
| checkedChange | EventEmitter<boolean> | Emitted when checked state changes |

## Accessibility

The switch component includes:
- Proper ARIA attributes (`role="switch"`, `aria-checked`)
- Keyboard navigation (Space and Enter keys)
- Focus management
- Screen reader support