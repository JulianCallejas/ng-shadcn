# Popover Component

Displays rich content in a portal, triggered by a button. Perfect for floating content containers and contextual information. Built with Angular signals for modern, reactive UI development.

## Features

- ✅ **Smart Positioning**: 12 placement options with automatic positioning
- ✅ **Portal Rendering**: Content rendered in a portal for proper layering
- ✅ **Signal-based State**: Modern Angular signals for reactive updates
- ✅ **Accessibility**: Full ARIA support with dialog semantics
- ✅ **Click Outside**: Configurable click-outside-to-close behavior
- ✅ **Keyboard Support**: Escape key and focus management
- ✅ **Arrow Pointer**: Optional arrow pointing to trigger
- ✅ **TypeScript**: Full type safety with proper interfaces

## Installation

```bash
npx ng-shadcn install popover
```

## Usage

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { 
  PopoverComponent, 
  PopoverTriggerComponent, 
  PopoverContentComponent 
} from './components/popover';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [PopoverComponent, PopoverTriggerComponent, PopoverContentComponent],
  template: `
    <ng-shadcn-popover>
      <ng-shadcn-popover-trigger>
        <button class="btn">Open Popover</button>
      </ng-shadcn-popover-trigger>
      <ng-shadcn-popover-content>
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Dimensions</h4>
          <p class="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
      </ng-shadcn-popover-content>
    </ng-shadcn-popover>
  `,
})
export class ExampleComponent {}
```

### Different Placements

```html
<div class="grid grid-cols-3 gap-4">
  <!-- Top placements -->
  <ng-shadcn-popover placement="top-start">
    <ng-shadcn-popover-trigger>
      <button class="btn">Top Start</button>
    </ng-shadcn-popover-trigger>
    <ng-shadcn-popover-content>
      <p>Content positioned at top-start</p>
    </ng-shadcn-popover-content>
  </ng-shadcn-popover>

  <ng-shadcn-popover placement="top">
    <ng-shadcn-popover-trigger>
      <button class="btn">Top</button>
    </ng-shadcn-popover-trigger>
    <ng-shadcn-popover-content>
      <p>Content positioned at top</p>
    </ng-shadcn-popover-content>
  </ng-shadcn-popover>

  <ng-shadcn-popover placement="top-end">
    <ng-shadcn-popover-trigger>
      <button class="btn">Top End</button>
    </ng-shadcn-popover-trigger>
    <ng-shadcn-popover-content>
      <p>Content positioned at top-end</p>
    </ng-shadcn-popover-content>
  </ng-shadcn-popover>

  <!-- Bottom placements -->
  <ng-shadcn-popover placement="bottom-start">
    <ng-shadcn-popover-trigger>
      <button class="btn">Bottom Start</button>
    </ng-shadcn-popover-trigger>
    <ng-shadcn-popover-content>
      <p>Content positioned at bottom-start</p>
    </ng-shadcn-popover-content>
  </ng-shadcn-popover>

  <ng-shadcn-popover placement="bottom">
    <ng-shadcn-popover-trigger>
      <button class="btn">Bottom</button>
    </ng-shadcn-popover-trigger>
    <ng-shadcn-popover-content>
      <p>Content positioned at bottom</p>
    </ng-shadcn-popover-content>
  </ng-shadcn-popover>

  <ng-shadcn-popover placement="bottom-end">
    <ng-shadcn-popover-trigger>
      <button class="btn">Bottom End</button>
    </ng-shadcn-popover-trigger>
    <ng-shadcn-popover-content>
      <p>Content positioned at bottom-end</p>
    </ng-shadcn-popover-content>
  </ng-shadcn-popover>
</div>
```

### Popover with Form

```html
<ng-shadcn-popover placement="bottom-start">
  <ng-shadcn-popover-trigger>
    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
      <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      Settings
    </button>
  </ng-shadcn-popover-trigger>
  <ng-shadcn-popover-content class="w-80">
    <div class="space-y-4">
      <div class="space-y-2">
        <h4 class="font-medium leading-none">Dimensions</h4>
        <p class="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
      <div class="grid gap-2">
        <div class="grid grid-cols-3 items-center gap-4">
          <label class="text-sm font-medium">Width</label>
          <input class="col-span-2 flex h-8 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="100%" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <label class="text-sm font-medium">Max. width</label>
          <input class="col-span-2 flex h-8 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="300px" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <label class="text-sm font-medium">Height</label>
          <input class="col-span-2 flex h-8 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="25px" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <label class="text-sm font-medium">Max. height</label>
          <input class="col-span-2 flex h-8 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="none" />
        </div>
      </div>
    </div>
  </ng-shadcn-popover-content>
</ng-shadcn-popover>
```

### Controlled Popover

```typescript
@Component({
  template: `
    <ng-shadcn-popover [open]="isPopoverOpen" (openChange)="onPopoverOpenChange($event)">
      <ng-shadcn-popover-trigger>
        <button class="btn">{{ isPopoverOpen ? 'Close' : 'Open' }} Popover</button>
      </ng-shadcn-popover-trigger>
      <ng-shadcn-popover-content>
        <div class="space-y-2">
          <h4 class="font-medium">Controlled Popover</h4>
          <p class="text-sm text-muted-foreground">This popover's state is controlled externally.</p>
          <button class="btn btn-sm" (click)="closePopover()">Close</button>
        </div>
      </ng-shadcn-popover-content>
    </ng-shadcn-popover>
  `,
})
export class ControlledPopoverComponent {
  isPopoverOpen = false;

