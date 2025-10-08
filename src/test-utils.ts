import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Test utilities for component testing
 */
export class TestUtils {
  /**
   * Create a component fixture with common setup
   */
  static async createComponent<T>(
    component: Type<T>,
    imports: any[] = [],
    providers: any[] = []
  ): Promise<ComponentFixture<T>> {
    await TestBed.configureTestingModule({
      imports: [component, NoopAnimationsModule, ...imports],
      providers: [...providers]
    }).compileComponents();

    return TestBed.createComponent(component);
  }

  /**
   * Get element by test id
   */
  static getByTestId<T>(
    fixture: ComponentFixture<T>,
    testId: string
  ): DebugElement | null {
    return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
  }

  /**
   * Get all elements by test id
   */
  static getAllByTestId<T>(
    fixture: ComponentFixture<T>,
    testId: string
  ): DebugElement[] {
    return fixture.debugElement.queryAll(By.css(`[data-testid="${testId}"]`));
  }

  /**
   * Get element by CSS selector
   */
  static getBySelector<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): DebugElement | null {
    return fixture.debugElement.query(By.css(selector));
  }

  /**
   * Get all elements by CSS selector
   */
  static getAllBySelector<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): DebugElement[] {
    return fixture.debugElement.queryAll(By.css(selector));
  }

  /**
   * Trigger click event on element
   */
  static click(element: DebugElement): void {
    element.nativeElement.click();
  }

  /**
   * Trigger keyboard event
   */
  static keyDown(element: DebugElement, key: string, options: any = {}): void {
    const event = new KeyboardEvent('keydown', { key, ...options });
    element.nativeElement.dispatchEvent(event);
  }

  /**
   * Set input value and trigger input event
   */
  static setInputValue(element: DebugElement, value: string): void {
    const input = element.nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  /**
   * Wait for async operations to complete
   */
  static async waitForAsync(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 0));
  }

  /**
   * Expect element to have class
   */
  static expectToHaveClass(element: DebugElement, className: string): void {
    expect(element.nativeElement.classList).toContain(className);
  }

  /**
   * Expect element to not have class
   */
  static expectNotToHaveClass(element: DebugElement, className: string): void {
    expect(element.nativeElement.classList).not.toContain(className);
  }

  /**
   * Expect element to be visible
   */
  static expectToBeVisible(element: DebugElement): void {
    expect(element.nativeElement.offsetParent).not.toBeNull();
  }

  /**
   * Expect element to be hidden
   */
  static expectToBeHidden(element: DebugElement): void {
    expect(element.nativeElement.offsetParent).toBeNull();
  }
}
