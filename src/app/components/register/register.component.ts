import { Component,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { subscribe } from 'diagnostics_channel';
import { response } from 'express';
import { User } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [BrowserModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class RegisterComponent {
  registerForm = this.fb.group({
    fullName: ['', [Validators.required,Validators.pattern(/^[a-za-z]+(?: [a-za-z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required]],
    confirmPassword: ['', Validators.required]
  },{
    Validators: passwordMatchValidator
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private messageService: MessageService,
    private router: Router
    ) {}

  get fullName() {
    return this.registerForm.controls['fullName'];
  }
  get email() {
    return this.registerForm.controls['email'];
}
get password() {
  return this.registerForm.controls['password'];
}
get confirmPassword() {
  return this.registerForm.controls['confirmPassword'];
}
submitDetails(){
  const postData = { ...this.registerForm.value};
  delete postData.confirmPassword;
  this.authService.registerUser(postData as User).subscribe(
    response => {
      console.log(response);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register succesfully'});
      this.router.navigate(['login'])
    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong'});
    }
  )
  
}
}
