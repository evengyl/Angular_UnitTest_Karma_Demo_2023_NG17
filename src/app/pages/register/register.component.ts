import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Country } from '../../shared/models/country.model'
import { UserService } from '../../shared/services/user.service'
import { AbstractControl, ValidationErrors } from "@angular/forms"
import { ErrorComponent } from '../../shared/compos/error/error.component'
import { RegisterForm } from './register.form'



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  fg!: FormGroup
  countries!: Country[]

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) { 
    this._initForm()
    this.countries = this.activatedRoute.snapshot.data['countries']
  }


  submit() {
    if(this.fg.valid) {
      if(this.userService.post(this.fg.value))
          this.router.navigateByUrl('/home')
    }
  }

  private _initForm() {
    this.fg = this.fb.group(RegisterForm)

    const nationalityControl = this.fg.get('nationality')
    const ssnControl = this.fg.get('ssn')

    if(ssnControl && nationalityControl) {
    
      ssnControl.disable()
    
      nationalityControl.statusChanges.subscribe(() => {
        
        if(nationalityControl.value?.toLowerCase() === 'be')
        {
          ssnControl.enable()
        }
        else
        {
          ssnControl.disable()
        }
      })
    }
  }
}
