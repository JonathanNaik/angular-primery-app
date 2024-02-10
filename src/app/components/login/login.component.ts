import { Component,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BrowserModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class LoginComponent {
loginform = this.fb.group({
email: ['',[Validators.required, Validators.email]],
password: ['',Validators.required]
})
  loginForm: any;

constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private msgService: MessageService) {}

get email () {
  return this.loginForm.controls['email'];
}
get password (){
  return this.loginForm.controls['password'];
}
loginUser(){
  const { email, password} = this.loginForm.value;
  this.authService.getUserByEmail(email as string).subscribe(
    response => {
      if(response.length > 0 && response[0].password === password){
        sessionStorage.setItem('email', email as string);
        this.router.navigate(['/home']);
      }else {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'email or password is Wrong'});
      }
    },
    error => {
      this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went Wrong'});
    }
  )
}
}
