import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkModeToggleComponent } from './dark-mode-toggle.component';

describe('DarkModeToggleComponent', () => {
  let component: DarkModeToggleComponent;
  let fixture: ComponentFixture<DarkModeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkModeToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkModeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should active the dark mode', () => {
    expect(document.documentElement.classList.contains('dark')).toBeFalse();
    component.modeHandler();
    expect(component.isDark()).toBeTrue();
    expect(document.documentElement.classList.contains('dark')).toBeTrue();
  });

  it('should remove the dark mode', () => {
    document.documentElement.classList.add('dark');
    component.isDark.set(true);
    component.modeHandler();
    expect(document.documentElement.classList.contains('dark')).toBeFalse();
    expect(component.isDark()).toBeFalse();
  });
});
