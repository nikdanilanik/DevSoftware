import { Router } from '@angular/router';
import { DialogEditWrapperComponent, DialogDeleteStudent, DialogChangeStudent } from './../dialog-edit-wrapper/dialog-edit-wrapper.component';
import { MatDialog } from '@angular/material/dialog';
import { BaseServiceService } from './../../service/base-service.service';
import { Student, DeleteStudent } from './../../models/students';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sort-header',
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.css']
})
export class TableSortingExample implements AfterViewInit {
  displayedColumns: string[] = ['id', 'fio', 'group', 'phoneNumber', 'button'];
  dataSource: MatTableDataSource<Student>;
  studentResult: Student;


  constructor(private _liveAnnouncer: LiveAnnouncer,
    private baseServiceService: BaseServiceService,
    public dialog: MatDialog) {
      this.baseServiceService.getAllStudents().subscribe((students:Student[]) => {
        this.dataSource = new MatTableDataSource<Student>(students);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }

  pgIndex= 2;
  firstLastButtons= true;
  pnDisabled= true;
  hdPageSize= true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {}

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce('Sorted ${sortState.deriction}ending');
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onChangePage(pe:PageEvent) {
    console.log(pe.pageIndex);
    console.log(pe.pageSize);
  }

  addNewStudent(): void {
    const dialogAddingNewStudent =
      this.dialog.open(DialogEditWrapperComponent, {
        width: '400px',
        data: null
      });
      dialogAddingNewStudent.afterClosed().subscribe((result: Student) => {
        if(result != null) {
          if(result.fio != "" && result.group != "" && result.phoneNumber != "" && result.fio != null) {
            console.log("adding new student: " + result.fio);
            this.baseServiceService.addNewStudent(result).subscribe(k=>
              this.baseServiceService.getAllStudents().subscribe(data => this.dataSource.data = data) );
          }
        }
      });
  }

  removeStudent(idStudent: number) {
    const dialogAddingNewStudent =
      this.dialog.open(DialogDeleteStudent, {
        width: 'auto',
        data: null,
      });
      dialogAddingNewStudent.afterClosed().subscribe((result: DeleteStudent) => {
        if (result == undefined) { console.log("Cansel delete");}
        else if (idStudent != null) {
          this.baseServiceService.removeStudentById(idStudent).subscribe(k=>
            this.baseServiceService.getAllStudents().subscribe(data => this.dataSource.data = data) );
        }
      });
  }

  changeStudent(student:Student): void {
    const dialogChangeStudentId =
      this.dialog.open(DialogChangeStudent, {
        width: '400px',
        data: student,
      });
      dialogChangeStudentId.afterClosed().subscribe((result: Student) => {
        console.log(student);
        console.log(result);
        if(student.fio == result.fio && student.phoneNumber == result.phoneNumber && student.group == result.group) {console.log("Error change")}
        else {
          this.baseServiceService.ChangeStudent(result).subscribe(k=>
            this.baseServiceService.getAllStudents().subscribe(data => this.dataSource.data = data) );
        }
      });
  }
}
