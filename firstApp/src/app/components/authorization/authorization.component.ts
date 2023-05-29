import { UrlPathUtil } from 'src/app/utils/url-path-util';
import { Authen } from './../../models/authen';
import { AuthServiceService } from './../../service/auth-service.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersUtil } from 'src/app/utils/users-util';
import { AuthGuardService } from 'src/app/service/auth-guard.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})

export class AuthorizationComponent {
  autoriz: Authen;

  constructor(private router: Router,
    private authService: AuthServiceService,
    private authGuardService: AuthGuardService) {
      this.autoriz = new Authen();
      this.authGuardService.isAuthenticatedAndNavigate();
  }

  homeClick() {
    this.router.navigateByUrl(UrlPathUtil.HOME);
  }

  auth() {
    if ( this.autoriz.login == "" || this.autoriz.password == "") { alert("Заполните поля")}
    else { this.authService.auth(window.btoa(this.autoriz.login + ":" + this.autoriz.password));
    }

    // this.authService.login(btoa(this.autoriz.login + ":" + this.autoriz.password));

    // this.router.navigateByUrl('/home');
    // setTimeout(() => {
    //   location.reload();
    // }, 1000);
  }

  ngOnInit() {}
}
