import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePlacesComponent } from './favorite-places.component';
import { Place } from '../../models/place';

describe('FavoritePlacesComponent', () => {
  let component: FavoritePlacesComponent;
  let fixture: ComponentFixture<FavoritePlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritePlacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritePlacesComponent);
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
      { name: 'Place 3', id: '2' }
    ];

    fixture.componentRef.setInput('places', places);
    fixture.detectChanges();
    await fixture.whenStable();

    const elements = fixture.nativeElement.querySelectorAll('h2');
    expect(elements[0].innerText).toContain(places[0].name);
    expect(elements[1].innerText).toContain(places[1].name);
    expect(elements[2].innerText).toContain(places[2].name);
  });

  it('should have no places', async () => {
    const places: Place[] = [];

    fixture.componentRef.setInput('places', places);
    fixture.detectChanges();
    await fixture.whenStable();

    const elements = fixture.nativeElement.querySelectorAll('h2');
    expect(elements.length).toBe(0);
  });
});
