# Alert Component

A flexible alert component built with Angular that provides a way to display notification messages with multiple variants, dismissible functionality, and icon integration. The component follows the shadcn/ui design principles and is fully customizable.

## Features

- 🎨 **Multiple Variants**: Default, destructive, warning, success, and info styles
- ❌ **Dismissible**: Optional close button functionality with fade animation
- 🔧 **Composition**: Built with separate components for title, content, icon, and action
- 🎯 **Accessibility**: Proper ARIA attributes and screen reader support
- 📝 **Rich Content**: Support for titles, descriptions, and actions
- 🎭 **Customizable**: Additional CSS classes and styling options
- ⚡ **Standalone**: Works with both standalone components and modules

## Installation

```bash
npm install @ng-shadcn/alert
```

## Usage

### Standalone Components (Recommended)

```typescript
import { Component } from '@angular/core';
import { 
  AlertComponent, 
  AlertTitleComponent, 
  AlertContentComponent,
  AlertActionComponent,
  AlertIconComponent
} from '@ng-shadcn/alert';

@Component({
  standalone: true,
  imports: [
    AlertComponent,
    AlertTitleComponent,
    AlertContentComponent,
    AlertActionComponent,
    AlertIconComponent
  ],
  template: `
    <ng-shadcn-alert variant="success">
      <ng-shadcn-alert-title>Success!</ng-shadcn-alert-title>
      <ng-shadcn-alert-content>Your action was completed successfully.</ng-shadcn-alert-content>
      <ng-shadcn-alert-action (onClick)="onAction()">Undo</ng-shadcn-alert-action>
    </ng-shadcn-alert>
  `
})
export class MyComponent {
  onAction() {
    console.log('Action clicked!');
  }
}
```

### Module-based Usage

```typescript
import { NgModule } from '@angular/core';
import { AlertModule } from '@ng-shadcn/alert';

@NgModule({
  imports: [
    // ... other imports
    AlertModule
  ]
})
export class AppModule {}
```

## Variants

```html
<!-- Default -->
<ng-shadcn-alert>
  <ng-shadcn-alert-content>Default alert for general information.</ng-shadcn-alert-content>
</ng-shadcn-alert>

<!-- Destructive -->
<ng-shadcn-alert variant="destructive">
  <ng-shadcn-alert-content>Error alert for critical issues.</ng-shadcn-alert-content>
</ng-shadcn-alert>

<!-- Warning -->
<ng-shadcn-alert variant="warning">
  <ng-shadcn-alert-content>Warning alert for important notices.</ng-shadcn-alert-content>
</ng-shadcn-alert>

<!-- Success -->
<ng-shadcn-alert variant="success">
  <ng-shadcn-alert-content>Success alert for completed actions.</ng-shadcn-alert-content>
</ng-shadcn-alert>

<!-- Info -->
<ng-shadcn-alert variant="info">
  <ng-shadcn-alert-content>Info alert for helpful information.</ng-shadcn-alert-content>
</ng-shadcn-alert>
```

### Dismissible Alert with Fade Animation

The Alert component supports a smooth fade-out animation when dismissed. By default, the fade animation is enabled.

```html
<!-- With fade animation (default) -->
<ng-shadcn-alert 
  variant="info" 
  [dismissible]="true"
  (dismissed)="onAlertDismissed()">
  <ng-shadcn-alert-content>
    This alert will fade out when dismissed.
  </ng-shadcn-alert-content>
</ng-shadcn-alert>

<!-- Without fade animation -->
<ng-shadcn-alert 
  variant="warning" 
  [dismissible]="true"
  [fade]="false"
  (dismissed)="onAlertDismissed()">
  <ng-shadcn-alert-content>
    This alert will be hidden immediately when dismissed.
  </ng-shadcn-alert-content>
</ng-shadcn-alert>

<!-- With custom fade duration (in milliseconds) -->
<ng-shadcn-alert 
  variant="success"
  [dismissible]="true"
  [fade]="500"
  (dismissed)="onAlertDismissed()">
  <ng-shadcn-alert-content>
    This alert will fade out over 500ms when dismissed.
  </ng-shadcn-alert-content>
</ng-shadcn-alert>
```

#### Dismissed Event

