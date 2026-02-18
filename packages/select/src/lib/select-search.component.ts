import { Component, computed, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select.component';

// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';


@Component({
  selector: 'ng-shadcn-select-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [],
  template: `
    <!-- Search input -->
    <div class="p-2">
      <input
        #searchInput
        type="text"
        [class]="computedClasses()"
        [placeholder]=" select.searchPlaceholder() || 'Search...'"
        [(ngModel)]="select.searchTerm"
        (input)="select.onSearch($event)"
        (keydown)="select.onSearchKeydown($event)"
      />
    </div>
  `,
})
export class SelectSearchComponent {

  /** @ignore */
  protected select = inject(SelectComponent);

  constructor(public elementRef: ElementRef) {}

  /** @ignore */
  computedClasses = computed(() => cn(
    'w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring',
    this.select.searchClass()
  ));

  

  
  
}
