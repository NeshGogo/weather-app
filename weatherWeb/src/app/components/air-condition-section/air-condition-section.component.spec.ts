import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AirConditionSectionComponent } from './air-condition-section.component';
import { By } from '@angular/platform-browser';

describe('AirConditionSectionComponent', () => {
  let component: AirConditionSectionComponent;
  let fixture: ComponentFixture<AirConditionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirConditionSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AirConditionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display ari conditions values', async () => {
    const weather = {
      temperature: 25,
      icon: 2,
      wind: 10,
      precipitation: 30,
      summary: 'sunny',
      hourly: [],
      daily: [],
    };

    fixture.componentRef.setInput('weather', weather);
    fixture.detectChanges();
    await fixture.whenStable();
    const elements = fixture.debugElement.queryAll(By.css('.font-bold'));

    expect(elements[0].nativeNode.innerText).toContain('25°');
    expect(elements[1].nativeNode.innerText).toContain('10');
    expect(elements[2].nativeNode.innerText).toContain('30');
  });
});
