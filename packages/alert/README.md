# Alert Component

A flexible alert component for displaying notification messages with multiple variants, dismissible functionality, and icon integration.

## Features

- 🎨 **Multiple Variants**: Default, destructive, warning, success, and info styles
- ❌ **Dismissible**: Optional close button functionality
- 🔧 **Icon Support**: Default icons per variant or custom icon slots
- 🎯 **Accessibility**: Proper ARIA attributes and screen reader support
- 📝 **Rich Content**: Support for titles and detailed descriptions
- 🎭 **Customizable**: Additional CSS classes and styling options

## Usage

### Basic Alert

```typescript
import { AlertComponent } from '@ng-shadcn/alert';

@Component({
  template: `
    <ng-shadcn-alert>
      This is a basic alert message.
    </ng-shadcn-alert>
  `
})
export class MyComponent {}
```

### Variants

```typescript
<ng-shadcn-alert variant="default">
  Default alert for general information.
</ng-shadcn-alert>

<ng-shadcn-alert variant="destructive">
  Error alert for critical issues.
</ng-shadcn-alert>

<ng-shadcn-alert variant="warning">
  Warning alert for important notices.
</ng-shadcn-alert>

<ng-shadcn-alert variant="success">
  Success alert for completed actions.
</ng-shadcn-alert>

<ng-shadcn-alert variant="info">
  Info alert for helpful information.
</ng-shadcn-alert>
```

### With Title

```typescript
<ng-shadcn-alert variant="warning" title="Important Notice">
  Please review your settings before proceeding.
</ng-shadcn-alert>

<!-- Or using title slot -->
<ng-shadcn-alert variant="success">
  <span slot="title">Operation Successful</span>
  Your changes have been saved successfully.
</ng-shadcn-alert>
```

### Dismissible Alert

```typescript
<ng-shadcn-alert 
  variant="info" 
  [dismissible]="true"
  (dismissed)="onAlertDismissed()">
  This alert can be dismissed by clicking the X button.
</ng-shadcn-alert>
```

### With Custom Icon

```typescript
<ng-shadcn-alert variant="success" [showDefaultIcon]="false">
  <svg slot="icon" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
  </svg>
  Custom success icon alert.
</ng-shadcn-alert>
```

### Complex Alert with Rich Content

```typescript
<ng-shadcn-alert variant="warning" title="Update Available" [dismissible]="true">
  <p>A new version of the application is available.</p>
  <div class="mt-2">
    <button class="text-sm underline">Download now</button>
    <button class="ml-4 text-sm underline">Learn more</button>
  </div>
</ng-shadcn-alert>
```

### Form Validation Alerts

```typescript
<ng-shadcn-alert variant="destructive" title="Validation Error">
  <ul class="mt-2 list-disc list-inside">
    <li>Email is required</li>
    <li>Password must be at least 8 characters</li>
  </ul>
</ng-shadcn-alert>
```

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'warning' \| 'success' \| 'info'` | `'default'` | Alert style variant |
| `dismissible` | `boolean` | `false` | Whether the alert can be dismissed |
| `title` | `string` | `undefined` | Alert title text |
| `className` | `string` | `''` | Additional CSS classes |
| `showDefaultIcon` | `boolean` | `true` | Whether to show the default variant icon |
| `ariaLive` | `'polite' \| 'assertive' \| 'off'` | `'polite'` | ARIA live region behavior |
| `ariaAtomic` | `boolean` | `true` | ARIA atomic attribute |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `dismissed` | `EventEmitter<void>` | Emitted when alert is dismissed |

## Content Projection

### Icon Slot
Use `slot="icon"` to project a custom icon:
```html
<ng-shadcn-alert [showDefaultIcon]="false">
  <svg slot="icon" class="h-4 w-4">...</svg>
  Alert content
</ng-shadcn-alert>
```

### Title Slot
Use `slot="title"` to project custom title content:
```html
<ng-shadcn-alert>
  <span slot="title">Custom Title</span>
  Alert description
</ng-shadcn-alert>
```

## Use Cases

### System Notifications
```typescript
<ng-shadcn-alert variant="info" [dismissible]="true">
  System maintenance scheduled for tonight at 2 AM EST.
</ng-shadcn-alert>
```

### Form Feedback
```typescript
<ng-shadcn-alert variant="success" title="Profile Updated">
  Your profile information has been successfully updated.
</ng-shadcn-alert>
```

### Error Messages
```typescript
<ng-shadcn-alert variant="destructive" title="Connection Error">
  Unable to connect to the server. Please try again later.
</ng-shadcn-alert>
```

### Warning Messages
```typescript
<ng-shadcn-alert variant="warning" title="Storage Almost Full">
  You're using 95% of your storage space. Consider upgrading your plan.
</ng-shadcn-alert>
```

## Accessibility

- Proper ARIA `role="alert"` attribute
- Configurable `aria-live` regions for screen reader announcements
- Keyboard accessible dismiss button
- Focus management for interactive elements
- Screen reader friendly dismiss button labels
- Support for `aria-atomic` for complete message reading

## Styling

The alert component uses CSS variables for theming and supports both light and dark modes. Each variant has appropriate color schemes that work well in different contexts.

### Default Icons

Each variant comes with a contextually appropriate default icon:
- **Default/Info**: Information circle
- **Destructive**: Warning triangle
- **Warning**: Warning triangle  
- **Success**: Check circle
- **Info**: Information circle
