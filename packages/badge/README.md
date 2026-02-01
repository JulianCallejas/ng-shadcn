# Badge Component

A flexible badge component for status indicators, labels, and notifications with multiple variants and icon support.

## Features

- 🎨 **Multiple Variants**: Default, secondary, destructive, outline, success, warning, and info styles
- 📏 **Size Options**: Small, default, and large variants
- 🔧 **Icon Support**: Leading and trailing icon slots
- ❌ **Dismissible**: Optional close button functionality with optional fade effect
- 🎯 **Accessibility**: Proper ARIA attributes and keyboard support
- 🎭 **Customizable**: Additional CSS classes and styling options

## Usage

### Basic Badge

```typescript
import { BadgeComponent } from '@ng-shadcn/badge';

@Component({
  template: `
    <ng-shadcn-badge>New</ng-shadcn-badge>
  `
})
export class MyComponent {}
```

### Variants

```typescript
<ng-shadcn-badge variant="default">Default</ng-shadcn-badge>
<ng-shadcn-badge variant="secondary">Secondary</ng-shadcn-badge>
<ng-shadcn-badge variant="destructive">Error</ng-shadcn-badge>
<ng-shadcn-badge variant="outline">Outline</ng-shadcn-badge>
<ng-shadcn-badge variant="success">Success</ng-shadcn-badge>
<ng-shadcn-badge variant="warning">Warning</ng-shadcn-badge>
<ng-shadcn-badge variant="info">Info</ng-shadcn-badge>
```

### Sizes

```typescript
<ng-shadcn-badge size="sm">Small</ng-shadcn-badge>
<ng-shadcn-badge size="default">Default</ng-shadcn-badge>
<ng-shadcn-badge size="lg">Large</ng-shadcn-badge>
```

### With Icons

```typescript
<ng-shadcn-badge>
  <svg slot="leading-icon" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
  </svg>
  Verified
</ng-shadcn-badge>

<ng-shadcn-badge>
  Online
  <div slot="trailing-icon" class="h-2 w-2 bg-green-400 rounded-full"></div>
</ng-shadcn-badge>
```

### Dismissible Badge

```typescript
// Basic dismissible badge (removes from DOM)
<ng-shadcn-badge 
  [dismissible]="'remove'"
  (dismissed)="onBadgeDismiss()">
  Removable (removes from DOM)
</ng-shadcn-badge>

// Dismissible with hide behavior (hides but keeps in DOM)
<ng-shadcn-badge
  [dismissible]="'hide'"
  (dismissed)="onBadgeDismiss()">
  Hides when dismissed
</ng-shadcn-badge>

// With fade animation on dismiss
<ng-shadcn-badge
  [dismissible]="'remove'"
  [fade]="true"
  (dismissed)="onBadgeDismiss()">
  Fade out on dismiss
</ng-shadcn-badge>
```

### Status Indicators

```typescript
<!-- Order status -->
<ng-shadcn-badge variant="success">Completed</ng-shadcn-badge>
<ng-shadcn-badge variant="warning">Pending</ng-shadcn-badge>
<ng-shadcn-badge variant="destructive">Failed</ng-shadcn-badge>

<!-- User roles -->
<ng-shadcn-badge variant="info">Admin</ng-shadcn-badge>
<ng-shadcn-badge variant="secondary">User</ng-shadcn-badge>

<!-- Notification counts -->
<ng-shadcn-badge variant="destructive" size="sm">3</ng-shadcn-badge>
```

### Custom Styling

```typescript
<ng-shadcn-badge 
  className="bg-purple-500 text-white hover:bg-purple-600">
  Custom
</ng-shadcn-badge>
```

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'success' \| 'warning' \| 'info'` | `'default'` | Badge style variant |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Badge size |
| `dismissible` | `'hide' | 'remove'` | `''` | Dismiss behavior: 'hide' keeps element in DOM but hidden, 'remove' removes element from DOM |
| `fade` | `boolean` | `false` | Whether to use fade animation when dismissing (only applies when `dismissible` is set) |
| `class` | `string` | `''` | Additional CSS classes |
| `role` | `string` | `'status'` | ARIA role attribute |
| `ariaLabel` | `string` | `undefined` | ARIA label for accessibility |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `dismissed` | `EventEmitter<void>` | Emitted when a dismissible badge is closed |

## Content Projection

### Leading Icon Slot
Use `slot="leading-icon"` to project an icon before the text:
```html
<ng-shadcn-badge>
  <svg slot="leading-icon" class="h-3 w-3">...</svg>
  Badge Text
</ng-shadcn-badge>
```

### Trailing Icon Slot
Use `slot="trailing-icon"` to project an icon after the text:
```html
<ng-shadcn-badge>
  Badge Text
  <span slot="trailing-icon" class="h-2 w-2 bg-green-400 rounded-full"></span>
</ng-shadcn-badge>
```

## Use Cases

### Status Badges
```typescript
<ng-shadcn-badge variant="success">Active</ng-shadcn-badge>
<ng-shadcn-badge variant="warning">Inactive</ng-shadcn-badge>
<ng-shadcn-badge variant="destructive">Blocked</ng-shadcn-badge>
```

### Notification Badges
```typescript
<div class="relative">
  <button>Messages</button>
  <ng-shadcn-badge 
    variant="destructive" 
    size="sm" 
    [dismissible]="true"
    (dismissed)="clearNotification()"
    class="absolute -top-2 -right-2">
    5
  </ng-shadcn-badge>
</div>
```

### Category Tags
```typescript
<ng-shadcn-badge 
  variant="outline" 
  [dismissible]="true">
  JavaScript
</ng-shadcn-badge>
<ng-shadcn-badge 
  variant="outline" 
  [dismissible]="true">
  Angular
</ng-shadcn-badge>
```

## Accessibility

- Proper ARIA `role` attribute (defaults to "status")
- Support for custom `aria-label`
- Keyboard accessible dismiss button
- Focus management for interactive elements
- Screen reader friendly dismiss button labels
