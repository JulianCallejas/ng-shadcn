import { ComponentFixture } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { TestUtils } from '../../../../src/test-utils';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    fixture = await TestUtils.createComponent(InputComponent, [ReactiveFormsModule]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render input element', () => {
      const input = TestUtils.getBySelector(fixture, 'input');
      expect(input).toBeTruthy();
    });

    it('should generate unique input ID if not provided', () => {
      expect(component.inputId).toMatch(/^input-[a-z0-9]{9}$/);
    });

    it('should use provided input ID', () => {
      component.inputId = 'custom-id';
      component.ngOnInit();
      expect(component.inputId).toBe('custom-id');
    });

    it('should render label when provided', () => {
      component.label = 'Test Label';
      fixture.detectChanges();

      const label = TestUtils.getBySelector(fixture, 'label');
      expect(label).toBeTruthy();
      expect(label?.nativeElement.textContent.trim()).toBe('Test Label');
    });

    it('should not render label when not provided', () => {
      const label = TestUtils.getBySelector(fixture, 'label');
      expect(label).toBeFalsy();
    });

    it('should render error message when provided', () => {
      component.error = 'This field is required';
      fixture.detectChanges();

      const error = TestUtils.getBySelector(fixture, 'p.text-destructive');
      expect(error).toBeTruthy();
      expect(error?.nativeElement.textContent.trim()).toBe('This field is required');
    });

    it('should not render error message when not provided', () => {
      const error = TestUtils.getBySelector(fixture, 'p.text-destructive');
      expect(error).toBeFalsy();
    });
  });

  describe('Input Properties', () => {
    it('should set input type', () => {
      component.type = 'email';
      fixture.detectChanges();

      const input = TestUtils.getBySelector(fixture, 'input');
      expect(input?.nativeElement.type).toBe('email');
    });

    it('should set placeholder', () => {
      component.placeholder = 'Enter your email';
      fixture.detectChanges();

      const input = TestUtils.getBySelector(fixture, 'input');
      expect(input?.nativeElement.placeholder).toBe('Enter your email');
    });

    it('should set disabled state', () => {
      component.disabled = true;
      fixture.detectChanges();

      const input = TestUtils.getBySelector(fixture, 'input');
      expect(input?.nativeElement.disabled).toBe(true);
    });

    it('should apply input classes', () => {
      const input = TestUtils.getBySelector(fixture, 'input');
      TestUtils.expectToHaveClass(input!, 'flex');
      TestUtils.expectToHaveClass(input!, 'h-10');
      TestUtils.expectToHaveClass(input!, 'w-full');
      TestUtils.expectToHaveClass(input!, 'rounded-md');
      TestUtils.expectToHaveClass(input!, 'border');
    });
  });

  describe('Value Handling', () => {
    it('should update value signal when input changes', () => {
      const input = TestUtils.getBySelector(fixture, 'input');
      TestUtils.setInputValue(input!, 'test value');
      fixture.detectChanges();

      expect(component.value()).toBe('test value');
    });

    it('should emit valueChange when input changes', () => {
      spyOn(component.valueChange, 'emit');
      const input = TestUtils.getBySelector(fixture, 'input');
      TestUtils.setInputValue(input!, 'test value');

      expect(component.valueChange.emit).toHaveBeenCalledWith('test value');
    });

    it('should display current value', () => {
      component.value.set('initial value');
      fixture.detectChanges();

      const input = TestUtils.getBySelector(fixture, 'input');
      expect(input?.nativeElement.value).toBe('initial value');
    });
  });

  describe('Focus Events', () => {
    it('should emit focused event on focus', () => {
      spyOn(component.focused, 'emit');
      const input = TestUtils.getBySelector(fixture, 'input');
      input?.nativeElement.dispatchEvent(new Event('focus'));

      expect(component.focused.emit).toHaveBeenCalled();
    });

    it('should emit blurred event on blur', () => {
      spyOn(component.blurred, 'emit');
      const input = TestUtils.getBySelector(fixture, 'input');
      input?.nativeElement.dispatchEvent(new Event('blur'));

      expect(component.blurred.emit).toHaveBeenCalled();
    });

    it('should call onTouched on blur', () => {
      spyOn(component as any, 'onTouched');
      const input = TestUtils.getBySelector(fixture, 'input');
      input?.nativeElement.dispatchEvent(new Event('blur'));

      expect((component as any).onTouched).toHaveBeenCalled();
    });
  });

  describe('ControlValueAccessor', () => {
    it('should implement writeValue', () => {
      component.writeValue('written value');
      expect(component.value()).toBe('written value');
    });

    it('should handle null value in writeValue', () => {
      component.writeValue(null as any);
      expect(component.value()).toBe('');
    });

    it('should register onChange callback', () => {
      const mockOnChange = jasmine.createSpy('onChange');
      component.registerOnChange(mockOnChange);

      const input = TestUtils.getBySelector(fixture, 'input');
      TestUtils.setInputValue(input!, 'test');

      expect(mockOnChange).toHaveBeenCalledWith('test');
    });

    it('should register onTouched callback', () => {
      const mockOnTouched = jasmine.createSpy('onTouched');
      component.registerOnTouched(mockOnTouched);

      const input = TestUtils.getBySelector(fixture, 'input');
      input?.nativeElement.dispatchEvent(new Event('blur'));

      expect(mockOnTouched).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
      component.setDisabledState(true);
      expect(component.disabled).toBe(true);

      component.setDisabledState(false);
      expect(component.disabled).toBe(false);
    });
  });

  describe('Form Integration', () => {
    it('should work with reactive forms', async () => {
      const formControl = new FormControl('initial');
      
      // Create a wrapper component for testing
      const wrapperFixture = await TestUtils.createComponent(
        class TestWrapperComponent {
          control = formControl;
        },
        [ReactiveFormsModule]
      );

      // Update the template to include the input with form control
      wrapperFixture.componentRef.setInput('innerHTML', `
        <ng-shadcn-input [formControl]="control"></ng-shadcn-input>
      `);
      
      wrapperFixture.detectChanges();

      expect(formControl.value).toBe('initial');

      // Simulate user input
      formControl.setValue('updated');
      wrapperFixture.detectChanges();

      const input = TestUtils.getBySelector(wrapperFixture, 'input');
      expect(input?.nativeElement.value).toBe('updated');
    });
  });

  describe('Accessibility', () => {
    it('should associate label with input using for/id', () => {
      component.label = 'Test Label';
      component.inputId = 'test-input';
      fixture.detectChanges();

      const label = TestUtils.getBySelector(fixture, 'label');
      const input = TestUtils.getBySelector(fixture, 'input');

      expect(label?.nativeElement.getAttribute('for')).toBe('test-input');
      expect(input?.nativeElement.id).toBe('test-input');
    });

    it('should have focus-visible styles for keyboard navigation', () => {
      const input = TestUtils.getBySelector(fixture, 'input');
      TestUtils.expectToHaveClass(input!, 'focus-visible:outline-none');
      TestUtils.expectToHaveClass(input!, 'focus-visible:ring-2');
      TestUtils.expectToHaveClass(input!, 'focus-visible:ring-ring');
    });

    it('should have disabled styles when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      const input = TestUtils.getBySelector(fixture, 'input');
      TestUtils.expectToHaveClass(input!, 'disabled:cursor-not-allowed');
      TestUtils.expectToHaveClass(input!, 'disabled:opacity-50');
    });
  });
});
