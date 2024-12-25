import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcherComponent } from './searcher.component';
import { Place } from '../../models/place';

describe('SearcherComponent', () => {
  let component: SearcherComponent<Place>;
  let fixture: ComponentFixture<SearcherComponent<Place>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
