import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the drawer', () => {
    expect(component.show()).toBeFalse();

    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();

    expect(component.show()).toBeTrue();
    expect(fixture.debugElement.nativeElement.querySelector('.transform-none')).toBeTruthy();
  });

  it('should hide the drawer', () => {
    expect(component.show()).toBeFalse();

    fixture.componentRef.setInput('show', false);
    fixture.detectChanges();

    expect(component.show()).toBeFalse();
    expect(fixture.debugElement.nativeElement.querySelector('.translate-x-full')).toBeTruthy();
  });

  it('should emit the close event', () => {
    let closed = false;
    component.close.subscribe(() => closed = true);

    component.close.emit();
    expect(closed).toBeTrue();
  });

  it('should set the title', () => {
    expect(component.title()).toBe('');

    fixture.componentRef.setInput('title', 'Drawer Title');
    fixture.detectChanges();

    expect(component.title()).toBe('Drawer Title');
    expect(fixture.debugElement.nativeElement.querySelector('h5').innerText).toContain('Drawer Title');
  });
});
