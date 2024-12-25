import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySectionComponent } from './summary-section.component';

describe('SummarySectionComponent', () => {
  let component: SummarySectionComponent;
  let fixture: ComponentFixture<SummarySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummarySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a name', async () => {
    fixture.componentRef.setInput('name', 'Place 1');
    fixture.detectChanges();
    await fixture.whenStable();
    const element = fixture.nativeElement.querySelector('h1');
    expect(element.innerText).toContain('PLACE 1');
  });

  it('should have a precipitation', async () => {
    fixture.componentRef.setInput('precipitation', 50);
    fixture.detectChanges();
    await fixture.whenStable();
    const element = fixture.nativeElement.querySelector('p');
    expect(element.innerText).toContain('Chance of rain: 50%');
  });

  it('should have a temperature', async () => {
    fixture.componentRef.setInput('temperature', 20);
    fixture.detectChanges();
    await fixture.whenStable();
    const elements = fixture.nativeElement.querySelectorAll('h1');
    expect(elements[1].innerText).toContain('20°');
  });

  it('should have an icon', async () => {
    fixture.componentRef.setInput('icon', 1);
    fixture.detectChanges();
    await fixture.whenStable();
    const element = fixture.nativeElement.querySelector('img');
    expect(element.getAttribute('src')).toContain('assets/icons/big/1.png');
  });

  it('should have a summary', async () => {
    fixture.componentRef.setInput('summary', 'Summary');
    fixture.detectChanges();
    await fixture.whenStable();
    const element = fixture.nativeElement.querySelector('img');
    expect(element.getAttribute('alt')).toContain('Summary');
  });

  it('should have recommendations', async () => {
    fixture.componentRef.setInput('recommendations', 'Recommendations');
    fixture.detectChanges();
    await fixture.whenStable();
    const elements = fixture.nativeElement.querySelectorAll('p');
    expect(elements[1].innerText).toContain('Recommendations');
  });
});
