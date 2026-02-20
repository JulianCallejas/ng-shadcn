import { Component, signal } from '@angular/core';
import { SelectComponent, SelectOption, SelectTriggerComponent, SelectItemComponent } from '@packages/select/src/public-api';
import { CardComponent } from '@packages/card/src/public-api';

@Component({
  selector: 'app-select-example',
  standalone: true,
  imports: [SelectComponent, CardComponent, SelectTriggerComponent, SelectItemComponent],
  template: `
    <ng-shadcn-card>
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-4">Select</h2>
        <div class="grid gap-4 max-w-md">
          <ng-shadcn-select
            [options]="selectOptions()"
            (selectionChange)="onSelectChange($event)">
            <ng-shadcn-select-trigger placeholder="Seleccione..."></ng-shadcn-select-trigger>
          </ng-shadcn-select>
          <ng-shadcn-select
            [options]="selectOptions()"
            [searchable]="true"
            (selectionChange)="onSelectChange2($event)"
            searchPlaceholder="Buscar..."
            searchClass="[border:2px_solid_transparent] [padding-box,_linear-gradient(to_right,_blue,_green)_border-box]"
          >
            <ng-shadcn-select-trigger asChild>
              <button>{{ selectedOption()?.label || 'Prueba...' }}</button>
            </ng-shadcn-select-trigger>
            <ng-shadcn-select-item label="Laravel2" value="laravel"></ng-shadcn-select-item>
            <ng-shadcn-select-item label="Laravel22" value="laravel2"></ng-shadcn-select-item>
            <ng-shadcn-select-item label="Laravel23" value="laravel3"></ng-shadcn-select-item>
          </ng-shadcn-select>

          <ng-shadcn-select
            [options]="selectOptions()"
            (selectionChange)="onSelectChange($event)"
            [value]="simpleValue"
            (valueChange)="onSelectChangeSimple($event)"
          >
            <ng-shadcn-select-trigger placeholder="Choose simple binding"></ng-shadcn-select-trigger>
            <ng-shadcn-select-item label="Laravel" value="laravel" class="bg-red-500 aria-highlighted:bg-red-100"></ng-shadcn-select-item>
            <ng-shadcn-select-item label="Laravel22" value="laravel2" class="bg-blue-500 aria-highlighted:bg-blue-100"></ng-shadcn-select-item>
            <ng-shadcn-select-item label="Laravel23" value="laravel3" class="bg-green-500 aria-highlighted:bg-green-100"></ng-shadcn-select-item>
            <ng-shadcn-select-item label="Laravel24" value="laravel4" class="bg-yellow-500 aria-highlighted:bg-yellow-100"></ng-shadcn-select-item>
          </ng-shadcn-select>
          
          <ng-shadcn-select
            [options]="selectOptions()"
            (selectionChange)="onSelectChange($event)"
            [(value)]="signalValue"
          >
            <ng-shadcn-select-trigger placeholder="Choose signal binding"></ng-shadcn-select-trigger>
            <ng-shadcn-select-item label="Laravel" value="laravel"></ng-shadcn-select-item>
            <ng-shadcn-select-item label="Laravel2" value="laravel2"></ng-shadcn-select-item>
            <ng-shadcn-select-item label="Laravel3" value="laravel3"></ng-shadcn-select-item>
          </ng-shadcn-select>
          
          <p>simple value: {{simpleValue}}</p>
          <p>signal value: {{signalValue()}}</p>


          <ng-shadcn-select
            [options]="selectOptions()"
            [disabled]="true"
            placeholder="Disabled select"
          >
           <ng-shadcn-select-trigger/>

           
          </ng-shadcn-select>
        </div>
      </div>
    </ng-shadcn-card>
  `
})
export class SelectExampleComponent {
  selectOptions = signal<SelectOption[]>([
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js', },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte', disabled: true },
    { value: 'nextjs', label: 'Next.js' },
  ]);

  signalValue = signal('laravel2')

  simpleValue = 'angular'

  onSelectChange(option: SelectOption | null) {
    console.log('Selected:', option);
  }
  
  onSelectChangeSimple(event: string) {
    this.simpleValue = event
  }

  selectedOption = signal<SelectOption | null>(null);
  onSelectChange2(option: SelectOption | null) {
    this.selectedOption.set(option);
  }


}
