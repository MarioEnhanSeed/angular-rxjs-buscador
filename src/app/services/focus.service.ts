import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FocusService {
  private _focusedIndex = new BehaviorSubject<number>(0);
  private items: HTMLElement[] = [];

  get focusedIndex$() {
    return this._focusedIndex.asObservable();
  }

  registerItem(item: HTMLElement) {
    this.items.push(item);
  }

  unregisterItem(item: HTMLElement) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  moveFocus(direction: number) {
    let nextIndex = this._focusedIndex.getValue() + direction;
    if (nextIndex < 0) {
      nextIndex = this.items.length - 1;
    } else if (nextIndex >= this.items.length) {
      nextIndex = 0;
    }
    this._focusedIndex.next(nextIndex);
    this.items[nextIndex].focus();
  }
}
