import { DOCUMENT } from '@angular/common';
import { Component, signal, OnInit, AfterViewInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dark-mode-toggle',
  imports: [],
  templateUrl: './dark-mode-toggle.component.html',
  styles: '',
})
export class DarkModeToggleComponent implements OnInit, AfterViewInit {

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.isDark.set(this.document.documentElement.classList.contains('dark'));
  }

  ngAfterViewInit(): void {
    //this.isDark.set(document.documentElement.classList.contains('dark'));
  }

  isDark = signal(false);

  ngOnInit(): void {
    // const isDarkMode = 
    // this.isDark.set(isDarkMode);
    // console.log(this.isDark());
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
