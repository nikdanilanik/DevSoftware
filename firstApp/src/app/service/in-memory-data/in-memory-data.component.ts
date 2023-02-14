import { Student } from './../../models/students';
import { Component } from '@angular/core';

@Component({
  selector: 'app-in-memory-data',
  templateUrl: './in-memory-data.component.html',
  styleUrls: ['./in-memory-data.component.css']
})

export class InMemoryDataComponent implements InMemoryDataComponent {
  createDb() {
    const students = [
      {id: 0, name: 'Имя', surname: 'Фимилия'},
      {id: 1, name: 'Имя 1', surname: 'Фимилия 1'},
      {id: 2, name: 'Имя 2', surname: 'Фимилия 2'}
    ];
    return {students};
  }

  genId(students: Student[]): number {
    return students.length > 0 ? Math.max(...students.map(student => student.id ? student.id : 0)) + 1 : 11;
  }
}
