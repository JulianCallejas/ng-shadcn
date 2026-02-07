import {
  Directive,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';

@Directive({ selector: '[dialogPortalHost]' })
export class DialogPortalHostDirective implements AfterViewInit, OnDestroy {
  element: HTMLElement;

  constructor(elementRef: ElementRef<HTMLElement>) {
    this.element = elementRef.nativeElement;
  }

  ngAfterViewInit() {
    document.body.appendChild(this.element);
    this.element.onkeydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        console.log("ESC")
      }
    };
  }

  ngOnDestroy() {
    this.element.remove();
  }


}
