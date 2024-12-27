import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle favorite place', () => {
    component.toggleFavoritePlace();
    expect(component.favorite).toBeTruthy();
  });

  it('should listen to weather', (done) => {
    component.listenToWeather.subscribe(async () => {
      fixture.componentRef.setInput('isPlaying', true);
      fixture.detectChanges();
      await fixture.whenStable();
      done();
    });
    component.listenToWeather.emit();
    expect(component.isPlaying()).toBeTruthy();
  });

  it('should stop listening to weather', (done) => {
    component.stopToListen.subscribe(async () => {
      fixture.componentRef.setInput('isPlaying', false);
      fixture.detectChanges();
      await fixture.whenStable();
      done();
    });
    component.stopToListen.emit();
    expect(component.isPlaying()).toBeFalsy();
  });

  it('should show favorite list', (done) => {
    component.showFavoriteList.subscribe(async () => {
      fixture.componentRef.setInput('thereisAPlace', true);
      fixture.detectChanges();
      await fixture.whenStable();
      done();
    });
    component.showFavoriteList.emit(true);
    expect(component.thereisAPlace()).toBeTruthy();
  });
});
