import { UrlPathUtil } from 'src/app/utils/url-path-util';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(private router: Router) {
  }
  authClick() {
    this.router.navigateByUrl(UrlPathUtil.LOGIN);
  }
}
