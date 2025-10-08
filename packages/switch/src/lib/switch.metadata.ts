import { SwitchComponent } from './switch.component';

export const SwitchMeta = {
  name: 'switch',
  description: 'A toggle switch component for binary choices',
  component: SwitchComponent,
  usage: `
    <!-- Basic usage -->
    <ng-shadcn-switch></ng-shadcn-switch>
    
    <!-- With initial value -->
    <ng-shadcn-switch [checked]="true"></ng-shadcn-switch>
    
    <!-- With change handler -->
    <ng-shadcn-switch (checkedChange)="onToggle($event)"></ng-shadcn-switch>
    
    <!-- Two-way binding -->
    <ng-shadcn-switch [(ngModel)]="isEnabled"></ng-shadcn-switch>
    
    <!-- With label -->
    <div class="flex items-center space-x-2">
      <ng-shadcn-switch id="airplane-mode"></ng-shadcn-switch>
      <label for="airplane-mode">Airplane mode</label>
    </div>
  `,
};