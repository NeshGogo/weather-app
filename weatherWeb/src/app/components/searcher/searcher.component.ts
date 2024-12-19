import { Component, input, output, signal } from '@angular/core';
import { SearcherItem } from '../../models/searcherItem';

@Component({
  selector: 'app-searcher',
  imports: [],
  templateUrl: './searcher.component.html',
  styles: '',
})
export class SearcherComponent<type extends SearcherItem> {
  showOptions = signal(false);
  placeholder = input('Enter a country name...');
  searchValue = signal('');
  onKeyUp = output<string>();
  items = input<type[]>([]);
  selected = output<type>();

  selectedItem(item: type) {
    this.searchValue.set(item.name);
    this.selected.emit(item);
    this.showOptions.set(false);
  }

  searchItem(ev: any) {
    ev.preventDefault();
    this.onKeyUp.emit(ev.target.value);
  }

  hideResults() {
    setTimeout(() => {
      this.showOptions.set(false);
    }, 200);
  }

  showResults() {
    this.showOptions.set(true);
  }
}
