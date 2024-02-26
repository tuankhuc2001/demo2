import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  isLoading:boolean = false

  passwordVisible = false;

  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value); 
      this.handleTimeOut();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleTimeOut():void {
    this.isLoading = true
    setTimeout(()=> this.handleNavigate(),2000)

  }
  handleNavigate():void {
    this.isLoading = false
    this.router.navigate(['/home']);
  }

  constructor(private fb: NonNullableFormBuilder,private router: Router) {}
}
