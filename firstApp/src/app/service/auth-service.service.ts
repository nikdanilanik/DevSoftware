import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  login(login:string, password:string) {
    console.log('login');
    return this.http.post<User>('api/login', {login, password});
  }
}
