# Dropdown Menu Component

Displays a menu to the user—such as a set of actions or functions—triggered by a button. Built with Angular signals for modern, reactive UI development.

## Features

- ✅ **Context Menus**: Perfect for action lists and context menus
- ✅ **Keyboard Navigation**: Full arrow key and tab navigation support
- ✅ **Signal-based State**: Modern Angular signals for reactive updates
- ✅ **Accessibility**: Full ARIA support with proper roles and attributes
- ✅ **Disabled Items**: Support for disabled menu items
- ✅ **Icons & Shortcuts**: Support for icons and keyboard shortcuts
- ✅ **Auto-positioning**: Smart positioning relative to trigger
- ✅ **TypeScript**: Full type safety with proper interfaces

## Installation

```bash
npx ng-shadcn install dropdown-menu
```

## Usage

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { 
  DropdownMenuComponent, 
  DropdownMenuTriggerComponent, 
  DropdownMenuContentComponent,
  DropdownMenuItemComponent,
  DropdownMenuSeparatorComponent 
} from './components/dropdown-menu';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    DropdownMenuComponent,
    DropdownMenuTriggerComponent,
    DropdownMenuContentComponent,
    DropdownMenuItemComponent,
    DropdownMenuSeparatorComponent
  ],
  template: `
    <ng-shadcn-dropdown-menu>
      <ng-shadcn-dropdown-menu-trigger>
        <button class="btn">Open Menu</button>
      </ng-shadcn-dropdown-menu-trigger>
      <ng-shadcn-dropdown-menu-content>
        <ng-shadcn-dropdown-menu-item label="Profile" (itemSelected)="openProfile()"></ng-shadcn-dropdown-menu-item>
        <ng-shadcn-dropdown-menu-item label="Settings" (itemSelected)="openSettings()"></ng-shadcn-dropdown-menu-item>
        <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
        <ng-shadcn-dropdown-menu-item label="Logout" (itemSelected)="logout()"></ng-shadcn-dropdown-menu-item>
      </ng-shadcn-dropdown-menu-content>
    </ng-shadcn-dropdown-menu>
  `,
})
export class ExampleComponent {
  openProfile() {
    console.log('Opening profile...');
  }

  openSettings() {
    console.log('Opening settings...');
  }

  logout() {
    console.log('Logging out...');
  }
}
```

### With Icons and Shortcuts

```html
<ng-shadcn-dropdown-menu>
  <ng-shadcn-dropdown-menu-trigger>
    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
      Actions
      <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
  </ng-shadcn-dropdown-menu-trigger>
  <ng-shadcn-dropdown-menu-content>
    <ng-shadcn-dropdown-menu-label>My Account</ng-shadcn-dropdown-menu-label>
    <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
    <ng-shadcn-dropdown-menu-item 
      label="Profile" 
      icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'/></svg>" 
      shortcut="⌘P"
      (itemSelected)="openProfile()">
    </ng-shadcn-dropdown-menu-item>
    <ng-shadcn-dropdown-menu-item 
      label="Settings" 
      icon="<svg class='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'/><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'/></svg>" 
      shortcut="⌘S"
      (itemSelected)="openSettings()">
    </ng-shadcn-dropdown-menu-item>
    <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
    <ng-shadcn-dropdown-menu-item 
      label="Logout" 
      shortcut="⌘Q"
      (itemSelected)="logout()">
    </ng-shadcn-dropdown-menu-item>
  </ng-shadcn-dropdown-menu-content>
</ng-shadcn-dropdown-menu>
```

### Controlled Menu

```typescript
@Component({
  template: `
    <ng-shadcn-dropdown-menu [open]="isMenuOpen" (openChange)="onMenuOpenChange($event)">
      <ng-shadcn-dropdown-menu-trigger>
        <button class="btn">{{ isMenuOpen ? 'Close' : 'Open' }} Menu</button>
      </ng-shadcn-dropdown-menu-trigger>
      <ng-shadcn-dropdown-menu-content>
        <ng-shadcn-dropdown-menu-item label="Item 1" (itemSelected)="selectItem('item1')"></ng-shadcn-dropdown-menu-item>
        <ng-shadcn-dropdown-menu-item label="Item 2" (itemSelected)="selectItem('item2')"></ng-shadcn-dropdown-menu-item>
      </ng-shadcn-dropdown-menu-content>
    </ng-shadcn-dropdown-menu>
  `,
})
export class ControlledMenuComponent {
  isMenuOpen = false;

  onMenuOpenChange(open: boolean) {
    this.isMenuOpen = open;
    console.log('Menu is now:', open ? 'open' : 'closed');
  }

