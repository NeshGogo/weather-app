import { DOCUMENT } from '@angular/common';
import { Component, signal, Inject } from '@angular/core';

@Component({
  selector: 'app-dark-mode-toggle',
  imports: [],
  templateUrl: './dark-mode-toggle.component.html',
  styles: '',
})
export class DarkModeToggleComponent {
  isDark = signal(false);

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.isDark.set(this.document.documentElement.classList.contains('dark'));
  }

  modeHandler() {
    this.isDark.set(!this.isDark());
    if (this.isDark()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
