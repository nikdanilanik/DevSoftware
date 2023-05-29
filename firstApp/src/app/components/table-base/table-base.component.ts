import { AuthGuardService } from './../../service/auth-guard.service';
import { Router } from '@angular/router';
import { DialogEditWrapperComponent, DialogDeleteStudent, DialogChangeStudent } from '../dialog-edit-wrapper/dialog-edit-wrapper.component';
import { MatDialog } from '@angular/material/dialog';
import { BaseServiceService } from '../../service/base-service.service';
import { Student, DeleteStudent } from '../../models/students';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { UrlPathUtil } from 'src/app/utils/url-path-util';
import { Page } from 'src/app/models/page';

@Component({
  selector: 'app-table-main',
  templateUrl: './table-base.component.html',
  styleUrls: ['./table-base.component.css']
})

// export class NewClass implements TableFunctions {}

export class TableMainExample implements AfterViewInit {
  displayedColumns: string[] = ['id', 'fio', 'group', 'phoneNumber', 'button'];
  dataSource: MatTableDataSource<Student>;
  isLoading:boolean;

  // @Input() students: Student[];
  // @Output() onChange = new EventEmitter();

  constructor(private _liveAnnouncer: LiveAnnouncer,
    protected baseServiceService: BaseServiceService,
    protected dialog: MatDialog,
    protected router: Router,
    protected authService: AuthServiceService,
    protected authGuardService: AuthGuardService,
    ) {
      // console.log("Конструктор sort-header");
      // console.log(this.students);
    }

  pgIndex= 2;
  totalElementsCount: number;
  firstLastButtons= true;
  pnDisabled= true;
  hdPageSize= true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.authGuardService.isAuthenticatedAndNavigate();
    this.baseServiceService.getAllStudents(0, 5, "id, asc").subscribe((studentsPage: Page<Student>) => {
      this.dataSource = new MatTableDataSource<Student>(studentsPage.content);
      this.totalElementsCount = studentsPage.totalElements;
      this.sort.sort({ id: 'id', start: 'asc', disableClear: false });
      this.dataSource.sort = this.sort;
      console.log(studentsPage);
    });
  }

  getDataForPage(page: number, size: number, sort: string ) {
    this.baseServiceService.getAllStudents(page, size, sort).subscribe((studentsPage: Page<Student>) => {
      this.dataSource = new MatTableDataSource<Student>(studentsPage.content);
      this.totalElementsCount = studentsPage.totalElements;
    });
  }

  onChangePage(pe:PageEvent) {
    const sortCriterion = `${this.sort.active},${this.sort.direction}`;
    this.getDataForPage(pe.pageIndex, pe.pageSize, sortCriterion);
  }

  announceSortChange(sortState: Sort) {
    const thisPageIndex = this.paginator.pageIndex;
    const thisPageSize = this.paginator.pageSize;
    const sortCriterion = `${this.sort.active},${this.sort.direction}`;
    this.getDataForPage(thisPageIndex, thisPageSize, sortCriterion);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    const thisPageIndex = this.paginator.pageIndex;
    const thisPageSize = this.paginator.pageSize;
    const sortCriterion = `${this.sort.active},${this.sort.direction}`;

    if (filterValue === '' && thisPageIndex !== 0) {
      this.paginator.pageIndex = 0;
      this.getDataForPage(thisPageIndex, thisPageSize, sortCriterion);
      return;
    }

    this.isLoading = true;
  this.baseServiceService.getAllStudents(thisPageIndex, thisPageSize, sortCriterion, filterValue)
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.totalElementsCount = data.totalElements;
      this.isLoading = false;
    });
  }

  addNewStudent(): void {
    const thisPageIndex = this.paginator.pageIndex;
    const thisPageSize = this.paginator.pageSize;
    const sortCriterion = `${this.sort.active},${this.sort.direction}`;
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
              this.getDataForPage(thisPageIndex, thisPageSize, sortCriterion) );
          }
        }
      });
  }

  removeStudent(idStudent: number) {
    const thisPageIndex = this.paginator.pageIndex;
    const thisPageSize = this.paginator.pageSize;
    const sortCriterion = `${this.sort.active},${this.sort.direction}`;
    const dialogAddingNewStudent =
      this.dialog.open(DialogDeleteStudent, {
        width: 'auto',
        data: null,
      });
      dialogAddingNewStudent.afterClosed().subscribe((result: DeleteStudent) => {
        if (result == undefined) { console.log("Cansel delete");}
        else if (idStudent != null) {
          this.baseServiceService.removeStudentById(idStudent).subscribe(k=>
            this.getDataForPage(thisPageIndex, thisPageSize, sortCriterion) );
        }
      });
  }

  changeStudent(student:Student): void {
    const thisPageIndex = this.paginator.pageIndex;
    const thisPageSize = this.paginator.pageSize;
    const sortCriterion = `${this.sort.active},${this.sort.direction}`;
    const dialogChangeStudentId =
      this.dialog.open(DialogChangeStudent, {
        width: '400px',
        data: student,
      });
      dialogChangeStudentId.afterClosed().subscribe((result: Student) => {
        if(student.fio == result.fio && student.phoneNumber == result.phoneNumber && student.group == result.group) {console.log("Error change")}
        else {
          this.baseServiceService.changeStudent(result).subscribe(k=>
            this.getDataForPage(thisPageIndex, thisPageSize, sortCriterion) );
        }
      });
  }

  homeClick() {
    this.router.navigateByUrl(UrlPathUtil.HOME);
  }

  logOut() {
    this.authService.logoutLogics();
    // window.location.reload();
  }

  personalArea() {
    this.router.navigateByUrl(UrlPathUtil.PERSONAL_PAGE);
  }
}
