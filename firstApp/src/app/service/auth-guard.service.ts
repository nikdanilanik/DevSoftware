import { LocalStorageService } from './../components/authorization/local-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { UrlPathUtil } from '../utils/url-path-util';
import { UsersUtil } from '../utils/users-util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router,) { }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate([UrlPathUtil.LOGIN]);
      return false;
    }
    return true;
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem(UsersUtil.CURRENT_USER) != null) { return true;}
    return false;
    // const token = localStorage.getItem('curentUser');
    // console.log(localStorage.getItem('curentUser'));
    // return !this.jwtHelper.isTokenExpired(token);
  }
}