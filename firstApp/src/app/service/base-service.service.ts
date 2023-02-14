import { Student } from './../models/students';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BaseServiceService {

  student: Student[] = [
    {id: 0, name: 'Имя', surname: 'Фимилия'},
    {id: 1, name: 'Имя 1', surname: 'Фимилия 1'},
    {id: 2, name: 'Имя 2', surname: 'Фимилия 2'}
  ];

  private studentsUrl = 'api/students';

  constructor(
    private http: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  addNewStudent(student: Student): Observable<Student> {
    console.log('addNewStudent');
    return this.http.post<Student>(this.studentsUrl, student).pipe();
  }
}
