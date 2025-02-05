import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appHighlightText]',
})
export class HighlightTextDirective implements OnInit {
  @Input() highlightColor: string = 'yellow';
  @Input() defaultColor: string = ' transparent';

  @HostBinding('style.backgroundColor') backgroundColor: string =
    this.highlightColor;

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }

  constructor() {}

  @HostListener('mouseenter') mouseenter(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }
}
