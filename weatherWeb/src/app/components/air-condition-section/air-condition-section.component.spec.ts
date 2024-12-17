import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirConditionSectionComponent } from './air-condition-section.component';

describe('AirConditionSectionComponent', () => {
  let component: AirConditionSectionComponent;
  let fixture: ComponentFixture<AirConditionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirConditionSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirConditionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
