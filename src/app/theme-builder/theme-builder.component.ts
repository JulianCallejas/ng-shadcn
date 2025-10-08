import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../packages/button/src/lib/button.component';
import { InputComponent } from '../../../packages/input/src/lib/input.component';
import { CardComponent } from '../../../packages/card/src/lib/card.component';
import { BadgeComponent } from '../../../packages/badge/src/lib/badge.component';
import { AlertComponent } from '../../../packages/alert/src/lib/alert.component';

interface ColorVariable {
  name: string;
  cssVar: string;
  value: string;
  description: string;
  category: 'background' | 'foreground' | 'accent' | 'semantic';
}

interface ThemeConfig {
  name: string;
  colors: Record<string, string>;
  radius: string;
  fontFamily: string;
}

@Component({
  selector: 'app-theme-builder',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    CardComponent,
    BadgeComponent,
    AlertComponent
  ],
  template: `
    <div class="min-h-screen bg-background p-8">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-foreground mb-2">Theme Builder</h1>
          <p class="text-muted-foreground">
            Create and customize your ng-shadcn theme with real-time preview
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Theme Configuration Panel -->
          <div class="lg:col-span-1">
            <ng-shadcn-card class="p-6">
              <h2 class="text-xl font-semibold mb-4">Theme Configuration</h2>
              
              <!-- Theme Name -->
              <div class="mb-6">
                <label class="block text-sm font-medium mb-2">Theme Name</label>
                <ng-shadcn-input
                  [(ngModel)]="themeName"
                  placeholder="My Custom Theme"
                  class="w-full"
                />
              </div>

              <!-- Color Variables -->
              <div class="space-y-6">
                @for (category of colorCategories; track category) {
                  <div>
                    <h3 class="font-medium mb-3 capitalize">{{ category }} Colors</h3>
                    <div class="space-y-3">
                      @for (colorVar of getColorsByCategory(category); track colorVar.name) {
                        <div class="flex items-center space-x-3">
                          <div class="flex-1">
                            <label class="block text-sm text-muted-foreground mb-1">
                              {{ colorVar.name }}
                            </label>
                            <ng-shadcn-input
                              [ngModel]="colorVar.value"
                              (ngModelChange)="updateColor(colorVar.cssVar, $event)"
                              placeholder="0 0% 100%"
                              class="w-full text-xs"
                            />
                          </div>
                          <div 
                            class="w-8 h-8 rounded border border-border"
                            [style.background-color]="'hsl(' + colorVar.value + ')'"
                          ></div>
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>

              <!-- Border Radius -->
              <div class="mt-6">
                <label class="block text-sm font-medium mb-2">Border Radius</label>
                <select 
                  [(ngModel)]="borderRadius"
                  (ngModelChange)="updateRadius($event)"
                  class="w-full p-2 border border-border rounded-md bg-background"
                >
                  <option value="0">None (0px)</option>
                  <option value="0.125rem">Small (2px)</option>
                  <option value="0.25rem">Default (4px)</option>
                  <option value="0.375rem">Medium (6px)</option>
                  <option value="0.5rem">Large (8px)</option>
                  <option value="0.75rem">Extra Large (12px)</option>
                  <option value="1rem">Round (16px)</option>
                </select>
              </div>

              <!-- Actions -->
              <div class="mt-8 space-y-3">
                <ng-shadcn-button 
                  (click)="exportTheme()"
                  class="w-full"
                  variant="default"
                >
                  Export Theme
                </ng-shadcn-button>
                
                <ng-shadcn-button 
                  (click)="resetTheme()"
                  class="w-full"
                  variant="outline"
                >
                  Reset to Default
                </ng-shadcn-button>
                
                <ng-shadcn-button 
                  (click)="loadPreset('dark')"
                  class="w-full"
                  variant="secondary"
                >
                  Load Dark Theme
                </ng-shadcn-button>
              </div>
            </ng-shadcn-card>
          </div>

          <!-- Preview Panel -->
          <div class="lg:col-span-2">
            <ng-shadcn-card class="p-6">
              <h2 class="text-xl font-semibold mb-4">Live Preview</h2>
              
              <div class="space-y-6">
                <!-- Typography Preview -->
                <div>
                  <h3 class="font-medium mb-3">Typography</h3>
                  <div class="space-y-2">
                    <h1 class="text-3xl font-bold text-foreground">Heading 1</h1>
                    <h2 class="text-2xl font-semibold text-foreground">Heading 2</h2>
                    <h3 class="text-xl font-medium text-foreground">Heading 3</h3>
                    <p class="text-foreground">Regular paragraph text with normal weight.</p>
                    <p class="text-muted-foreground">Muted text for secondary information.</p>
                  </div>
                </div>

                <!-- Button Variants -->
                <div>
                  <h3 class="font-medium mb-3">Buttons</h3>
                  <div class="flex flex-wrap gap-3">
                    <ng-shadcn-button variant="default">Default</ng-shadcn-button>
                    <ng-shadcn-button variant="secondary">Secondary</ng-shadcn-button>
                    <ng-shadcn-button variant="outline">Outline</ng-shadcn-button>
                    <ng-shadcn-button variant="ghost">Ghost</ng-shadcn-button>
                    <ng-shadcn-button variant="destructive">Destructive</ng-shadcn-button>
                  </div>
                </div>

                <!-- Form Elements -->
                <div>
                  <h3 class="font-medium mb-3">Form Elements</h3>
                  <div class="space-y-3 max-w-md">
                    <ng-shadcn-input placeholder="Enter your name" />
                    <ng-shadcn-input type="email" placeholder="Enter your email" />
                    <ng-shadcn-input type="password" placeholder="Enter password" />
                  </div>
                </div>

                <!-- Cards -->
                <div>
                  <h3 class="font-medium mb-3">Cards</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ng-shadcn-card class="p-4">
                      <h4 class="font-semibold mb-2">Card Title</h4>
                      <p class="text-muted-foreground text-sm">
                        This is a sample card with some content to demonstrate the theme.
                      </p>
                    </ng-shadcn-card>
                    
                    <ng-shadcn-card class="p-4 border-2">
                      <h4 class="font-semibold mb-2">Another Card</h4>
                      <p class="text-muted-foreground text-sm">
                        Cards adapt to your theme colors automatically.
                      </p>
                    </ng-shadcn-card>
                  </div>
                </div>

                <!-- Badges and Alerts -->
                <div>
                  <h3 class="font-medium mb-3">Status Elements</h3>
                  <div class="space-y-4">
                    <div class="flex flex-wrap gap-2">
                      <ng-shadcn-badge variant="default">Default</ng-shadcn-badge>
                      <ng-shadcn-badge variant="secondary">Secondary</ng-shadcn-badge>
                      <ng-shadcn-badge variant="outline">Outline</ng-shadcn-badge>
                      <ng-shadcn-badge variant="destructive">Destructive</ng-shadcn-badge>
                    </div>
                    
                    <ng-shadcn-alert variant="info">
                      <strong>Info:</strong> This is an informational alert.
                    </ng-shadcn-alert>
                    
                    <ng-shadcn-alert variant="warning">
                      <strong>Warning:</strong> This is a warning alert.
                    </ng-shadcn-alert>
                  </div>
                </div>
              </div>
            </ng-shadcn-card>
          </div>
        </div>

        <!-- Export Modal -->
        @if (showExportModal()) {
          <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <ng-shadcn-card class="w-full max-w-2xl max-h-[80vh] overflow-auto">
              <div class="p-6">
                <h3 class="text-lg font-semibold mb-4">Export Theme</h3>
                
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">CSS Variables</label>
                    <textarea
                      [value]="exportedCSS()"
                      readonly
                      class="w-full h-40 p-3 border border-border rounded-md bg-muted font-mono text-sm"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Theme Configuration (JSON)</label>
                    <textarea
                      [value]="exportedJSON()"
                      readonly
                      class="w-full h-32 p-3 border border-border rounded-md bg-muted font-mono text-sm"
                    ></textarea>
                  </div>
                </div>
                
                <div class="flex justify-end space-x-3 mt-6">
                  <ng-shadcn-button 
                    variant="outline"
                    (click)="showExportModal.set(false)"
                  >
                    Close
                  </ng-shadcn-button>
                  
                  <ng-shadcn-button 
                    (click)="copyToClipboard()"
                  >
                    Copy CSS
                  </ng-shadcn-button>
                </div>
              </div>
            </ng-shadcn-card>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ThemeBuilderComponent {
  themeName = signal('Custom Theme');
  borderRadius = signal('0.5rem');
  showExportModal = signal(false);

  colorCategories = ['background', 'foreground', 'accent', 'semantic'] as const;

  colorVariables = signal<ColorVariable[]>([
    // Background colors
    { name: 'Background', cssVar: '--background', value: '0 0% 100%', description: 'Main background', category: 'background' },
    { name: 'Card', cssVar: '--card', value: '0 0% 100%', description: 'Card background', category: 'background' },
    { name: 'Popover', cssVar: '--popover', value: '0 0% 100%', description: 'Popover background', category: 'background' },
    { name: 'Muted', cssVar: '--muted', value: '210 40% 96%', description: 'Muted background', category: 'background' },
    { name: 'Secondary', cssVar: '--secondary', value: '210 40% 96%', description: 'Secondary background', category: 'background' },
    { name: 'Accent', cssVar: '--accent', value: '210 40% 96%', description: 'Accent background', category: 'background' },

    // Foreground colors
    { name: 'Foreground', cssVar: '--foreground', value: '222.2 84% 4.9%', description: 'Main text', category: 'foreground' },
    { name: 'Card Foreground', cssVar: '--card-foreground', value: '222.2 84% 4.9%', description: 'Card text', category: 'foreground' },
    { name: 'Popover Foreground', cssVar: '--popover-foreground', value: '222.2 84% 4.9%', description: 'Popover text', category: 'foreground' },
    { name: 'Muted Foreground', cssVar: '--muted-foreground', value: '215.4 16.3% 46.9%', description: 'Muted text', category: 'foreground' },
    { name: 'Secondary Foreground', cssVar: '--secondary-foreground', value: '222.2 84% 4.9%', description: 'Secondary text', category: 'foreground' },
    { name: 'Accent Foreground', cssVar: '--accent-foreground', value: '222.2 84% 4.9%', description: 'Accent text', category: 'foreground' },

    // Accent colors
    { name: 'Primary', cssVar: '--primary', value: '222.2 47.4% 11.2%', description: 'Primary color', category: 'accent' },
    { name: 'Primary Foreground', cssVar: '--primary-foreground', value: '210 40% 98%', description: 'Primary text', category: 'accent' },
    { name: 'Border', cssVar: '--border', value: '214.3 31.8% 91.4%', description: 'Border color', category: 'accent' },
    { name: 'Input', cssVar: '--input', value: '214.3 31.8% 91.4%', description: 'Input border', category: 'accent' },
    { name: 'Ring', cssVar: '--ring', value: '222.2 84% 4.9%', description: 'Focus ring', category: 'accent' },

    // Semantic colors
    { name: 'Destructive', cssVar: '--destructive', value: '0 84.2% 60.2%', description: 'Error/danger', category: 'semantic' },
    { name: 'Destructive Foreground', cssVar: '--destructive-foreground', value: '210 40% 98%', description: 'Error text', category: 'semantic' },
  ]);

  getColorsByCategory(category: string) {
    return this.colorVariables().filter(color => color.category === category);
  }

  updateColor(cssVar: string, value: string) {
    // Update the color variable
    this.colorVariables.update(colors => 
      colors.map(color => 
        color.cssVar === cssVar ? { ...color, value } : color
      )
    );

    // Apply to DOM immediately
    document.documentElement.style.setProperty(cssVar, value);
  }

  updateRadius(value: string) {
    this.borderRadius.set(value);
    document.documentElement.style.setProperty('--radius', value);
  }

  exportedCSS = computed(() => {
    const colors = this.colorVariables();
    const radius = this.borderRadius();
    
    let css = ':root {\n';
    colors.forEach(color => {
      css += `  ${color.cssVar}: ${color.value};\n`;
    });
    css += `  --radius: ${radius};\n`;
    css += '}';
    
    return css;
  });

  exportedJSON = computed(() => {
    const config: ThemeConfig = {
      name: this.themeName(),
      colors: {},
      radius: this.borderRadius(),
      fontFamily: 'system-ui, sans-serif'
    };
    
    this.colorVariables().forEach(color => {
      config.colors[color.cssVar.replace('--', '')] = color.value;
    });
    
    return JSON.stringify(config, null, 2);
  });

  exportTheme() {
    this.showExportModal.set(true);
  }

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.exportedCSS());
      // You could add a toast notification here
      console.log('Theme CSS copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }

  resetTheme() {
    // Reset to default light theme
    this.loadPreset('light');
  }

  loadPreset(theme: 'light' | 'dark') {
    const presets = {
      light: {
        '--background': '0 0% 100%',
        '--foreground': '222.2 84% 4.9%',
        '--card': '0 0% 100%',
        '--card-foreground': '222.2 84% 4.9%',
        '--popover': '0 0% 100%',
        '--popover-foreground': '222.2 84% 4.9%',
        '--primary': '222.2 47.4% 11.2%',
        '--primary-foreground': '210 40% 98%',
        '--secondary': '210 40% 96%',
        '--secondary-foreground': '222.2 84% 4.9%',
        '--muted': '210 40% 96%',
        '--muted-foreground': '215.4 16.3% 46.9%',
        '--accent': '210 40% 96%',
        '--accent-foreground': '222.2 84% 4.9%',
        '--destructive': '0 84.2% 60.2%',
        '--destructive-foreground': '210 40% 98%',
        '--border': '214.3 31.8% 91.4%',
        '--input': '214.3 31.8% 91.4%',
        '--ring': '222.2 84% 4.9%'
      },
      dark: {
        '--background': '222.2 84% 4.9%',
        '--foreground': '210 40% 98%',
        '--card': '222.2 84% 4.9%',
        '--card-foreground': '210 40% 98%',
        '--popover': '222.2 84% 4.9%',
        '--popover-foreground': '210 40% 98%',
        '--primary': '210 40% 98%',
        '--primary-foreground': '222.2 47.4% 11.2%',
        '--secondary': '217.2 32.6% 17.5%',
        '--secondary-foreground': '210 40% 98%',
        '--muted': '217.2 32.6% 17.5%',
        '--muted-foreground': '215 20.2% 65.1%',
        '--accent': '217.2 32.6% 17.5%',
        '--accent-foreground': '210 40% 98%',
        '--destructive': '0 62.8% 30.6%',
        '--destructive-foreground': '210 40% 98%',
        '--border': '217.2 32.6% 17.5%',
        '--input': '217.2 32.6% 17.5%',
        '--ring': '212.7 26.8% 83.9%'
      }
    };

    const preset = presets[theme];
    
    // Update color variables
    this.colorVariables.update(colors =>
      colors.map(color => ({
        ...color,
        value: preset[color.cssVar] || color.value
      }))
    );

    // Apply to DOM
    Object.entries(preset).forEach(([cssVar, value]) => {
      document.documentElement.style.setProperty(cssVar, value);
    });

    this.themeName.set(theme === 'dark' ? 'Dark Theme' : 'Light Theme');
  }

  ngOnInit() {
    // Apply default theme on initialization
    this.loadPreset('light');
  }
}
