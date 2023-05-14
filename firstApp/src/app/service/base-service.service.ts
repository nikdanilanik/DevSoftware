import { UrlPathUtil } from 'src/app/utils/url-path-util';
import { Student } from './../models/students';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UsersUtil } from '../utils/users-util';

@Injectable({
  providedIn: 'root'
})

export class BaseServiceService {

  private studentsUrl = 'api/base/students';

  constructor(
    private http: HttpClient,
    private router: Router) {}

  getAllStudents(): Observable<Student[]> {
    // Это нужно сделать константной статичной публичной переменной где-то в utils
    // const CURRENT_USER = 'currentUser';

    return this.http.get<Student[]>(this.studentsUrl).pipe(
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
    return this.http.post<Student>(this.studentsUrl, student).pipe();
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

  ChangeStudent(student: Student): Observable<Student> {
    const url = `${this.studentsUrl}`
    return this.http.put<Student>(this.studentsUrl, student);
  }

}
