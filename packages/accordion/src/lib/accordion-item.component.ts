import { Component, Input, Output, EventEmitter, booleanAttribute, ContentChild, effect, inject, AfterContentInit, ChangeDetectorRef, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionTriggerComponent } from './accordion-trigger.component';
import { AccordionContentComponent } from './accordion-content.component';
import { AccordionComponent } from './accordion.component';
// import { cn } from '@ng-shadcn/utils';
import { cn } from '@packages/utils/src/public-api';

/**
 * Individual accordion item component
 */
@Component({
  selector: 'ng-shadcn-accordion-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="computedClasses"
      [attr.data-state]="isExpanded ? 'open' : 'closed'"
      [attr.data-disabled]="disabled">
      <ng-content select="ng-shadcn-accordion-trigger" 
        (itemToggled)="onItemToggled($event)">
      </ng-content>
      <ng-content select="ng-shadcn-accordion-content"></ng-content>
    </div>
  `,
})
export class AccordionItemComponent implements AfterContentInit {
 
  @Input({ required: true }) id = '';
  @Input() class = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) isExpanded = false;
  @ContentChild(AccordionTriggerComponent) trigger?: AccordionTriggerComponent;
  @ContentChild(AccordionContentComponent) content?: AccordionContentComponent;
  
  /** @ignore */
  private expandedItems = inject(AccordionComponent).autoExpandedItems;

  @Output() itemToggled = new EventEmitter<string>();

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      this.updateExpandedState();
    }, { injector: inject(EnvironmentInjector) });
  }
  
  /** @ignore */
  ngAfterContentInit() { 
    this.updateExpandedState();
    
    if (this.trigger) { 
      this.trigger.id = this.id;
      this.trigger.isExpanded = this.isExpanded; 
      this.trigger.itemToggled.subscribe(value => { this.onItemToggled(value); })
    } 
    if (this.content) { 
      this.content.id = this.id; 
      this.content.isExpanded = this.isExpanded; 
    }

  }

  /** @ignore */
  private updateExpandedState(): void {
    const isExpanded = this.expandedItems().includes(this.id);
    this.isExpanded = isExpanded;
    
    // Update child components
    if (this.trigger) this.trigger.isExpanded = isExpanded;
    if (this.content) this.content.isExpanded = isExpanded;
    this.cdr.markForCheck();
  }

  /** @ignore */
  onItemToggled(id: string): void {
    if (!this.disabled) {
      this.itemToggled.emit(id);
    }
  }

  get computedClasses(): string {
    return cn(
      'border-b',
      this.class
    );
  }
}