import { Component, computed, ElementRef, input, booleanAttribute, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent, SelectOption } from './select.component';

// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

@Component({
  selector: 'ng-shadcn-select-item',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  template: `
    @if(show()){
      <div
        [class]="computedClasses()"
        [class.bg-accent]="isHighlighted() || false"
        [class.text-accent-foreground]="isHighlighted() || false"
        [class.opacity-50]="isDisabled()"
        [class.cursor-not-allowed]="isDisabled()"
        (click)="selectOption()"
        role="option"
        [attr.aria-highlighted]="isHighlighted()"
        [attr.aria-selected]="isSelected()"
        [attr.aria-disabled]="isDisabled()"
        [id]="itemData().value"
      >
        <span class="block truncate">{{ itemData().label }}</span>
        @if (isSelected()){
          <svg
            class="absolute right-2 top-2.5 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        }
      </div>
    }

  `,
})
export class SelectItemComponent {

  class = input('')
  disabled = input(false, { transform: booleanAttribute });
  option = input<SelectOption | null>(null);
  label = input('')
  value = input('')
  // index = input<number>(-2)
  
  /** @ignore */
  itemData = computed(()=>{
    if (this.option()) return this.option();
    return {
      label: this.label(),
      value: this.value(),
      disabled: this.disabled(),
    }
  })

  /** @ignore */
  elementRef = inject(ElementRef<HTMLElement>);

  /** @ignore */
  private select = inject(SelectComponent);
  
  /** @ignore */
  isHighlighted = computed(() =>{
    const isHighlighted = this.select.highlightedItem() === this.itemData();
    if (isHighlighted) this.scrollIntoView();
    return isHighlighted;
  });
    
  /** @ignore */
  isSelected = computed(() =>
    this.select.value() === this.itemData().value
  );
  
  /** @ignore */
  isDisabled = computed(()=>{
    if (this.disabled() || this.option()?.disabled) return true;
    return false;
  })

  /** @ignore */
  selectOption() {
    if (this.isDisabled()) return;
    this.select.selectOption(this.itemData())
  }

  /** @ignore */
  index = computed(()=> 
    this.select.itemIndexMap().get(this.itemData().value) ?? -1
  );
  
  /** @ignore */
  show = computed(() => {
    return this.select.itemIndexMap().get(this.itemData().value) !== undefined;
  });

  /** @ignore */
  scrollIntoView() {
    this.elementRef.nativeElement.scrollIntoView({
      block: 'nearest'
    });
  }

/** @ignore */
  computedClasses = computed(() => cn(
    'relative cursor-pointer select-none py-2 px-3 text-sm hover:bg-accent hover:text-accent-foreground',
    this.class()
  ));
  
  
}
