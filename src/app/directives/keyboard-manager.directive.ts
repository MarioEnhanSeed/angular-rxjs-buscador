import { Directive, HostListener } from '@angular/core';
import { FocusService } from '../services/focus.service';

@Directive({
  selector: '[appKM]',
})
export class KeyboardManagerDirective {
  constructor(private focusService: FocusService) {}

  @HostListener('keydown', ['$event'])
  manageKeys(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        this.focusService.moveFocus(-1);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        this.focusService.moveFocus(1);
        break;
    }
    event.preventDefault();
  }
}
