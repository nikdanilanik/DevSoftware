import { UrlPathUtil } from 'src/app/utils/url-path-util';
import { Student } from './../models/students';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UsersUtil } from '../utils/users-util';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})

export class BaseServiceService {

  private studentsUrl = 'api/base/students';

  constructor(
    private http: HttpClient,
    private router: Router) {}

    getAllStudents(page: number, size: number, sort: string, filter?: string): Observable<Page<Student>> {
      let params = new HttpParams()
        .set("page", page.toString())
        .set("size", size.toString());
        if (sort) {
          params = params.set("sort", sort);
        }
        if(filter) {
          params = params.set("filter", filter);
        }

      return this.http.get<Page<Student>>(this.studentsUrl, {params}).pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status === 401) {
            localStorage.removeItem(UsersUtil.CURRENT_USER);
            this.router.navigateByUrl(UrlPathUtil.LOGIN);
            alert("Ошибка входа. Пожалуйста, повторите авторизацию");
          }
          return throwError(() => error);
        })
      );
    }

  addNewStudent(student: Student): Observable<Student> {
    console.log('addNewStudent');
    return this.http.post<Student>(`${this.studentsUrl}/add`, student).pipe();
  }

  removeStudentById(id: number): Observable<unknown> {
    console.log('remove student with id = ' + id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };

    const url = `${this.studentsUrl}/${id}`
    return this.http.delete(url, httpOptions)
    .pipe();
  }

  changeStudent(student: Student): Observable<Student> {
    const url = `${this.studentsUrl}`
    return this.http.put<Student>(`${this.studentsUrl}/update`, student);
  }

  getOnlyOneStudent(id: number) : Observable<any>{
    // Возвращаем фулл данные о студенте
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get<any>(`${this.studentsUrl}/${id}`, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          localStorage.removeItem(UsersUtil.CURRENT_USER);
          this.router.navigateByUrl(UrlPathUtil.LOGIN);
          alert("Ошибка входа. Пожалуйста, повторите авторизацию");
        }
        return throwError(() => error);
      }),
      map((data:any) => {
        return data;
      })
    );
  }

}
