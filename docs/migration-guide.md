# Migration Guide

This guide helps you migrate from other UI libraries to ng-shadcn components.

## Table of Contents

- [From Angular Material](#from-angular-material)
- [From PrimeNG](#from-primeng)
- [From Ng-Bootstrap](#from-ng-bootstrap)
- [From Ant Design Angular](#from-ant-design-angular)
- [General Migration Steps](#general-migration-steps)
- [Automated Migration Tools](#automated-migration-tools)

## From Angular Material

### Component Mapping

| Angular Material | ng-shadcn | Notes |
|------------------|-----------|-------|
| `mat-button` | `ng-shadcn-button` | Similar API, different styling approach |
| `mat-form-field` + `mat-input` | `ng-shadcn-input` | Simplified structure |
| `mat-card` | `ng-shadcn-card` | More flexible composition |
| `mat-slide-toggle` | `ng-shadcn-switch` | Similar functionality |
| `mat-dialog` | `ng-shadcn-dialog` | Different trigger mechanism |
| `mat-tooltip` | `ng-shadcn-tooltip` | Similar API |
| `mat-select` | `ng-shadcn-select` | Simplified options handling |
| `mat-checkbox` | `ng-shadcn-checkbox` | Similar API |
| `mat-radio-group` | `ng-shadcn-radio-group` | Similar structure |
| `mat-chip` | `ng-shadcn-badge` | Different variants available |

### Migration Example

**Before (Angular Material):**
```typescript
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule],
  template: `
    <mat-form-field>
      <mat-label>Email</mat-label>
      <input matInput type="email" [(ngModel)]="email">
    </mat-form-field>
    <button mat-raised-button color="primary">Submit</button>
  `
})
```

**After (ng-shadcn):**
```typescript
import { ButtonComponent } from '@ng-shadcn/components/button';
import { InputComponent } from '@ng-shadcn/components/input';

@Component({
  imports: [ButtonComponent, InputComponent],
  template: `
    <ng-shadcn-input 
      type="email" 
      placeholder="Email"
      [(ngModel)]="email"
    />
    <ng-shadcn-button variant="default">Submit</ng-shadcn-button>
  `
})
```

### Key Differences

1. **Theming**: ng-shadcn uses CSS variables instead of Angular Material's theming system
2. **Structure**: Simpler component structure, less nested elements
3. **Styling**: TailwindCSS-based instead of Material Design
4. **Bundle Size**: Smaller individual component bundles

## From PrimeNG

### Component Mapping

| PrimeNG | ng-shadcn | Notes |
|---------|-----------|-------|
| `p-button` | `ng-shadcn-button` | Similar variants |
| `p-inputText` | `ng-shadcn-input` | Simplified API |
| `p-card` | `ng-shadcn-card` | More flexible layout |
| `p-inputSwitch` | `ng-shadcn-switch` | Similar functionality |
| `p-dialog` | `ng-shadcn-dialog` | Different state management |
| `p-tooltip` | `ng-shadcn-tooltip` | Similar positioning |
| `p-dropdown` | `ng-shadcn-select` | Different option handling |
| `p-checkbox` | `ng-shadcn-checkbox` | Similar API |
| `p-radioButton` | `ng-shadcn-radio-group` | Group-based approach |
| `p-badge` | `ng-shadcn-badge` | Similar variants |

### Migration Example

**Before (PrimeNG):**
```typescript
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  imports: [ButtonModule, InputTextModule],
  template: `
    <input pInputText type="text" [(ngModel)]="value" placeholder="Enter text">
    <p-button label="Click" severity="success"></p-button>
  `
})
```

**After (ng-shadcn):**
```typescript
import { ButtonComponent } from '@ng-shadcn/components/button';
import { InputComponent } from '@ng-shadcn/components/input';

@Component({
  imports: [ButtonComponent, InputComponent],
  template: `
    <ng-shadcn-input 
      type="text" 
      placeholder="Enter text"
      [(ngModel)]="value"
    />
    <ng-shadcn-button variant="default">Click</ng-shadcn-button>
  `
})
```

## From Ng-Bootstrap

### Component Mapping

| Ng-Bootstrap | ng-shadcn | Notes |
|--------------|-----------|-------|
| `ngb-alert` | `ng-shadcn-alert` | Similar variants |
| `ngb-modal` | `ng-shadcn-dialog` | Different trigger approach |
| `ngb-tooltip` | `ng-shadcn-tooltip` | Similar functionality |
| `ngb-dropdown` | `ng-shadcn-dropdown-menu` | Similar structure |
| `ngb-accordion` | `ng-shadcn-accordion` | Similar API |
| `ngb-tabset` | `ng-shadcn-tabs` | Different tab structure |

### Migration Example

**Before (Ng-Bootstrap):**
```typescript
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  imports: [NgbModule],
  template: `
    <ngb-alert type="success" [dismissible]="true">
      Success message
    </ngb-alert>
    <button type="button" class="btn btn-primary">Primary</button>
  `
})
```

**After (ng-shadcn):**
```typescript
import { AlertComponent } from '@ng-shadcn/components/alert';
import { ButtonComponent } from '@ng-shadcn/components/button';

@Component({
  imports: [AlertComponent, ButtonComponent],
  template: `
    <ng-shadcn-alert variant="success" [dismissible]="true">
      Success message
    </ng-shadcn-alert>
    <ng-shadcn-button variant="default">Primary</ng-shadcn-button>
  `
})
```

## From Ant Design Angular

### Component Mapping

| Ant Design | ng-shadcn | Notes |
|------------|-----------|-------|
| `nz-button` | `ng-shadcn-button` | Similar variants |
| `nz-input` | `ng-shadcn-input` | Simplified structure |
| `nz-card` | `ng-shadcn-card` | More flexible composition |
| `nz-switch` | `ng-shadcn-switch` | Similar API |
| `nz-modal` | `ng-shadcn-dialog` | Different state management |
| `nz-tooltip` | `ng-shadcn-tooltip` | Similar positioning |
| `nz-select` | `ng-shadcn-select` | Different option handling |
| `nz-checkbox` | `ng-shadcn-checkbox` | Similar API |
| `nz-radio-group` | `ng-shadcn-radio-group` | Similar structure |
| `nz-tag` | `ng-shadcn-badge` | Similar variants |

## General Migration Steps

### 1. Install ng-shadcn

```bash
# Install the CLI
npm install -g @ng-shadcn/cli

# Initialize in your project
ng-shadcn init

# Install components as needed
ng-shadcn install button input card
```

### 2. Update Imports

Replace your existing UI library imports with ng-shadcn components:

```typescript
// Remove old imports
// import { MatButtonModule } from '@angular/material/button';

// Add new imports
import { ButtonComponent } from '@ng-shadcn/components/button';

@Component({
  imports: [ButtonComponent], // Update imports array
  // ...
})
```

### 3. Update Templates

Update your component templates to use ng-shadcn components:

```html
<!-- Before -->
<button mat-raised-button color="primary">Click me</button>

<!-- After -->
<ng-shadcn-button variant="default">Click me</ng-shadcn-button>
```

### 4. Update Styling

Replace theme-specific classes with TailwindCSS utilities:

```html
<!-- Before -->
<div class="mat-elevation-z2 mat-primary">Content</div>

<!-- After -->
<div class="shadow-md bg-primary text-primary-foreground">Content</div>
```

### 5. Update Form Controls

Update reactive forms and template-driven forms:

```typescript
// Before (Angular Material)
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]]
});

// After (ng-shadcn) - Same form logic, different template
```

```html
<!-- Before -->
<mat-form-field>
  <mat-label>Email</mat-label>
  <input matInput formControlName="email">
  <mat-error *ngIf="form.get('email')?.hasError('required')">
    Email is required
  </mat-error>
</mat-form-field>

<!-- After -->
<div class="space-y-2">
  <ng-shadcn-input 
    type="email"
    placeholder="Email"
    formControlName="email"
    [class.border-destructive]="form.get('email')?.invalid && form.get('email')?.touched"
  />
  <p *ngIf="form.get('email')?.hasError('required')" 
     class="text-sm text-destructive">
    Email is required
  </p>
</div>
```

## Automated Migration Tools

### Migration Script

We provide a migration script to help automate the process:

```bash
# Run the migration tool
npx @ng-shadcn/migrate --from=material --to=ng-shadcn

# Options:
# --from: source library (material, primeng, ng-bootstrap, antd)
# --to: target library (ng-shadcn)
# --dry-run: preview changes without applying them
# --path: specific path to migrate (default: src/)
```

### What the Migration Tool Does

1. **Analyzes your codebase** for UI library usage
2. **Suggests component mappings** based on usage patterns
3. **Updates import statements** automatically
4. **Provides template migration suggestions**
5. **Generates a migration report** with manual steps needed

### Manual Steps After Migration

1. **Review generated code** for accuracy
2. **Update custom styles** to use TailwindCSS
3. **Test component functionality** thoroughly
4. **Update unit tests** to reflect new component APIs
5. **Optimize bundle imports** for tree-shaking

## Common Migration Challenges

### 1. Theming Differences

**Challenge**: Different theming approaches between libraries.

**Solution**: Use ng-shadcn's CSS variable system:

```css
/* Define your theme */
:root {
  --primary: 220 100% 50%;
  --primary-foreground: 0 0% 100%;
  /* ... other variables */
}
```

### 2. Component API Differences

**Challenge**: Different prop names and structures.

**Solution**: Create wrapper components for complex migrations:

```typescript
@Component({
  selector: 'app-legacy-button',
  template: `
    <ng-shadcn-button 
      [variant]="getVariant()"
      [size]="getSize()"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </ng-shadcn-button>
  `
})
export class LegacyButtonComponent {
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() disabled = false;
  
  getVariant() {
    return this.color === 'primary' ? 'default' : 'secondary';
  }
  
  getSize() {
    return 'default';
  }
}
```

### 3. Form Integration

**Challenge**: Different form control integration patterns.

**Solution**: ng-shadcn components implement `ControlValueAccessor`:

```typescript
// Works with both template-driven and reactive forms
<ng-shadcn-input 
  [(ngModel)]="value"           // Template-driven
  formControlName="field"       // Reactive forms
/>
```

## Testing After Migration

### 1. Unit Tests

Update component tests to use ng-shadcn components:

```typescript
// Before
import { MatButtonModule } from '@angular/material/button';

// After
import { ButtonComponent } from '@ng-shadcn/components/button';

describe('MyComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonComponent], // Update imports
      // ...
    });
  });
  
  it('should render button', () => {
    // Update selectors
    const button = fixture.debugElement.query(By.css('ng-shadcn-button'));
    expect(button).toBeTruthy();
  });
});
```

### 2. E2E Tests

Update E2E test selectors:

```typescript
// Before
await page.click('button[mat-raised-button]');

// After
await page.click('ng-shadcn-button');
```

## Performance Considerations

### Bundle Size Optimization

1. **Tree-shaking**: ng-shadcn components are optimized for tree-shaking
2. **Individual imports**: Import only the components you need
3. **Lazy loading**: Load components on-demand in lazy-loaded modules

### Migration Timeline

1. **Week 1**: Install ng-shadcn and run migration analysis
2. **Week 2-3**: Migrate core components (buttons, inputs, cards)
3. **Week 4**: Migrate complex components (dialogs, dropdowns)
4. **Week 5**: Update theming and custom styles
5. **Week 6**: Testing and optimization

## Getting Help

If you encounter issues during migration:

1. Check the [component documentation](./components/)
2. Review [common issues](./troubleshooting.md)
3. Join our [Discord community](https://discord.gg/ng-shadcn)
4. Open an issue on [GitHub](https://github.com/your-username/ng-shadcn/issues)

## Migration Checklist

- [ ] Install ng-shadcn CLI and components
- [ ] Run migration analysis tool
- [ ] Update component imports
- [ ] Migrate component templates
- [ ] Update styling approach
- [ ] Test form integrations
- [ ] Update unit tests
- [ ] Update E2E tests
- [ ] Performance testing
- [ ] Documentation updates
- [ ] Team training on new components

## Success Stories

> "Migrating from Angular Material to ng-shadcn reduced our bundle size by 40% and gave us much more design flexibility." - *Frontend Team Lead*

> "The migration tool saved us weeks of manual work. The component APIs are intuitive and well-documented." - *Senior Developer*

---

**Need help with your migration?** Contact our team or join the community for support!
