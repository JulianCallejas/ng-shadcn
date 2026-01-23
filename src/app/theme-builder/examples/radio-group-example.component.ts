import { Component, signal } from '@angular/core';
import { RadioGroupComponent, RadioOption } from '@packages/radio-group/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';

@Component({
  selector: 'app-radio-group-example',
  standalone: true,
  imports: [RadioGroupComponent, CardComponent],
  template: `
    <ng-shadcn-card>
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-4">Radio Groups</h2>
        <div class="grid gap-6">
          <div>
            <h3 class="text-lg font-medium mb-2">Vertical Layout</h3>
            <ng-shadcn-radio-group
              [options]="radioOptions()"
              (selectionChange)="onRadioChange($event)">
            </ng-shadcn-radio-group>
          </div>
          <div>
            <h3 class="text-lg font-medium mb-2">Horizontal Layout</h3>
            <ng-shadcn-radio-group
              [options]="sizeOptions()"
              orientation="horizontal">
            </ng-shadcn-radio-group>
          </div>
        </div>
      </div>
    </ng-shadcn-card>
  `
})
export class RadioGroupExampleComponent {
  radioOptions = signal<RadioOption[]>([
    { value: 'basic', label: 'Basic Plan', description: 'Perfect for individuals' },
    { value: 'pro', label: 'Pro Plan', description: 'Best for growing teams' },
    { value: 'enterprise', label: 'Enterprise Plan', description: 'Advanced features for large organizations' }
  ]);

  sizeOptions = signal<RadioOption[]>([
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' }
  ]);

  onRadioChange(option: RadioOption) {
    console.log('Radio selected:', option);
  }
}
