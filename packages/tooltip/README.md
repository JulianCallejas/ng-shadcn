# Tooltip Component

A tooltip component for displaying contextual information on hover or focus.

## Installation

```bash
npx ng-shadcn install tooltip
```

## Usage

Import the directive in your module or standalone component:

```typescript
import { TooltipDirective } from '@ng-shadcn/tooltip';

@Component({
  imports: [TooltipDirective],
  // ...
})
```

### Basic Usage

```html
<button ngShadcnTooltip="This is a helpful tooltip">
  Hover me
</button>
```

### Positioning

```html
<button ngShadcnTooltip="Top tooltip" tooltipPosition="top">Top</button>
<button ngShadcnTooltip="Right tooltip" tooltipPosition="right">Right</button>
<button ngShadcnTooltip="Bottom tooltip" tooltipPosition="bottom">Bottom</button>
<button ngShadcnTooltip="Left tooltip" tooltipPosition="left">Left</button>
```

### Custom Delay

```html
<button 
  ngShadcnTooltip="This tooltip appears after 1 second" 
  [tooltipDelay]="1000"
>
  Slow tooltip
</button>
```

### Accessibility

The tooltip automatically appears on both hover and focus, making it accessible via keyboard navigation.

## API

### Directive Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ngShadcnTooltip | string | '' | Tooltip content |
| tooltipPosition | 'top' \| 'bottom' \| 'left' \| 'right' | 'top' | Tooltip position |
| tooltipDelay | number | 500 | Delay before showing (ms) |

## Accessibility

The tooltip component includes:
- Keyboard focus support
- ARIA attributes (`role="tooltip"`)
- Proper timing for screen readers
- Accessible color contrast