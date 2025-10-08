import { ButtonComponent } from './button.component';

export const ButtonMeta = {
  name: 'button',
  description: 'A customizable button component with multiple variants and sizes',
  component: ButtonComponent,
  usage: `
    <!-- Basic usage -->
    <ng-shadcn-button>Click me</ng-shadcn-button>
    
    <!-- With variants -->
    <ng-shadcn-button variant="secondary">Secondary</ng-shadcn-button>
    <ng-shadcn-button variant="destructive">Delete</ng-shadcn-button>
    
    <!-- With sizes -->
    <ng-shadcn-button size="sm">Small</ng-shadcn-button>
    <ng-shadcn-button size="lg">Large</ng-shadcn-button>
    
    <!-- With click handler -->
    <ng-shadcn-button (clicked)="handleClick($event)">Click me</ng-shadcn-button>
  `,
  variants: [
    { name: 'default', description: 'Primary button style' },
    { name: 'secondary', description: 'Secondary button style' }, 
    { name: 'destructive', description: 'Destructive/danger button style' },
    { name: 'outline', description: 'Outlined button style' },
    { name: 'ghost', description: 'Ghost button style' },
    { name: 'link', description: 'Link button style' },
  ],
  sizes: [
    { name: 'sm', description: 'Small button' },
    { name: 'default', description: 'Default size button' },
    { name: 'lg', description: 'Large button' },
    { name: 'icon', description: 'Icon-only button' },
  ],
};