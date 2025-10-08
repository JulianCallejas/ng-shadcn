# Input Component

A versatile input component with label support, error handling, and form integration.

## Installation

```bash
npx ng-shadcn install input
```

## Usage

Import the component in your module or standalone component:

```typescript
import { InputComponent } from '@ng-shadcn/input';

@Component({
  imports: [InputComponent],
  // ...
})
```

### Basic Usage

```html
<ng-shadcn-input placeholder="Enter text"></ng-shadcn-input>
```

### With Label

```html
<ng-shadcn-input label="Email" type="email" placeholder="Enter your email"></ng-shadcn-input>
```

### With Error

```html
<ng-shadcn-input label="Username" error="Username is required"></ng-shadcn-input>
```

### Form Integration

```html
<!-- Template-driven forms -->
<ng-shadcn-input [(ngModel)]="username" label="Username"></ng-shadcn-input>

<!-- Reactive forms -->
<ng-shadcn-input [formControl]="usernameControl" label="Username"></ng-shadcn-input>
```

## API

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| type | 'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' | 'text' | Input type |
| placeholder | string | '' | Placeholder text |
| label | string | '' | Label text |
| error | string | '' | Error message |
| disabled | boolean | false | Disabled state |

### Events

| Name | Type | Description |
|------|------|-------------|
| valueChange | EventEmitter<string> | Emitted when value changes |
| focused | EventEmitter<void> | Emitted when input is focused |
| blurred | EventEmitter<void> | Emitted when input loses focus |