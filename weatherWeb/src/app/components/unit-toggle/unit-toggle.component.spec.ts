import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitToggleComponent } from './unit-toggle.component';

describe('UnitToggleComponent', () => {
  let component: UnitToggleComponent;
  let fixture: ComponentFixture<UnitToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a unitChange output', () => {
    expect(component.unitChange).toBeTruthy();
  });

  it('should have a isCelsius signal', () => {
    expect(component.isCelsius).toBeTruthy();
  });

  it('should have a unitHandler method', () => {
    expect(component.unitHandler).toBeTruthy();
  });

  it('should toggle the unit', () => {
    component.unitHandler();
    expect(component.isCelsius()).toBe(false);
  });

  it('should emit the unit', () => {
    spyOn(component.unitChange, 'emit');
    component.unitHandler();
    expect(component.unitChange.emit).toHaveBeenCalledWith('F');
  });
});
