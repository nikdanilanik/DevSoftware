// import { Student } from './../../models/students';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-in-memory-data',
//   templateUrl: './in-memory-data.component.html'
// })

// export class InMemoryDataComponent implements InMemoryDataComponent {
//   createDb() {
//     const students = [
//       {id: 0, name: 'Имя', surname: 'Фимилия'},
//       {id: 1, name: 'Имя 1', surname: 'Фимилия 1'},
//       {id: 2, name: 'Имя 2', surname: 'gfssf 2'},
//       {id: 3, name: 'Имя 3', surname: 'Фимилия 3'},
//       {id: 4, name: 'Имя 4', surname: 'Фимилия 4'},
//       {id: 5, name: 'Имя 5', surname: 'Фимилия 5'},
//       {id: 8, name: 'Имя 8', surname: 'Фимилия 8'},
//       {id: 7, name: 'Имя 7', surname: 'Фимилия 7'},
//       {id: 6, name: 'Имя 6', surname: 'Фимилия 6'}
//     ];
//     return {students};
//   }

//   genId(students: Student[]): number {
//     return students.length > 0 ? Math.max(...students.map(student => student.id ? student.id : 0)) + 1 : 11;
//   }
// }
