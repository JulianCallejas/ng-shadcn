import { 
  Component, 
  Input, 
  Output,
  EventEmitter, 
  booleanAttribute, 
  ContentChild, 
  effect, 
  inject, 
  AfterContentInit, 
  ChangeDetectorRef, 
  runInInjectionContext,
  OnInit,
  Injector,
  DestroyRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionTriggerComponent } from './accordion-trigger.component';
import { AccordionContentComponent } from './accordion-content.component';
import { AccordionComponent } from './accordion.component';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Individual accordion item component
 */
@Component({
  selector: 'ng-shadcn-accordion-item',
  standalone: true,
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
      [attr.data-disabled]="disabled">
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
export class AccordionItemComponent implements OnInit, AfterContentInit {
 
  @Input({ required: true }) id = '';
  @Input() class = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  
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

  @Output() itemToggled = new EventEmitter<string>();

  /** @ignore */
  readonly isExpanded = signal(false);

  /** @ignore */
  private expandedItems = inject(AccordionComponent).expandedSet;

  /** @ignore */private injector = inject(Injector);

  /** @ignore */
  private destroyRef = inject(DestroyRef); // ¡IMPORTANTE!

  /** @ignore */
  private cdr = inject(ChangeDetectorRef);


  constructor() { 
    effect(() => {
      const isExpanded = this.expandedItems().has(this.id);
      this.isExpanded.set(isExpanded);

      this.trigger?.isExpanded.set(isExpanded);
      this.content?.isExpanded.set(isExpanded);;
    });
  }



  /** @ignore */
  ngOnInit() {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.updateExpandedState();
      });
    });
  }

  /** @ignore */
  ngAfterContentInit() { 
    this.updateExpandedState();
    
    if (this.trigger) { 
      this.trigger.id = this.id;
      // this.trigger.isExpanded = this.isExpanded();
      this.trigger.isExpanded.set(this.isExpanded());
      this.trigger.itemToggled
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(value => { 
          this.onItemToggled(value); 
        });
    } 
    if (this.content) { 
      this.content.id = this.id; 
      // this.content.isExpanded = this.isExpanded(); 
      this.content.isExpanded.set(this.isExpanded()); 
    }

  }

  /** @ignore */
  private updateExpandedState(): void {
    const isExpanded = this.expandedItems().has(this.id);
    this.isExpanded.update(() => isExpanded);
    if (this.trigger) this.trigger.isExpanded.set(isExpanded);
    if (this.content) this.content.isExpanded.set(isExpanded);
    this.cdr.markForCheck();
  }

  /** @ignore */
  onItemToggled(id: string): void {
    if (!this.disabled) {
      this.itemToggled.emit(id);
    }
  }

  /** @ignore */
  computedClasses(): string {
    return cn(
      'border-b',
      this.class
    );
  }
}