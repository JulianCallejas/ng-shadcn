# Tabs Component

A set of layered sections of content—known as tab panels—that are displayed one at a time. Built with Angular signals for modern, reactive UI development.

## Features

- ✅ **Horizontal & Vertical Layouts**: Support for both orientations
- ✅ **Keyboard Navigation**: Full arrow key and tab navigation support
- ✅ **Signal-based State**: Modern Angular signals for reactive updates
- ✅ **Accessibility**: Full ARIA support with proper roles and attributes
- ✅ **Disabled States**: Support for disabled tabs
- ✅ **Custom Styling**: Easy theming with CSS variables
- ✅ **TypeScript**: Full type safety with proper interfaces

## Installation

```bash
npx ng-shadcn install tabs
```

## Usage

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { TabsComponent, TabListComponent, TabTriggerComponent, TabContentComponent } from './components/tabs';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [TabsComponent, TabListComponent, TabTriggerComponent, TabContentComponent],
  template: `
    <ng-shadcn-tabs defaultValue="account">
      <ng-shadcn-tab-list>
        <ng-shadcn-tab-trigger value="account">Account</ng-shadcn-tab-trigger>
        <ng-shadcn-tab-trigger value="password">Password</ng-shadcn-tab-trigger>
      </ng-shadcn-tab-list>
      <ng-shadcn-tab-content value="account">
        <p>Make changes to your account here. Click save when you're done.</p>
      </ng-shadcn-tab-content>
      <ng-shadcn-tab-content value="password">
        <p>Change your password here. After saving, you'll be logged out.</p>
      </ng-shadcn-tab-content>
    </ng-shadcn-tabs>
  `,
})
export class ExampleComponent {}
```

### Vertical Tabs

```html
<ng-shadcn-tabs defaultValue="general" orientation="vertical">
  <ng-shadcn-tab-list>
    <ng-shadcn-tab-trigger value="general">General</ng-shadcn-tab-trigger>
    <ng-shadcn-tab-trigger value="security">Security</ng-shadcn-tab-trigger>
    <ng-shadcn-tab-trigger value="integrations">Integrations</ng-shadcn-tab-trigger>
    <ng-shadcn-tab-trigger value="support">Support</ng-shadcn-tab-trigger>
  </ng-shadcn-tab-list>
  <ng-shadcn-tab-content value="general">
    <h3 class="text-lg font-medium">General Settings</h3>
    <p class="text-sm text-muted-foreground">
      Make changes to your general account settings here.
    </p>
  </ng-shadcn-tab-content>
  <ng-shadcn-tab-content value="security">
    <h3 class="text-lg font-medium">Security Settings</h3>
    <p class="text-sm text-muted-foreground">
      Manage your account security and authentication preferences.
    </p>
  </ng-shadcn-tab-content>
  <ng-shadcn-tab-content value="integrations">
    <h3 class="text-lg font-medium">Integrations</h3>
    <p class="text-sm text-muted-foreground">
      Connect and manage your third-party integrations.
    </p>
  </ng-shadcn-tab-content>
  <ng-shadcn-tab-content value="support">
    <h3 class="text-lg font-medium">Support</h3>
    <p class="text-sm text-muted-foreground">
      Get help and support for your account.
    </p>
  </ng-shadcn-tab-content>
</ng-shadcn-tabs>
```

### Controlled Tabs

```typescript
@Component({
  template: `
    <ng-shadcn-tabs [value]="activeTab" (valueChange)="onTabChange($event)">
      <ng-shadcn-tab-list>
        <ng-shadcn-tab-trigger value="tab1">Tab 1</ng-shadcn-tab-trigger>
        <ng-shadcn-tab-trigger value="tab2">Tab 2</ng-shadcn-tab-trigger>
        <ng-shadcn-tab-trigger value="tab3">Tab 3</ng-shadcn-tab-trigger>
      </ng-shadcn-tab-list>
      <ng-shadcn-tab-content value="tab1">Content 1</ng-shadcn-tab-content>
      <ng-shadcn-tab-content value="tab2">Content 2</ng-shadcn-tab-content>
      <ng-shadcn-tab-content value="tab3">Content 3</ng-shadcn-tab-content>
    </ng-shadcn-tabs>
    
    <p>Active tab: {{ activeTab }}</p>
  `,
})
export class ControlledTabsComponent {
  activeTab = 'tab1';

  onTabChange(value: string) {
    this.activeTab = value;
    console.log('Tab changed to:', value);
  }
}
```

### Disabled Tabs

```html
<ng-shadcn-tabs defaultValue="available">
  <ng-shadcn-tab-list>
    <ng-shadcn-tab-trigger value="available">Available</ng-shadcn-tab-trigger>
    <ng-shadcn-tab-trigger value="disabled" [disabled]="true">Disabled</ng-shadcn-tab-trigger>
    <ng-shadcn-tab-trigger value="premium">Premium</ng-shadcn-tab-trigger>
  </ng-shadcn-tab-list>
  <ng-shadcn-tab-content value="available">
    <p>This content is available to all users.</p>
  </ng-shadcn-tab-content>
  <ng-shadcn-tab-content value="disabled">
    <p>This content is disabled.</p>
  </ng-shadcn-tab-content>
  <ng-shadcn-tab-content value="premium">
    <p>This content is available to premium users.</p>
  </ng-shadcn-tab-content>
