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
        <ng-shadcn-accordion>
          <ng-shadcn-accordion-item *ngFor="let item of items" [value]="item.value">
            <ng-shadcn-accordion-trigger [isExpanded]="expandedItems.includes(item.value)" (itemToggled)="toggleItem(item.value)" class="w-full text-left p-4 hover:bg-accent/50 transition-colors">
              {{ item.title }}
            </ng-shadcn-accordion-trigger>
            <ng-shadcn-accordion-content [isExpanded]="expandedItems.includes(item.value)" class="p-4 pt-0">
              <p class="text-muted-foreground">{{ item.content }}</p>
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
      value: 'item-1',
      title: 'What is ng-shadcn?',
      content: 'ng-shadcn is a collection of reusable components built with Angular and styled with Tailwind CSS.'
    },
    {
      value: 'item-2',
      title: 'How to install?',
      content: 'You can install ng-shadcn using your preferred package manager: npm, yarn, or pnpm.'
    },
    {
      value: 'item-3',
      title: 'Is it customizable?',
      content: 'Yes, all components are fully customizable. You can override styles and behavior as needed.'
    }
  ];

  toggleItem(value: string) {
    if (this.expandedItems.includes(value)) {
      this.expandedItems = this.expandedItems.filter(item => item !== value);
    } else {
      this.expandedItems = [...this.expandedItems, value];
    }
  }
}
