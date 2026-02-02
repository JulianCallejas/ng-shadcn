import { 
  Component, 
  Input, 
  Output,
  EventEmitter, 
  ContentChild, 
  inject, 
  AfterContentInit, 
  DestroyRef,
  input,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionTriggerComponent } from './accordion-trigger.component';
import { AccordionContentComponent } from './accordion-content.component';
import { AccordionComponent } from './accordion.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Individual accordion item component
 */
@Component({
  selector: 'ng-shadcn-accordion-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  styles: `
  @keyframes accordion-down {
    from { 
      height: 0;
      overflow: hidden;
      grid-template-rows: 0fr;
    }
    to {
      height: var(--radix-accordion-content-height);
      overflow: hidden;
      grid-template-rows: 1fr;
    }
  }
  @keyframes accordion-up {
    0% { 
      height: var(--radix-accordion-content-height); 
      overflow: hidden;
      grid-template-rows: 1fr;
    }
    100% { 
      height: 0; 
      overflow: hidden;
      grid-template-rows: 0fr;
    }
  }
  .animate-accordion-down {
    display: grid;
    interpolate-size: allow-keywords;
    animation: accordion-down 0.2s ease-out forwards;
    
  }
  .animate-accordion-up {
    display: grid;
    interpolate-size: allow-keywords;
    animation: accordion-up 0.2s ease-out forwards;
    
  }
  `,
  template: `
    <div
      [class]="computedClasses()"
      [attr.data-state]="isExpanded ? 'open' : 'closed'"
      [attr.data-disabled]="disabled()">
      <ng-content select="ng-shadcn-accordion-trigger" 
        (itemToggled)="onItemToggled($event)">
      </ng-content>
      
      @if (isExpanded()) {
        <div  animate.enter="animate-accordion-down" animate.leave="animate-accordion-up">
          <div class="min-h-0 ">
            <ng-content select="ng-shadcn-accordion-content" ></ng-content>
          </div>
        </div>
      }
    </div>
  `,
})
export class AccordionItemComponent implements AfterContentInit {
 
  
  /**
   * Id of the accordion item. Must be unique within the accordion.
   */
  @Input({ required: true }) id = '';
  
  
  /**
   * Class name to be applied to the accordion item.
   * @default ''
   */
  class = input<string>('');
  
  
  /**
   * When true, the accordion item is disabled and cannot be toggled.
   * @default false
   */
  disabled = input<boolean>(false);
    
  
  /**
   * The trigger title component for this accordion item allows to toggle the accordion item.
   * It must be a direct child of the accordion item.
  */
  @ContentChild(AccordionTriggerComponent) trigger?: AccordionTriggerComponent;
 
 /**
  * The content component for this accordion item.
  * It must be a direct child of the accordion item.
 */
  @ContentChild(AccordionContentComponent) content?: AccordionContentComponent;


  /**
   * Event emitted when the accordion item is toggled.
   * Passes the id of the item that was toggled.
   */
  @Output() itemToggled = new EventEmitter<string>();

  /** @ignore */
  readonly isExpanded = computed(() => this.expandedItems().has(this.id));

  /** @ignore */
  private expandedItems = inject(AccordionComponent).expandedSet;
  
  /** @ignore */
  private destroyRef = inject(DestroyRef);

  /** @ignore */
  ngAfterContentInit() { 
    if (this.trigger) { 
      this.trigger.id = this.id;
      this.trigger.isExpanded = computed(() => this.isExpanded());
      this.trigger.disabled = computed(() => this.disabled());
      this.trigger.itemToggled
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(value => { 
          this.onItemToggled(value); 
        });
    } 
    if (this.content) { 
      this.content.id = this.id; 
      this.content.isExpanded = computed(() => this.isExpanded()); 
    }
  }

  /** @ignore */
  onItemToggled(id: string): void {
    if (!this.disabled()) {
      this.itemToggled.emit(id);
    }
  }

  /** @ignore */
  readonly computedClasses = computed(() => 
    cn(
      'border-b',
      this.class()
    )
  );
}
