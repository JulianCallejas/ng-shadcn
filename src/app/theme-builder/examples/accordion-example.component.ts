import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  AccordionComponent, 
  AccordionItemComponent,
  AccordionTriggerComponent,
  AccordionContentComponent
} from '@packages/accordion/src/public-api';

@Component({
  selector: 'app-accordion-example',
  standalone: true,
  imports: [
    CommonModule,
    AccordionComponent,
    AccordionItemComponent,
    AccordionTriggerComponent,
    AccordionContentComponent
  ],
  template: `
    <div class="space-y-4">
      <h2 class="text-2xl font-bold text-foreground mb-4">Accordion</h2>
      <div class="p-6 border rounded-lg bg-card">
        <ng-shadcn-accordion [expandedItems]="expandedItems">
          <ng-shadcn-accordion-item *ngFor="let item of items" [id]="item.id">
            <ng-shadcn-accordion-trigger (itemToggled)="toggleItems(item.id)">
              {{ item.title }}
            </ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content>
              <p class="text-muted-foreground">{{ item.content }}</p>
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>
          <ng-shadcn-accordion-item id="item-4">
            <ng-shadcn-accordion-trigger 
              class="text-red-800"
              [isExpanded]="expandedItems.includes('item-4')" 
              (itemToggled)="toggleItems('item-4')"
            >
              Custom Trigger exmaple
            </ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content [isExpanded]="expandedItems.includes('item-4')">
              <p class="text-muted-foreground">left text</p>
              <p class="text-center text-blue-800">center text</p>
              <p class="text-right text-amber-400">right text</p>
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>
        </ng-shadcn-accordion>
      </div>
      <div class="p-6 border rounded-lg bg-card">
        <ng-shadcn-accordion type="single">
          <ng-shadcn-accordion-item id="nc-item-1" >
            <ng-shadcn-accordion-trigger >
              Non-Controlled Item
            </ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content >
              This content should toggle automatically
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>
          <ng-shadcn-accordion-item id="nc-item-2" >
            <ng-shadcn-accordion-trigger >
              Non-Controlled Item 2
            </ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content >
              This content should toggle automatically
            </ng-shadcn-accordion-content>
          </ng-shadcn-accordion-item>
        </ng-shadcn-accordion>
      </div>
    </div>
  `,
  styles: []
})
export class AccordionExampleComponent {
  expandedItems: string[] = ['item-1'];
  
  items = [
    {
      id: 'item-1',
      title: 'What is ng-shadcn?',
      content: 'ng-shadcn is a collection of reusable components built with Angular and styled with Tailwind CSS.'
    },
    {
      id: 'item-2',
      title: 'How to install?',
      content: 'You can install ng-shadcn using your preferred package manager: npm, yarn, or pnpm.'
    },
    {
      id: 'item-3',
      title: 'Is it customizable?',
      content: 'Yes, all components are fully customizable. You can override styles and behavior as needed.'
    }
  ];

  toggleItems(value: string) {
    if (this.expandedItems.includes(value)) {
      this.expandedItems = this.expandedItems.filter(item => item !== value);
    } else {
      this.expandedItems = [...this.expandedItems, value];
    }
  }
 
}
