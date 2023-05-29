import { AuthGuardService } from './auth-guard.service';
import { UrlPathUtil } from 'src/app/utils/url-path-util';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from './../models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersUtil } from '../utils/users-util';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient,
    private router: Router,
    private authGuardService: AuthGuardService) { }

  auth(loginAndPass: String) {
    this.login(loginAndPass).subscribe(data => {
      this.authGuardService.isAuthenticatedAndNavigate();
    });
    // this.fakelogin().subscribe();
    //  .subscribe(
    //    res => {
    //     this.dataProcessing(res);
    //    },
    //    )
  }

  // dataProcessing(data: any) {
  //   localStorage.setItem("curentUser", data);

  // }

  login(loginAndPass: String): Observable<unknown> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + loginAndPass,
      })
    };

    return this.http.post<any>('api/login', null, httpOptions).pipe(
      map(data => {
        let user: User = new User();

        // ВСЁ ДЛЯ ЮЗЕРА
        // user.id = data.principal.id;
        // user.login = data.principal.username;
        // user.enabled = data.principal.enabled;
        // user.role = data.principal.authorities[0].authority;
        // for (let i = 0; i < data.principal.authorities.length; i++ )
        // {
        //   user.roles[i] = data.principal.authorities[i].authority;
        // }

        localStorage.setItem(UsersUtil.LOGIN, data.principal.username);
        localStorage.setItem(UsersUtil.ENABLED, data.principal.enabled);
        localStorage.setItem(UsersUtil.ROLE, data.principal.authorities[0].authority);
        localStorage.setItem(UsersUtil.ROLE_STUDENT_ID, data.details.student_id);

        localStorage.setItem(UsersUtil.CURRENT_USER, JSON.stringify(data));
        return JSON.stringify(data);
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          localStorage.removeItem(UsersUtil.CURRENT_USER);
          this.router.navigateByUrl(UrlPathUtil.LOGIN);
          alert("Ошибка входа. Проверьте логин и пароль");
        }
        return throwError(() => error);
      }),

      );
  }

  logoutLogics() {
    return this.logout().subscribe(data => {
      if (data.principal.username != null && data.principal.username != "") {
        localStorage.removeItem(UsersUtil.CURRENT_USER);
        this.router.navigateByUrl(UrlPathUtil.LOGIN);
      }
    });
  }

  logout() : Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<any>('api/logout', null, httpOptions).pipe(
      map(data => {
        return data;
      })
    );
  }
}
