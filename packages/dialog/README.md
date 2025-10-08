# Dialog Component

A modal dialog component with animations, backdrop control, and accessibility features.

## Installation

```bash
npx ng-shadcn install dialog
```

## Usage

Import the component in your module or standalone component:

```typescript
import { DialogComponent } from '@ng-shadcn/dialog';

@Component({
  imports: [DialogComponent],
  // ...
})
```

### Basic Usage

```html
<ng-shadcn-dialog 
  title="Confirm Action"
  description="Are you sure you want to continue?"
  [isOpen]="showDialog"
  (closed)="showDialog = false"
>
  <p>This action cannot be undone.</p>
  
  <div slot="footer" class="flex justify-end space-x-2">
    <button 
      class="px-4 py-2 border rounded" 
      (click)="showDialog = false"
    >
      Cancel
    </button>
    <button 
      class="px-4 py-2 bg-red-500 text-white rounded" 
      (click)="confirmAction()"
    >
      Confirm
    </button>
  </div>
</ng-shadcn-dialog>

<!-- Trigger -->
<button (click)="showDialog = true">Open Dialog</button>
```

### Different Sizes

```html
<ng-shadcn-dialog size="sm" title="Small Dialog">
  <!-- content -->
</ng-shadcn-dialog>

<ng-shadcn-dialog size="lg" title="Large Dialog">
  <!-- content -->
</ng-shadcn-dialog>
```

### Using the Dialog Service

```typescript
import { DialogService } from '@ng-shadcn/dialog';

constructor(private dialogService: DialogService) {}

openDialog() {
  const dialogRef = this.dialogService.open({
    title: 'Service Dialog',
    description: 'Opened via service',
    size: 'md'
  });
  
  dialogRef.instance.closed.subscribe(() => {
    console.log('Dialog closed');
  });
}
```

## API

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | string | '' | Dialog title |
| description | string | '' | Dialog description |
| showCloseButton | boolean | true | Show close button |
| backdrop | boolean | true | Allow backdrop click to close |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Dialog size |

### Events

| Name | Type | Description |
|------|------|-------------|
| opened | EventEmitter<void> | Emitted when dialog opens |
| closed | EventEmitter<void> | Emitted when dialog closes |

### Slots

- Default slot: Main dialog content
- `slot="footer"`: Footer content (typically buttons)

## Accessibility

The dialog component includes:
- Proper ARIA attributes (`role="dialog"`, `aria-modal`)
- Focus management
- Escape key handling
- Screen reader support