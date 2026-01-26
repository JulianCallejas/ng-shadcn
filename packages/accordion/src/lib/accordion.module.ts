import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { AccordionItemComponent } from './accordion-item.component';
import { AccordionTriggerComponent } from './accordion-trigger.component';
import { AccordionContentComponent } from './accordion-content.component';

/**
 * Module that provides all accordion components
 * 
 * @example
 * ```typescript
 * @NgModule({
 *   imports: [
 *     // ... other imports
 *     AccordionModule
 *   ]
 * })
 * export class YourModule { }
 * ```
 */
@NgModule({
  imports: [
    CommonModule,
    AccordionComponent,
    AccordionItemComponent,
    AccordionTriggerComponent,
    AccordionContentComponent
  ],
  exports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionTriggerComponent,
    AccordionContentComponent
  ]
})
export class AccordionModule { }