</ng-shadcn-tabs>
```

### With Forms

```typescript
@Component({
  template: `
    <ng-shadcn-tabs defaultValue="account">
      <ng-shadcn-tab-list>
        <ng-shadcn-tab-trigger value="account">Account</ng-shadcn-tab-trigger>
        <ng-shadcn-tab-trigger value="password">Password</ng-shadcn-tab-trigger>
      </ng-shadcn-tab-list>
      
      <ng-shadcn-tab-content value="account" class="space-y-4">
        <div class="space-y-2">
          <ng-shadcn-input label="Name" [(ngModel)]="name" placeholder="Your name"></ng-shadcn-input>
          <ng-shadcn-input label="Email" type="email" [(ngModel)]="email" placeholder="Your email"></ng-shadcn-input>
        </div>
        <ng-shadcn-button (clicked)="saveAccount()">Save changes</ng-shadcn-button>
      </ng-shadcn-tab-content>
      
      <ng-shadcn-tab-content value="password" class="space-y-4">
        <div class="space-y-2">
          <ng-shadcn-input label="Current password" type="password" [(ngModel)]="currentPassword"></ng-shadcn-input>
          <ng-shadcn-input label="New password" type="password" [(ngModel)]="newPassword"></ng-shadcn-input>
        </div>
        <ng-shadcn-button (clicked)="changePassword()">Update password</ng-shadcn-button>
      </ng-shadcn-tab-content>
    </ng-shadcn-tabs>
  `,
})
export class TabsWithFormsComponent {
  name = '';
  email = '';
  currentPassword = '';
  newPassword = '';

  saveAccount() {
    console.log('Saving account:', { name: this.name, email: this.email });
  }

  changePassword() {
    console.log('Changing password');
  }
}
```

## API Reference

### TabsComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `defaultValue` | `string` | `''` | The default active tab value |
| `value` | `string` | `''` | The controlled active tab value |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | The orientation of the tabs |
| `className` | `string` | `''` | Additional CSS classes |

#### Events

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `EventEmitter<string>` | Emitted when the active tab changes |

### TabListComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | The orientation of the tab list |

### TabTriggerComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | The unique value for this tab |
| `disabled` | `boolean` | `false` | Whether the tab is disabled |
| `className` | `string` | `''` | Additional CSS classes |

### TabContentComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | The unique value for this tab content |
| `className` | `string` | `''` | Additional CSS classes |

## Accessibility

- **Keyboard Navigation**: Full support for Tab, Shift+Tab, Enter, Space, and Arrow keys
- **ARIA Attributes**: Proper ARIA labels, roles, and states
- **Focus Management**: Visible focus indicators and proper focus handling
- **Screen Reader**: Compatible with screen readers
- **Roles**: Uses proper `tablist`, `tab`, and `tabpanel` roles

### ARIA Features

- `role="tablist"` on tab list container
- `role="tab"` on tab triggers
- `role="tabpanel"` on tab content
- `aria-selected` indicates selected tab
- `aria-controls` links tabs to their panels
- `aria-labelledby` links panels to their tabs
- `aria-orientation` indicates tab list orientation

### Keyboard Navigation

- **Tab**: Move focus to next focusable element
- **Shift + Tab**: Move focus to previous focusable element
- **Enter/Space**: Activate focused tab
- **Arrow Keys**: Navigate between tabs (when tab list is focused)

## Examples

### Dashboard Tabs

```typescript
@Component({
  template: `
    <ng-shadcn-tabs defaultValue="overview" class="w-full">
      <ng-shadcn-tab-list class="grid w-full grid-cols-4">
        <ng-shadcn-tab-trigger value="overview">Overview</ng-shadcn-tab-trigger>
        <ng-shadcn-tab-trigger value="analytics">Analytics</ng-shadcn-tab-trigger>
        <ng-shadcn-tab-trigger value="reports">Reports</ng-shadcn-tab-trigger>
        <ng-shadcn-tab-trigger value="notifications">Notifications</ng-shadcn-tab-trigger>
      </ng-shadcn-tab-list>
      
      <ng-shadcn-tab-content value="overview" class="mt-6">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <!-- Dashboard cards here -->
        </div>
      </ng-shadcn-tab-content>
      
      <ng-shadcn-tab-content value="analytics" class="mt-6">
        <!-- Analytics content -->
      </ng-shadcn-tab-content>
      
      <ng-shadcn-tab-content value="reports" class="mt-6">
        <!-- Reports content -->
      </ng-shadcn-tab-content>
      
      <ng-shadcn-tab-content value="notifications" class="mt-6">
        <!-- Notifications content -->
      </ng-shadcn-tab-content>
    </ng-shadcn-tabs>
  `,
})
export class DashboardTabsComponent {}
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
