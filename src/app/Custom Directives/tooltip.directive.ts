import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @Input() tooltipText: string = 'This is a custom tooltip...';
  @Input() tooltipPosition: string = 'right';
  @Input() tooltipFontColor: string = 'yellow';
  @Input() tooltipFontSize: string = '20px';

  private tooltipElement: HTMLElement | null = null;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    // Ensure tooltip is shown only when hovering over .tooltipContainer
    if (!this.elRef.nativeElement.classList.contains('tooltipContainer'))
      return;

    if (this.tooltipElement) return;

    // Create tooltip element dynamically
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.setProperty(
      this.tooltipElement,
      'textContent',
      this.tooltipText
    );
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'color', this.tooltipFontColor);
    this.renderer.setStyle(
      this.tooltipElement,
      'font-size',
      this.tooltipFontSize + 'px'
    );
    this.renderer.setStyle(this.tooltipElement, 'background', 'grey');
    this.renderer.setStyle(this.tooltipElement, 'padding', '5px 10px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '5px');
    this.renderer.setStyle(this.tooltipElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.tooltipElement, 'visibility', 'hidden');

    // Append tooltip to the element
    this.renderer.appendChild(this.elRef.nativeElement, this.tooltipElement);

    // Get element's position
    const hostPos = this.elRef.nativeElement.getBoundingClientRect();

    // Position tooltip dynamically
    switch (this.tooltipPosition) {
      case 'left':
        this.renderer.setStyle(
          this.tooltipElement,
          'left',
          `-${hostPos.width}px`
        );
        this.renderer.setStyle(this.tooltipElement, 'top', '50%');
        this.renderer.setStyle(
          this.tooltipElement,
          'transform',
          'translateY(-50%)'
        );
        break;
      case 'right':
        this.renderer.setStyle(
          this.tooltipElement,
          'left',
          `${hostPos.width}px`
        );
        this.renderer.setStyle(this.tooltipElement, 'top', '50%');
        this.renderer.setStyle(
          this.tooltipElement,
          'transform',
          'translateY(-50%)'
        );
        break;
      case 'top':
        this.renderer.setStyle(this.tooltipElement, 'left', '50%');
        this.renderer.setStyle(
          this.tooltipElement,
          'top',
          `-${hostPos.height}px`
        );
        this.renderer.setStyle(
          this.tooltipElement,
          'transform',
          'translateX(-50%)'
        );
        break;
      case 'bottom':
        this.renderer.setStyle(this.tooltipElement, 'left', '50%');
        this.renderer.setStyle(
          this.tooltipElement,
          'top',
          `${hostPos.height}px`
        );
        this.renderer.setStyle(
          this.tooltipElement,
          'transform',
          'translateX(-50%)'
        );
        break;
      default:
        this.renderer.setStyle(this.tooltipElement, 'left', '50%');
        this.renderer.setStyle(
          this.tooltipElement,
          'top',
          `${hostPos.height}px`
        );
        this.renderer.setStyle(
          this.tooltipElement,
          'transform',
          'translateX(-50%)'
        );
    }

    // Show tooltip
    this.renderer.setStyle(this.tooltipElement, 'visibility', 'visible');
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.elRef.nativeElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
