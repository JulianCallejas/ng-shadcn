import { Component } from '@angular/core';
import { CheckboxComponent } from '@packages/checkbox/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';

@Component({
  selector: 'app-checkbox-example',
  standalone: true,
  imports: [CheckboxComponent, CardComponent],
  template: `
    <ng-shadcn-card>
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-4">Checkboxes</h2>
        <div class="flex flex-col gap-4">
          <ng-shadcn-checkbox (checkedChange)="onCheckboxChange($event)">
            <span slot="label">Accept terms and conditions</span>
            <span slot="description">You agree to our Terms of Service and Privacy Policy.</span>
          </ng-shadcn-checkbox>
          <ng-shadcn-checkbox [indeterminate]="true">
            <span slot="label">Select all items</span>
          </ng-shadcn-checkbox>
          <ng-shadcn-checkbox [disabled]="true">
            <span slot="label">Disabled checkbox</span>
          </ng-shadcn-checkbox>
        </div>
      </div>
    </ng-shadcn-card>
  `
})
export class CheckboxExampleComponent {
  onCheckboxChange(checked: boolean) {
    console.log('Checkbox checked:', checked);
  }
}
