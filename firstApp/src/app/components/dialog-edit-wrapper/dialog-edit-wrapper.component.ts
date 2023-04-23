import { DeleteStudent } from './../../models/students';
import { Student } from './../../models/students';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-edit-wrapper',
  templateUrl: './dialog-edit-wrapper.component.html',
  styleUrls: ['./dialog-edit-wrapper.component.css']
})
export class DialogEditWrapperComponent {
  editingStudent: Student;

  constructor(public dialogRef: MatDialogRef<DialogEditWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student)
    {
      this.editingStudent = new Student();
    }

    ngOnInit(): void{
    }

    onNoClick():void {
      this.dialogRef.close();
    }
}

@Component( {
  selector: 'app-dialog-edit-wrapper-remove',
  templateUrl: './dialog-remove-student.html',
  styleUrls: ['./dialog-edit-wrapper.component.css']
})
export class DialogDeleteStudent {
  deleteStudent: DeleteStudent;

  constructor(public dialogRef: MatDialogRef<DialogDeleteStudent>,
    @Inject(MAT_DIALOG_DATA) public data: Student)
    {
      this.deleteStudent = new DeleteStudent();
    }

    ngOnInit(): void{
    }

    onNoClick():void {
      this.dialogRef.close();
    }
}

@Component( {
  selector: 'app-dialog-edit-wrapper-change',
  templateUrl: './dialog-change-student.html',
  styleUrls: ['./dialog-edit-wrapper.component.css']
})
export class DialogChangeStudent {
  editingStudent: Student;

  constructor(public dialogRef: MatDialogRef<DialogDeleteStudent>,
    @Inject(MAT_DIALOG_DATA) public data: Student)
    {
      this.editingStudent = Object.assign({}, this.data);
    }

    ngOnInit(): void{
    }

    onNoClick():void {
      this.dialogRef.close();
    }
}
