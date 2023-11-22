import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl } from '@angular/forms';

import { ErrorComponent } from '../shared/compos/error/error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let control: AbstractControl;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [ErrorComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    control = new FormControl();
    component.control = control;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create app-error', () => {
    expect(component).toBeTruthy();
  });

  it('should not display error when valid', () => {
    fixture.detectChanges();
    const errors = compiled.querySelectorAll('p');
    expect(errors.length).toEqual(0);
  });

  it('should not display error when pristine and untouched', () => {
    control.setErrors({ required: true });
    fixture.detectChanges();
    const errors = compiled.querySelectorAll('p');
    expect(errors.length).toEqual(0);
  });

  it('should display error when dirty', () => {
    control.setErrors({ required: true });
    control.markAsDirty();
    fixture.detectChanges();
    const errors = compiled.querySelectorAll('p');
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should display error when touched', () => {
    control.setErrors({ required: true });
    control.markAsTouched();
    fixture.detectChanges();
    const errors = compiled.querySelectorAll('p');
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not display error when disabled', () => {
    control.setErrors({ required: true });
    control.markAsDirty();
    control.disable();
    fixture.detectChanges();
    const errors = compiled.querySelectorAll('p');
    expect(errors.length).toEqual(0);
  });

  it('should display multiple errors', () => {
    control.setErrors({ required: true, email: true });
    control.markAsDirty();
    fixture.detectChanges();
    const errors = compiled.querySelectorAll('p');
    expect(errors.length).toBeGreaterThan(1);
  });
});
