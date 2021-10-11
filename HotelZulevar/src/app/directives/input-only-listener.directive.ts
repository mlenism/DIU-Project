import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInputOnlyListener]'
})
export class InputOnlyListenerDirective {

  @Output() onInputOnly: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _el: ElementRef) { }

  @HostListener('input', ["$event"])
  public onListenerTriggered(event: any): void {
    this.onInputOnly.emit(this._el.nativeElement);
  }
}