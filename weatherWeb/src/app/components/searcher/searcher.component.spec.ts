import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcherComponent } from './searcher.component';
import { Place } from '../../models/place';

describe('SearcherComponent', () => {
  let component: SearcherComponent<Place>;
  let fixture: ComponentFixture<SearcherComponent<Place>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have places', async () => {
    const places: Place[] = [
      { name: 'Place 1', id: '1' },
      { name: 'Place 2', id: '2' },
      { name: 'Place 3', id: '2' },
    ];

    component.showOptions.set(true);
    fixture.componentRef.setInput('items', places);
    fixture.detectChanges();
    await fixture.whenStable();

    const elements = fixture.nativeElement.querySelectorAll('.cursor-pointer');
    expect(elements[0].innerText).toContain(places[0].name);
    expect(elements[1].innerText).toContain(places[1].name);
    expect(elements[2].innerText).toContain(places[2].name);
  });

  it('should select a place', async () => {
    const place: Place = { name: 'Place 1', id: '1' };

    component.selected.subscribe((selected) => {
      expect(selected).toEqual(place);
    });

    component.selectedItem(place);
  });

  it('should search a place',  (done) => {
    const searchValue = 'Place 1';

    component.onKeyUp.subscribe((text) => {
      expect(text).toEqual(searchValue);
      done();
    });

    const event = { target: { value: searchValue }, preventDefault: () => {} };
    component.searchItem(event);
  });
});
