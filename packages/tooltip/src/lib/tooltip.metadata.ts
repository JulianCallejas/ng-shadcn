import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

export const TooltipMeta = {
  name: 'tooltip',
  description: 'A tooltip component for displaying contextual information on hover',
  component: TooltipComponent,
  directive: TooltipDirective,
  usage: `
    <!-- Using directive (recommended) -->
    <button ngShadcnTooltip="This is a tooltip">Hover me</button>
    
    <!-- With position -->
    <button 
      ngShadcnTooltip="Tooltip content" 
      tooltipPosition="right"
    >
      Hover me
    </button>
    
    <!-- With custom delay -->
    <button 
      ngShadcnTooltip="Delayed tooltip" 
      [tooltipDelay]="1000"
    >
      Hover me
    </button>
  `,
  positions: [
    { name: 'top', description: 'Show tooltip above element' },
    { name: 'bottom', description: 'Show tooltip below element' },
    { name: 'left', description: 'Show tooltip to the left' },
    { name: 'right', description: 'Show tooltip to the right' },
  ],
};