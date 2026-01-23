import { Component, signal } from '@angular/core';
import { SwitchComponent } from '@packages/switch/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';

@Component({
  selector: 'app-switch-example',
  standalone: true,
  imports: [SwitchComponent, CardComponent],
  template: `
    <ng-shadcn-card>
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-4">Switches</h2>
        <div class="flex flex-col gap-4">
          <div class="flex items-center space-x-2">
            <ng-shadcn-switch id="switch1" [checked]="switchValue">
            </ng-shadcn-switch>
            <label for="switch1" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Enable notifications
            </label>
          </div>
          <div class="flex items-center space-x-2">
            <ng-shadcn-switch id="switch2" [disabled]="true"></ng-shadcn-switch>
            <label for="switch2" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Disabled switch
            </label>
          </div>
        </div>
      </div>
    </ng-shadcn-card>
  `
})
export class SwitchExampleComponent {
  switchValue = signal(false);
}
