import { Component, signal } from '@angular/core';
import { SelectComponent, SelectOption } from '@packages/select/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';

@Component({
  selector: 'app-select-example',
  standalone: true,
  imports: [SelectComponent, CardComponent],
  template: `
    <ng-shadcn-card>
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-4">Select</h2>
        <div class="grid gap-4 max-w-md">
          <ng-shadcn-select
            [options]="selectOptions()"
            placeholder="Choose a framework"
            (selectionChange)="onSelectChange($event)">
          </ng-shadcn-select>
          <ng-shadcn-select
            [options]="selectOptions()"
            [searchable]="true"
            placeholder="Searchable select">
          </ng-shadcn-select>
          <ng-shadcn-select
            [options]="selectOptions()"
            [disabled]="true"
            placeholder="Disabled select">
          </ng-shadcn-select>
        </div>
      </div>
    </ng-shadcn-card>
  `
})
export class SelectExampleComponent {
  selectOptions = signal<SelectOption[]>([
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' }
  ]);

  onSelectChange(option: SelectOption | null) {
    console.log('Selected:', option);
  }
}
