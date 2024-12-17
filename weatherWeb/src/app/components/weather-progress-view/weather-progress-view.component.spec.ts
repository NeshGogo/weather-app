import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherProgressViewComponent } from './weather-progress-view.component';

describe('WeatherProgressViewComponent', () => {
  let component: WeatherProgressViewComponent;
  let fixture: ComponentFixture<WeatherProgressViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherProgressViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherProgressViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
