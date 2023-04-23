import { Student } from './../models/students';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BaseServiceService {

  private studentsUrl = 'api/base/students';

  constructor(
    private http: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
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
