import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  TabsComponent,
  TabTriggerComponent,
  TabContentComponent,
  TabListComponent
} from '@packages/tabs/src/public-api';

interface TabItem {
  id: string;
  label: string;
  icon?: string;
  content: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs-example',
  standalone: true,
  imports: [
    CommonModule,
    TabsComponent,
    TabTriggerComponent,
    TabContentComponent,
    TabListComponent
  ],
  template: `
    <div class="space-y-4">
      <h2 class="text-2xl font-bold text-foreground mb-4">Tabs</h2>
      
      <div class="p-6 border rounded-lg bg-card">
        <div class="space-y-6">
          <p class="text-muted-foreground">
            Tabs organize content into multiple sections that can be switched between.
          </p>
          
          <!-- Basic Tabs -->
          <div class="space-y-4">
            <h3 class="font-semibold">Basic Tabs</h3>
            <ng-shadcn-tabs [value]="activeTab()" (valueChange)="onTabChange($event)">
              <ng-shadcn-tab-list class="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                <ng-container *ngFor="let tab of tabs">
                  <ng-shadcn-tab-trigger 
                    [value]="tab.id" 
                    [disabled]="tab.disabled"
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                    <span *ngIf="tab.icon" class="mr-2">{{ tab.icon }}</span>
                    {{ tab.label }}
                  </ng-shadcn-tab-trigger>
                </ng-container>
              </ng-shadcn-tab-list>
              
              <div class="mt-4">
                <ng-container *ngFor="let tab of tabs">
                  <ng-shadcn-tab-content [value]="tab.id" class="mt-2">
                    <div class="p-4 border rounded-lg bg-background">
                      <h4 class="font-semibold mb-2">{{ tab.label }}</h4>
                      <p class="text-muted-foreground">
                        {{ tab.content }}
                      </p>
                    </div>
                  </ng-shadcn-tab-content>
                </ng-container>
              </div>
            </ng-shadcn-tabs>
          </div>
          
          <!-- Vertical Tabs -->
          <div class="space-y-4">
            <h3 class="font-semibold">Vertical Tabs</h3>
            <div class="flex">
              <ng-shadcn-tabs [value]="activeVerticalTab()" (valueChange)="onVerticalTabChange($event)" orientation="vertical" class="flex-1 flex space-x-4">
                <!-- Tabs List -->
                <ng-shadcn-tab-list class="w-48 shrink-0 space-y-1">
                  <ng-container *ngFor="let tab of verticalTabs">
                    <ng-shadcn-tab-trigger 
                      [value]="tab.id" 
                      [disabled]="tab.disabled"
                      class="w-full justify-start">
                      <span *ngIf="tab.icon" class="mr-2">{{ tab.icon }}</span>
                      {{ tab.label }}
                    </ng-shadcn-tab-trigger>
                  </ng-container>
                </ng-shadcn-tab-list>
                
                <!-- Tab Panels -->
                <div class="flex-1">
                  <ng-container *ngFor="let tab of verticalTabs">
                    <ng-shadcn-tab-content [value]="tab.id" class="h-full">
                      <div class="p-6 border rounded-lg bg-background h-full">
                        <h4 class="font-semibold text-lg mb-3">{{ tab.label }}</h4>
                        <div class="space-y-3">
                          <p class="text-muted-foreground">
                            {{ tab.content }}
                          </p>
                          <p class="text-sm text-muted-foreground">
                            This is additional content in the {{ tab.label.toLowerCase() }} tab.
                          </p>
                        </div>
                      </div>
                    </ng-shadcn-tab-content>
                  </ng-container>
                </div>
              </ng-shadcn-tabs>
            </div>
          </div>
          
          <div class="mt-4 p-4 bg-muted/20 rounded-md">
            <p class="text-sm text-muted-foreground">
              <strong>Tip:</strong> Tabs can be navigated using keyboard arrow keys.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TabsExampleComponent {
  // Basic tabs
  activeTab = signal('account');
  tabs: TabItem[] = [
    { 
      id: 'account', 
      label: 'Account',
      icon: '👤',
      content: 'Manage your account settings and set email preferences.'
    },
    { 
      id: 'notifications', 
      label: 'Notifications',
      icon: '🔔',
      content: 'Configure how you receive notifications.'
    },
    { 
      id: 'billing', 
      label: 'Billing',
      icon: '💳',
      content: 'Manage billing and view payment history.'
    },
    { 
      id: 'team', 
      label: 'Team',
      icon: '👥',
      content: 'Manage team members and their permissions.',
      disabled: true
    }
  ];
  
  // Vertical tabs
  activeVerticalTab = signal('profile');
  verticalTabs: TabItem[] = [
    { 
      id: 'profile', 
      label: 'Profile',
      icon: '👤',
      content: 'Update your profile information and settings.'
    },
    { 
      id: 'security', 
      label: 'Security',
      icon: '🔒',
      content: 'Change your password and manage security settings.'
    },
    { 
      id: 'privacy', 
      label: 'Privacy',
      icon: '👁️',
      content: 'Control your privacy settings and data sharing preferences.'
    },
    { 
      id: 'integrations', 
      label: 'Integrations',
      icon: '🔌',
      content: 'Connect with third-party services and applications.'
    }
  ];

  onTabChange(tabId: string): void {
    this.activeTab.set(tabId);
  }

  onVerticalTabChange(tabId: string): void {
    this.activeVerticalTab.set(tabId);
  }

  isTabActive(tabId: string): boolean {
    return this.activeTab() === tabId;
  }
}