  selectItem(item: string) {
    console.log('Selected:', item);
  }
}
```

### With Disabled Items

```html
<ng-shadcn-dropdown-menu>
  <ng-shadcn-dropdown-menu-trigger>
    <button class="btn">File Menu</button>
  </ng-shadcn-dropdown-menu-trigger>
  <ng-shadcn-dropdown-menu-content>
    <ng-shadcn-dropdown-menu-item label="New File" shortcut="⌘N" (itemSelected)="newFile()"></ng-shadcn-dropdown-menu-item>
    <ng-shadcn-dropdown-menu-item label="Open File" shortcut="⌘O" (itemSelected)="openFile()"></ng-shadcn-dropdown-menu-item>
    <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
    <ng-shadcn-dropdown-menu-item label="Save" shortcut="⌘S" [disabled]="!hasUnsavedChanges" (itemSelected)="save()"></ng-shadcn-dropdown-menu-item>
    <ng-shadcn-dropdown-menu-item label="Save As..." shortcut="⌘⇧S" (itemSelected)="saveAs()"></ng-shadcn-dropdown-menu-item>
    <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
    <ng-shadcn-dropdown-menu-item label="Print" shortcut="⌘P" [disabled]="!canPrint" (itemSelected)="print()"></ng-shadcn-dropdown-menu-item>
  </ng-shadcn-dropdown-menu-content>
</ng-shadcn-dropdown-menu>
```

## API Reference

### DropdownMenuComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `open` | `boolean` | `false` | Whether the dropdown is open (controlled) |

#### Events

| Event | Type | Description |
|-------|------|-------------|
| `openChange` | `EventEmitter<boolean>` | Emitted when the dropdown open state changes |

### DropdownMenuTriggerComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Whether the dropdown is open |

#### Events

| Event | Type | Description |
|-------|------|-------------|
| `openChange` | `EventEmitter<boolean>` | Emitted when the trigger is activated |

### DropdownMenuContentComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `minWidth` | `number` | `220` | Minimum width of the dropdown content |

### DropdownMenuItemComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `''` | The text label for the menu item |
| `icon` | `string` | `''` | Icon HTML or text to display |
| `disabled` | `boolean` | `false` | Whether the menu item is disabled |
| `shortcut` | `string` | `''` | Keyboard shortcut text to display |
| `className` | `string` | `''` | Additional CSS classes |

#### Events

| Event | Type | Description |
|-------|------|-------------|
| `itemSelected` | `EventEmitter<void>` | Emitted when the menu item is selected |

### DropdownMenuLabelComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |

## Accessibility

- **Keyboard Navigation**: Full support for Tab, Enter, Space, Escape, and Arrow keys
- **ARIA Attributes**: Proper ARIA labels, roles, and states
- **Focus Management**: Visible focus indicators and proper focus handling
- **Screen Reader**: Compatible with screen readers
- **Roles**: Uses proper `menu`, `menuitem`, and `separator` roles

### ARIA Features

- `role="menu"` on dropdown content
- `role="menuitem"` on menu items
- `role="separator"` on separators
- `aria-haspopup` indicates trigger has popup menu
- `aria-expanded` indicates whether menu is expanded
- `aria-disabled` indicates disabled menu items

### Keyboard Navigation

- **Tab**: Move focus to trigger
- **Enter/Space**: Open/close dropdown
- **Escape**: Close dropdown
- **Arrow Keys**: Navigate between menu items (when open)

## Examples

### User Profile Menu

```typescript
@Component({
  template: `
    <ng-shadcn-dropdown-menu>
      <ng-shadcn-dropdown-menu-trigger>
        <button class="flex items-center space-x-2 rounded-full bg-gray-100 p-2">
          <img class="h-8 w-8 rounded-full" src="avatar.jpg" alt="User avatar">
          <span class="text-sm font-medium">John Doe</span>
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </ng-shadcn-dropdown-menu-trigger>
      <ng-shadcn-dropdown-menu-content class="w-56">
        <ng-shadcn-dropdown-menu-label>My Account</ng-shadcn-dropdown-menu-label>
        <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
        <ng-shadcn-dropdown-menu-item label="Profile" (itemSelected)="viewProfile()"></ng-shadcn-dropdown-menu-item>
        <ng-shadcn-dropdown-menu-item label="Billing" (itemSelected)="viewBilling()"></ng-shadcn-dropdown-menu-item>
        <ng-shadcn-dropdown-menu-item label="Settings" (itemSelected)="openSettings()"></ng-shadcn-dropdown-menu-item>
        <ng-shadcn-dropdown-menu-separator></ng-shadcn-dropdown-menu-separator>
        <ng-shadcn-dropdown-menu-item label="Sign out" (itemSelected)="signOut()"></ng-shadcn-dropdown-menu-item>
      </ng-shadcn-dropdown-menu-content>
    </ng-shadcn-dropdown-menu>
  `,
})
export class UserProfileMenuComponent {
  viewProfile() { /* ... */ }
  viewBilling() { /* ... */ }
  openSettings() { /* ... */ }
  signOut() { /* ... */ }
}
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
