import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTrimInput]',
})
export class TrimInputDirective {
  constructor(private elRef: ElementRef) {}

  @HostListener('blur') onBlur() {
    // console.log(this.elRef.nativeElement.value.trim());

    this.elRef.nativeElement.value = this.elRef.nativeElement.value.trim();
  }
}
