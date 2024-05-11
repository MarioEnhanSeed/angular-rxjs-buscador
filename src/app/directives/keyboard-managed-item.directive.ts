import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { FocusService } from '../services/focus.service';

@Directive({
  selector: '[appKMItem]',
})
export class KeyboardManagedItemDirective implements OnDestroy {
  constructor(private el: ElementRef, private focusService: FocusService) {
    this.focusService.registerItem(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.focusService.unregisterItem(this.el.nativeElement);
  }
}
