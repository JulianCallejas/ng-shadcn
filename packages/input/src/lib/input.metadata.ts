import { InputComponent } from './input.component';

export const InputMeta = {
  name: 'input',
  description: 'A form input component with label and error support',
  component: InputComponent,
  usage: `
    <!-- Basic usage -->
    <ng-shadcn-input placeholder="Enter text"></ng-shadcn-input>
    
    <!-- With label -->
    <ng-shadcn-input label="Email" type="email" placeholder="Enter your email"></ng-shadcn-input>
    
    <!-- With error -->
    <ng-shadcn-input label="Username" error="Username is required"></ng-shadcn-input>
    
    <!-- Two-way binding -->
    <ng-shadcn-input [(ngModel)]="username" label="Username"></ng-shadcn-input>
  `,
  types: [
    { name: 'text', description: 'Text input' },
    { name: 'email', description: 'Email input' },
    { name: 'password', description: 'Password input' },
    { name: 'number', description: 'Number input' },
    { name: 'tel', description: 'Telephone input' },
    { name: 'url', description: 'URL input' },
  ],
};