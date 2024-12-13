import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-searcher',
  imports: [],
  templateUrl: './searcher.component.html',
  styles: '',
})
export class SearcherComponent {
  showOptions = signal(false);
  placeholder = 'Enter a country name...';
}
