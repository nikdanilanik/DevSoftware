import { MatSnackBar } from '@angular/material/snack-bar';
import { UrlPathUtil } from 'src/app/utils/url-path-util';
import { AllDataOfStudent, Student } from './../models/students';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UsersUtil } from '../utils/users-util';
import { Page } from '../models/page';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})

export class BaseServiceService {

  private studentsUrl = 'api/base/students';
  private groupsUrl = 'api/base/groups';

  constructor(
    private http: HttpClient,
    private router: Router,
    private matSnackBar: MatSnackBar) {}

  getAllStudents(page: number, size: number, sort: string, filter?: string): Observable<Page<Student>> {
    let params = new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString());
      if (sort) {
        params = params.set("sort", sort);
      }
      if (filter) {
        params = params.set("filter", filter);
      }

    return this.http.get<Page<Student>>(`${this.studentsUrl}`, {params}).pipe(
      map((data:any) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          localStorage.removeItem(UsersUtil.CURRENT_USER);
          this.router.navigateByUrl(UrlPathUtil.LOGIN);
          this.matSnackBar.open('Ошибка входа. Пожалуйста, повторите авторизацию', 'Закрыть', {
            duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' });
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
    return this.http.put<Student>(`${this.studentsUrl}/update`, student).pipe(
      map((data:any) => {
        return data;
      })
    );
  }

  changeStudentForStudent(student: Student): Observable<Student> {
    const url = `${this.studentsUrl}`
    return this.http.put<Student>(`${this.studentsUrl}/updateForStudents`, student).pipe(
      map((data:any) => {
        console.log(data);
        return data;
      })
    );
  }

  getOnlyOneStudent(id: number) : Observable<AllDataOfStudent>{
    // Возвращаем фулл данные о студенте
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get<AllDataOfStudent>(`${this.studentsUrl}/getData/${id}`, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          localStorage.removeItem(UsersUtil.CURRENT_USER);
          this.router.navigateByUrl(UrlPathUtil.LOGIN);
          this.matSnackBar.open('Ошибка входа. Пожалуйста, повторите авторизацию', 'Закрыть', {
            duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' });
        }
        return throwError(() => error);
      }),
      map((data:AllDataOfStudent) => {
        console.log(data);
        return data;
      })
    );
  }

  getGroupById(id: number) : Observable<Group>{
    // Возвращаем фулл данные о студенте
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get<Group>(`${this.groupsUrl}/${id}`, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          localStorage.removeItem(UsersUtil.CURRENT_USER);
          this.router.navigateByUrl(UrlPathUtil.LOGIN);
          this.matSnackBar.open('Ошибка входа. Пожалуйста, повторите авторизацию', 'Закрыть', {
            duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' });
        }
        if (error.status === 500) {
          this.matSnackBar.open('Такого номера группы не существует', 'Закрыть', {
            duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' });
        }
        return throwError(() => error);
      }),
      map((data:Group) => {
        return data;
      })
    );
  }

}
