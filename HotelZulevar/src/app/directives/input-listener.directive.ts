import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInputListener]'
})
export class InputListenerDirective {

  @Output() onInput: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _el: ElementRef) { }

  @HostListener('window:resize')
  @HostListener('input', ["$event"])
  public onListenerTriggered(event: any): void {
    this.onInput.emit(this._el.nativeElement);
  }
}