The `dismissed` event emits when the alert is fully hidden after the fade animation completes (or immediately if fade is disabled). The event includes information about the dismissal:

```typescript
onAlertDismissed() {
  console.log('Alert was dismissed');
  // Update your component state or perform other actions
}
```

#### Programmatic Dismissal

You can also dismiss the alert programmatically by using a template reference variable:

```html
<ng-shadcn-alert 
  #myAlert
  variant="info" 
  [dismissible]="true">
  <ng-shadcn-alert-content>
    This alert can be dismissed programmatically.
  </ng-shadcn-alert-content>
</ng-shadcn-alert>

<button (click)="myAlert.dismiss()">Dismiss Alert</button>
```

### With Custom Icon

```html
<ng-shadcn-alert variant="success">
  <ng-shadcn-alert-icon>
    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
  </ng-shadcn-alert-icon>
  <ng-shadcn-alert-content>Custom success icon alert.</ng-shadcn-alert-content>
</ng-shadcn-alert>
```

### Complex Alert with Actions

```html
<ng-shadcn-alert variant="warning">
  <ng-shadcn-alert-title>Update Available</ng-shadcn-alert-title>
  <ng-shadcn-alert-content>
    A new version of the application is available. Would you like to update now?
  </ng-shadcn-alert-content>
  <div class="mt-2 flex gap-2">
    <ng-shadcn-alert-action (onClick)="updateNow()">Update Now</ng-shadcn-alert-action>
    <ng-shadcn-alert-action (onClick)="learnMore()" class="bg-transparent hover:bg-accent/50">
      Learn More
    </ng-shadcn-alert-action>
  </div>
</ng-shadcn-alert>
```
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
| `showIcon` | `boolean` | `true` | Whether to show the default variant icon |
| `ariaLive` | `'polite' \| 'assertive' \| 'off'` | `'polite'` | ARIA live region behavior |
| `ariaAtomic` | `boolean` | `true` | ARIA atomic attribute |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `dismissed` | `EventEmitter<void>` | Emitted when alert is dismissed |

## Content Projection

The Alert component uses Angular's content projection with specific selectors for different parts of the alert.

### Components

#### AlertIconComponent
Use `ng-shadcn-alert-icon` to provide a custom icon. When a custom icon is provided, it will replace the default variant icon.

```html
<ng-shadcn-alert>
  <ng-shadcn-alert-icon>
    <!-- Your custom SVG or icon component -->
    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
    </svg>
  </ng-shadcn-alert-icon>
  <ng-shadcn-alert-content>Alert with custom icon</ng-shadcn-alert-content>
</ng-shadcn-alert>
```

#### AlertTitleComponent
Use `ng-shadcn-alert-title` for the alert's title.

```html
<ng-shadcn-alert>
  <ng-shadcn-alert-title>Alert Title</ng-shadcn-alert-title>
  <ng-shadcn-alert-content>Alert content goes here</ng-shadcn-alert-content>
</ng-shadcn-alert>
```

#### AlertContentComponent
Use `ng-shadcn-alert-content` for the main alert content.

```html
<ng-shadcn-alert>
  <ng-shadcn-alert-content>
    This is the main content of the alert. It can contain <strong>rich text</strong>
    and multiple paragraphs if needed.
  </ng-shadcn-alert-content>
</ng-shadcn-alert>
```

#### AlertActionComponent
Use `ng-shadcn-alert-action` to add action buttons to the alert.

```html
<ng-shadcn-alert>
  <ng-shadcn-alert-content>Your changes have been saved.</ng-shadcn-alert-content>
  <ng-shadcn-alert-action (onClick)="onUndo()">Undo</ng-shadcn-alert-action>
</ng-shadcn-alert>
```

### Complete Example

Here's an example using all components together:

```html
<ng-shadcn-alert variant="success" [dismissible]="true">
  <ng-shadcn-alert-icon>
    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
  </ng-shadcn-alert-icon>
  <ng-shadcn-alert-title>Success!</ng-shadcn-alert-title>
  <ng-shadcn-alert-content>
    Your profile has been updated successfully.
  </ng-shadcn-alert-content>
  <ng-shadcn-alert-action (onClick)="onUndo()">Undo</ng-shadcn-alert-action>
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
