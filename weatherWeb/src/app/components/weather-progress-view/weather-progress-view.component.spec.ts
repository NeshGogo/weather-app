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

  it('title should be empty', () => {
    expect(component.title()).toBe('');
  });

  it('progressions should be empty', () => {
    expect(component.progressions()).toEqual([]);
  });

  it('should render title', async() => {
    fixture.componentRef.setInput('title', 'Weather Progress View');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Weather Progress View');
  });

  it('should render progressions', async() => {
    fixture.componentRef.setInput('progressions', [
      { title: 'Title 1', icon: 'icon1', iconDescription: 'icon1 description', value: 'value1' },
      { title: 'Title 2', icon: 'icon2', iconDescription: 'icon2 description', value: 'value2' },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('p').length).toBe(4);
  });

  it('should render progressions with correct values', async() => {
    fixture.componentRef.setInput('progressions', [
      { title: 'Title 1', icon: 'icon1', iconDescription: 'icon1 description', value: 'value1' },
      { title: 'Title 2', icon: 'icon2', iconDescription: 'icon2 description', value: 'value2' },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('p')[0].textContent).toContain('Title 1');
    expect(fixture.nativeElement.querySelectorAll('p')[2].textContent).toContain('Title 2');
    expect(fixture.nativeElement.querySelectorAll('p')[1].textContent).toContain('value1');
    expect(fixture.nativeElement.querySelectorAll('p')[3].textContent).toContain('value2');
  });
});
