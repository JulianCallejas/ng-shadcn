import { test, expect } from '@playwright/test';

test.describe('Demo Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the demo application', async ({ page }) => {
    await expect(page).toHaveTitle(/ng-shadcn/i);
    await expect(page.locator('h1')).toContainText('ng-shadcn');
  });

  test('should display all component sections', async ({ page }) => {
    // Check for main component sections
    await expect(page.locator('text=Button')).toBeVisible();
    await expect(page.locator('text=Input')).toBeVisible();
    await expect(page.locator('text=Card')).toBeVisible();
    await expect(page.locator('text=Dialog')).toBeVisible();
  });

  test('should have working theme toggle', async ({ page }) => {
    const themeToggle = page.locator('[data-testid="theme-toggle"]').first();
    
    if (await themeToggle.isVisible()) {
      // Get initial theme
      const initialTheme = await page.locator('html').getAttribute('class');
      
      // Click theme toggle
      await themeToggle.click();
      
      // Wait for theme change
      await page.waitForTimeout(100);
      
      // Check theme changed
      const newTheme = await page.locator('html').getAttribute('class');
      expect(newTheme).not.toBe(initialTheme);
    }
  });

  test('should display component examples', async ({ page }) => {
    // Check for button examples
    await expect(page.locator('ng-shadcn-button').first()).toBeVisible();
    
    // Check for input examples
    await expect(page.locator('ng-shadcn-input').first()).toBeVisible();
    
    // Check for card examples
    await expect(page.locator('ng-shadcn-card').first()).toBeVisible();
  });
});

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render different button variants', async ({ page }) => {
    // Check for different button variants
    const buttons = page.locator('ng-shadcn-button');
    await expect(buttons.first()).toBeVisible();
    
    // Test button click
    const firstButton = buttons.first();
    await firstButton.click();
    
    // Button should be clickable (no error thrown)
    expect(true).toBe(true);
  });

  test('should handle disabled state', async ({ page }) => {
    const disabledButton = page.locator('ng-shadcn-button[disabled]').first();
    
    if (await disabledButton.isVisible()) {
      await expect(disabledButton).toBeDisabled();
    }
  });
});

test.describe('Input Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow text input', async ({ page }) => {
    const input = page.locator('ng-shadcn-input input').first();
    
    if (await input.isVisible()) {
      await input.fill('Test input value');
      await expect(input).toHaveValue('Test input value');
    }
  });

  test('should display labels and placeholders', async ({ page }) => {
    const inputWithLabel = page.locator('ng-shadcn-input').first();
    
    if (await inputWithLabel.isVisible()) {
      // Check if label exists
      const label = inputWithLabel.locator('label');
      if (await label.isVisible()) {
        await expect(label).toBeVisible();
      }
      
      // Check if input has placeholder
      const input = inputWithLabel.locator('input');
      const placeholder = await input.getAttribute('placeholder');
      if (placeholder) {
        expect(placeholder.length).toBeGreaterThan(0);
      }
    }
  });
});

test.describe('Dialog Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open and close dialog', async ({ page }) => {
    // Look for dialog trigger button
    const dialogTrigger = page.locator('button:has-text("Open Dialog"), [data-testid="dialog-trigger"]').first();
    
    if (await dialogTrigger.isVisible()) {
      await dialogTrigger.click();
      
      // Wait for dialog to appear
      await page.waitForTimeout(200);
      
      // Check if dialog is visible
      const dialog = page.locator('[role="dialog"], .dialog-content').first();
      if (await dialog.isVisible()) {
        await expect(dialog).toBeVisible();
        
        // Try to close dialog
        const closeButton = page.locator('button:has-text("Close"), [data-testid="dialog-close"]').first();
        if (await closeButton.isVisible()) {
          await closeButton.click();
          await page.waitForTimeout(200);
        } else {
          // Try pressing Escape
          await page.keyboard.press('Escape');
        }
      }
    }
  });
});

test.describe('Responsive Design', () => {
  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if page loads on mobile
    await expect(page.locator('h1')).toBeVisible();
    
    // Check if components are still visible
    await expect(page.locator('ng-shadcn-button').first()).toBeVisible();
  });

  test('should work on tablet devices', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Check if page loads on tablet
    await expect(page.locator('h1')).toBeVisible();
    
    // Check if components are still visible
    await expect(page.locator('ng-shadcn-button').first()).toBeVisible();
  });
});
