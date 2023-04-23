import { AuthServiceService } from './../../service/auth-service.service';
import { User } from './../../models/user';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent {
  autoriz: User;

  constructor(private router: Router,
    private authService: AuthServiceService) {
    this.autoriz = new User();
  }

  homeClick() {
    this.router.navigateByUrl('/home');
  }

  auth() {
    if(this.autoriz.login != null && this.autoriz.password && null
        && this.autoriz.login != "" && this.autoriz.password && "") {
      return this.authService.login(this.autoriz.login, this.autoriz.password);
    }
    else { return 0; }
  }

  ngOnInit() {}
}
