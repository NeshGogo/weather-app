import { Component, input, output, signal } from '@angular/core';

interface HasNameAndId {
  name: string;
  id: string;
}

@Component({
  selector: 'app-searcher',
  imports: [],
  templateUrl: './searcher.component.html',
  styles: '',
})
export class SearcherComponent<type extends HasNameAndId> {
  showOptions = signal(false);
  placeholder = input('Enter a country name...');
  onKeyUp = output<string>();
  items = input<type[]>();
  selected = output<type>();

  selectedItem(item: type) {
    this.selected.emit(item);
  }
}
