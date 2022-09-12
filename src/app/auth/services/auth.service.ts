import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.interface';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL:string=environment.API_AUTH_URL;

  constructor(private http:HttpClient,
              private router:Router) { }

  login(user:any):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.API_URL, user);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }
}
