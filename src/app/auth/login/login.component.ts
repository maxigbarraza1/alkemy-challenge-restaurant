import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessagesService } from '../../services/error-messages.service';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../models/login-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', [
              Validators.required,
              Validators.minLength(6),
              Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
              Validators.maxLength(20)
            ],],
    password: ['', [
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(20)
            ], ]
  })

  constructor(private readonly fb: FormBuilder,
              private readonly errorMsgService:ErrorMessagesService,
              private readonly authService:AuthService,
              private readonly router:Router) { }

  ngOnInit(): void {
  }

  validateField(field:string){
    return this.loginForm.controls[field].errors
            && this.loginForm.controls[field].touched;
  }

  login(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    const user={...this.loginForm.value};
    this.authService.login(user).subscribe((resp:LoginResponse)=>{
      localStorage.setItem('token',resp.token)
      this.router.navigate(['/home']);
    })
  }

  getErrorMessage(field:string):string{
    const errors = this.loginForm.controls[field].errors
    return this.errorMsgService.getErrorMessage(field, errors);
  }

}