  onPopoverOpenChange(open: boolean) {
    this.isPopoverOpen = open;
    console.log('Popover is now:', open ? 'open' : 'closed');
  }

  closePopover() {
    this.isPopoverOpen = false;
  }
}
```

### Modal Popover

```html
<ng-shadcn-popover [modal]="true" [closeOnClickOutside]="false">
  <ng-shadcn-popover-trigger>
    <button class="btn btn-destructive">Delete Account</button>
  </ng-shadcn-popover-trigger>
  <ng-shadcn-popover-content>
    <div class="space-y-4">
      <div class="space-y-2">
        <h4 class="font-medium text-destructive">Delete Account</h4>
        <p class="text-sm text-muted-foreground">
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </p>
      </div>
      <div class="flex justify-end space-x-2">
        <button class="btn btn-outline btn-sm" (click)="cancelDelete()">Cancel</button>
        <button class="btn btn-destructive btn-sm" (click)="confirmDelete()">Delete Account</button>
      </div>
    </div>
  </ng-shadcn-popover-content>
</ng-shadcn-popover>
```

### Without Arrow

```html
<ng-shadcn-popover>
  <ng-shadcn-popover-trigger>
    <button class="btn">No Arrow</button>
  </ng-shadcn-popover-trigger>
  <ng-shadcn-popover-content [showArrow]="false">
    <div class="space-y-2">
      <h4 class="font-medium">Clean Design</h4>
      <p class="text-sm text-muted-foreground">
        This popover doesn't have an arrow pointer.
      </p>
    </div>
  </ng-shadcn-popover-content>
</ng-shadcn-popover>
```

## API Reference

### PopoverComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `open` | `boolean` | `false` | Whether the popover is open (controlled) |
| `placement` | `PopoverPlacement` | `'bottom'` | The placement of the popover relative to the trigger |
| `modal` | `boolean` | `false` | Whether the popover should be modal |
| `closeOnClickOutside` | `boolean` | `true` | Whether to close when clicking outside |

#### Events

| Event | Type | Description |
|-------|------|-------------|
| `openChange` | `EventEmitter<boolean>` | Emitted when the popover open state changes |

### PopoverTriggerComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Whether the popover is open |

#### Events

| Event | Type | Description |
|-------|------|-------------|
| `openChange` | `EventEmitter<boolean>` | Emitted when the trigger is activated |

### PopoverContentComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `placement` | `PopoverPlacement` | `'bottom'` | The placement of the popover |
| `showArrow` | `boolean` | `true` | Whether to show the arrow pointer |
| `modal` | `boolean` | `false` | Whether the popover is modal |

### PopoverPlacement Type

```typescript
type PopoverPlacement = 
  | 'top' | 'bottom' | 'left' | 'right' 
  | 'top-start' | 'top-end' 
  | 'bottom-start' | 'bottom-end' 
  | 'left-start' | 'left-end' 
  | 'right-start' | 'right-end';
```

## Accessibility

- **Keyboard Navigation**: Full support for Tab, Enter, Space, and Escape keys
- **ARIA Attributes**: Proper ARIA labels, roles, and states
- **Focus Management**: Visible focus indicators and proper focus handling
- **Screen Reader**: Compatible with screen readers
- **Modal Support**: Proper modal behavior when enabled

### ARIA Features

- `role="dialog"` on popover content
- `aria-haspopup` indicates trigger has popup
- `aria-expanded` indicates whether popover is expanded
- `aria-modal` indicates if popover is modal

### Keyboard Navigation

- **Tab**: Move focus to trigger
- **Enter/Space**: Open/close popover
- **Escape**: Close popover

## Examples

### Help Tooltip Alternative

```typescript
@Component({
  template: `
    <div class="flex items-center space-x-2">
      <label class="text-sm font-medium">API Key</label>
      <ng-shadcn-popover placement="top">
        <ng-shadcn-popover-trigger>
          <button class="text-muted-foreground hover:text-foreground">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </button>
        </ng-shadcn-popover-trigger>
        <ng-shadcn-popover-content class="w-80">
          <div class="space-y-2">
            <h4 class="font-medium">API Key</h4>
            <p class="text-sm text-muted-foreground">
              Your API key is used to authenticate requests to our API. Keep it secure and don't share it publicly.
            </p>
            <div class="text-xs text-muted-foreground">
              <p>• Store in environment variables</p>
              <p>• Regenerate if compromised</p>
              <p>• Monitor usage in dashboard</p>
            </div>
          </div>
        </ng-shadcn-popover-content>
      </ng-shadcn-popover>
    </div>
    <input class="input" placeholder="Enter your API key" />
  `,
})
export class HelpPopoverComponent {}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

See the main project [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

---

**Part of ng-shadcn component library** • [Documentation](../../README.md) • [Storybook](https://storybook.ng-shadcn.dev)
