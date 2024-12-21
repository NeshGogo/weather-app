import { Component, input, OnInit, output, signal } from '@angular/core';
import { SearcherItem } from '../../models/searcherItem';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-searcher',
  imports: [],
  templateUrl: './searcher.component.html',
  styles: '',
})
export class SearcherComponent<type extends SearcherItem> implements OnInit {
  showOptions = signal(false);
  placeholder = input('Enter a country name...');
  searchValue = signal('');
  onKeyUp = output<string>();
  items = input<type[]>([]);
  selected = output<type>();
  private searchTerms = new Subject<string>();

  ngOnInit(): void {
    this.searchTerms
      .pipe(debounceTime(500), distinctUntilChanged(),)
      .subscribe((text) => {
        this.onKeyUp.emit(text);
      });
  }

  selectedItem(item: type) {
    this.searchValue.set(item.name);
    this.selected.emit(item);
    this.showOptions.set(false);
  }

  searchItem(ev: any) {
    ev.preventDefault();
    this.searchTerms.next(ev.target.value);
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
