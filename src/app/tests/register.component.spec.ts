import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { RegisterComponent } from '../pages/register/register.component';
import { UserService } from '../shared/services/user.service';
import { ErrorComponent } from '../shared/compos/error/error.component';
import { HomeComponent } from '../pages/home/home.component';

@Injectable()
class UserServiceMock {
  post(data: User) {
    return of({ ...data, id: 42 });
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let element: HTMLElement;
  let location: Location;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      providers: [ 
        FormBuilder, 
        { provide: UserService, useClass: UserServiceMock }
      ],
      imports: [ ErrorComponent, HomeComponent, RegisterComponent, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes([
        { path: 'home', component: HomeComponent }
      ])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    location = TestBed.inject(Location);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    router.initialNavigation();
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should email be invalid without value', () => {
    component.fg.patchValue({ email: null });
    expect(component.fg.get('email')?.valid).toBeFalse();
  });

  it('should email be invalid with invalid pattern', () => {
    component.fg.patchValue({ email: 'invalid.email' });
    expect(component.fg.get('email')?.valid).toBeFalse();
  });

  it('should email be valid with valid pattern', () => {
    component.fg.patchValue({ email: 'valid@email.be' });
    expect(component.fg.get('email')?.valid).toBeTrue();
  });

  it('should nationality be invalid without value', () => {
    component.fg.patchValue({ nationality: null });
    expect(component.fg.get('nationality')?.valid).toBeFalse();
  });

  it('should nationality be valid with value', () => {
    component.fg.patchValue({ nationality: 'be' });
    expect(component.fg.get('nationality')?.valid).toBeTrue();
  });

  it('should ssn be disabled when nationality is not "be"', () => {
    component.fg.patchValue({ nationality: 'fr', ssn: null });
    expect(component.fg.get('ssn')?.disabled).toBeTrue();
  });

  it('should ssn be enabled without value when nationality is "be"', () => {
    component.fg.patchValue({ nationality: 'be', ssn: null });
    expect(component.fg.get('ssn')?.enabled).toBeTrue();
  });

  it('should ssn be invalid without value', () => {
    component.fg.patchValue({ nationality: 'be', ssn: null });
    expect(component.fg.get('ssn')?.valid).toBeFalse();
  });

  it('should ssn be invalid with bad pattern', () => {
    component.fg.patchValue({ nationality: 'be', ssn: '12_34_56_789.00' });
    expect(component.fg.get('ssn')?.valid).toBeFalse();
  });

  it('should ssn be invalid with bad control number', () => {
    component.fg.patchValue({ nationality: 'be', ssn: '82.05.06-203.17' });
    expect(component.fg.get('ssn')?.valid).toBeFalse();
  });

  it('should ssn be valid with valid value before 2000', () => {
    component.fg.patchValue({ nationality: 'be', ssn: '82.05.06-203.16' });
    expect(component.fg.get('ssn')?.valid).toBeTrue();
  });
  
  it('should ssn be valid with valid value after 2000', () => {
    component.fg.patchValue({ nationality: 'be', ssn: '01.01.01-003.24' });
    expect(component.fg.get('ssn')?.valid).toBeTrue();
  });

  it('should render ssn input when nationality is "be"', () => {
    component.fg.patchValue({ nationality: 'be' });  
    fixture.detectChanges();
    const input = element.querySelector('[formcontrolname="ssn"]');
    expect(input).toBeTruthy();
  });

  it('should not render ssn input when nationality is not "be"', () => {
    component.fg.patchValue({ nationality: 'fr' });
    fixture.detectChanges();
    const input = element.querySelector('[formcontrolname="ssn"]');
    expect(input).toBeFalsy();
  });

  it('should show success toast and redirect to /home when request is OK', fakeAsync(() => {
    component.fg.patchValue({
      email: 'lb@gmail.com',
      nationality: 'be',
      ssn: '91.06.01-379.89'
    });
    component.submit();
    tick();
    expect(location.path()).toBe('/home');
  }));

  it('should show error toast when request is KO', () => {
    component.fg.patchValue({
      email: 'error@gmail.com',
      nationality: 'be', 
      ssn: '91.06.01-379.89'
    });
    spyOn(userService, 'post').and.returnValue(true);
    component.submit();
  });
});

