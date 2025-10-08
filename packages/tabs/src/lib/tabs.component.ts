import { Component, Input, Output, EventEmitter, signal, computed, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Tab item interface
 */
export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
  content?: string;
}

/**
 * Individual tab content component
 */
@Component({
  selector: 'ng-shadcn-tab-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="computedClasses"
      [attr.data-state]="isActive ? 'active' : 'inactive'"
      [attr.data-orientation]="orientation"
      role="tabpanel"
      [attr.aria-labelledby]="tabId"
      [attr.id]="contentId"
      [hidden]="!isActive">
      <ng-content></ng-content>
    </div>
  `,
})
export class TabContentComponent {
  @Input() value = '';
  @Input() className = '';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() isActive = false;

  get tabId(): string {
    return `tab-${this.value}`;
  }

  get contentId(): string {
    return `content-${this.value}`;
  }

  get computedClasses(): string {
    const baseClasses = 'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
    return `${baseClasses} ${this.className}`;
  }
}

/**
 * Individual tab trigger component
 */
@Component({
  selector: 'ng-shadcn-tab-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="computedClasses"
      [attr.data-state]="isActive ? 'active' : 'inactive'"
      [attr.data-orientation]="orientation"
      [disabled]="disabled"
      role="tab"
      [attr.aria-selected]="isActive"
      [attr.aria-controls]="contentId"
      [attr.id]="tabId"
      [attr.tabindex]="isActive ? 0 : -1"
      (click)="handleClick()"
      (keydown)="handleKeyDown($event)">
      <ng-content></ng-content>
    </button>
  `,
})
export class TabTriggerComponent {
  @Input() value = '';
  @Input() className = '';
  @Input() disabled = false;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() isActive = false;

  @Output() tabSelected = new EventEmitter<string>();

  get tabId(): string {
    return `tab-${this.value}`;
  }

  get contentId(): string {
    return `content-${this.value}`;
  }

  get computedClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    const stateClasses = this.isActive 
      ? 'bg-background text-foreground shadow-sm' 
      : 'text-muted-foreground hover:text-foreground';
    
    return `${baseClasses} ${stateClasses} ${this.className}`;
  }

  handleClick(): void {
    if (!this.disabled) {
      this.tabSelected.emit(this.value);
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick();
    }
  }
}

/**
 * Tab list container component
 */
@Component({
  selector: 'ng-shadcn-tab-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="computedClasses"
      [attr.data-orientation]="orientation"
      role="tablist"
      [attr.aria-orientation]="orientation">
      <ng-content></ng-content>
    </div>
  `,
})
export class TabListComponent {
  @Input() className = '';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

  get computedClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground';
    const orientationClasses = this.orientation === 'vertical' 
      ? 'flex-col h-auto' 
      : 'h-10';
    
    return `${baseClasses} ${orientationClasses} ${this.className}`;
  }
}

/**
 * Main tabs container component
 */
@Component({
  selector: 'ng-shadcn-tabs',
  standalone: true,
  imports: [CommonModule, TabListComponent, TabTriggerComponent, TabContentComponent],
  template: `
    <div
      [class]="computedClasses"
      [attr.data-orientation]="orientation">
      <ng-content></ng-content>
    </div>
  `,
})
export class TabsComponent implements AfterContentInit {
  @Input() defaultValue = '';
  @Input() value = '';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() className = '';

  @Output() valueChange = new EventEmitter<string>();

  @ContentChildren(TabTriggerComponent) tabTriggers!: QueryList<TabTriggerComponent>;
  @ContentChildren(TabContentComponent) tabContents!: QueryList<TabContentComponent>;

  private activeValue = signal('');

  // Computed property for active tab
  activeTab = computed(() => this.activeValue());

  ngAfterContentInit(): void {
    // Set initial active value
    const initialValue = this.value || this.defaultValue;
    if (initialValue) {
      this.setActiveTab(initialValue);
    } else if (this.tabTriggers.length > 0) {
      // Default to first non-disabled tab
      const firstEnabledTab = this.tabTriggers.find(tab => !tab.disabled);
      if (firstEnabledTab) {
        this.setActiveTab(firstEnabledTab.value);
      }
    }

    // Subscribe to tab trigger selections
    this.tabTriggers.forEach(trigger => {
      trigger.tabSelected.subscribe(value => {
        this.setActiveTab(value);
      });
    });

    // Update trigger and content states
    this.updateTabStates();
  }

  ngOnChanges(): void {
    if (this.value) {
      this.setActiveTab(this.value);
    }
  }

  private setActiveTab(value: string): void {
    this.activeValue.set(value);
    this.valueChange.emit(value);
    this.updateTabStates();
  }

  private updateTabStates(): void {
    const activeValue = this.activeValue();

    // Update trigger states
    this.tabTriggers?.forEach(trigger => {
      trigger.isActive = trigger.value === activeValue;
      trigger.orientation = this.orientation;
    });

    // Update content states
    this.tabContents?.forEach(content => {
      content.isActive = content.value === activeValue;
      content.orientation = this.orientation;
    });
  }

  get computedClasses(): string {
    const baseClasses = 'w-full';
    const orientationClasses = this.orientation === 'vertical' 
      ? 'flex gap-4' 
      : '';
    
    return `${baseClasses} ${orientationClasses} ${this.className}`;
  }
}
