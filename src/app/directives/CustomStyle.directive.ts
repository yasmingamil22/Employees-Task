import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCustomStyle]'
})
export class CustomStyleDirective implements OnChanges {

  @Input('appCustomStyle') styleConfig: { bgColor?: string, textColor?: string } = {};

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['styleConfig']) {
      this.applyStyle();
    }
  }

  private applyStyle(): void {
    const { bgColor = '#ffffff', textColor = '#000000' } = this.styleConfig;
    this.el.nativeElement.style.backgroundColor = bgColor;
    this.el.nativeElement.style.color = textColor;
  }
}
