import { AuthGuardService } from './../../service/auth-guard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogEditWrapperComponent, DialogDeleteStudent, DialogChangeStudent } from '../dialog-edit-wrapper/dialog-edit-wrapper.component';
import { MatDialog } from '@angular/material/dialog';
import { BaseServiceService } from '../../service/base-service.service';
import { Student, DeleteStudent, AllDataOfStudent } from '../../models/students';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { UrlPathUtil } from 'src/app/utils/url-path-util';
import { Page } from 'src/app/models/page';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table-main',
  templateUrl: './table-base.component.html',
  styleUrls: ['./table-base.component.css']
})

// export class NewClass implements TableFunctions {}

export class TableMainExample implements AfterViewInit {
  displayedColumns: string[] = ['id', 'fio', 'group', 'phoneNumber', 'button'];
  dataSource: MatTableDataSource<Student>;
  filterData:string;

  thisPageIndexForRouting:number;
  thisPageSizeForRouting:number;
  sortCriterionForRouting:string;
  filterDataForRouting:string;

  // @Input() students: Student[];
  // @Output() onChange = new EventEmitter();

  constructor(private _liveAnnouncer: LiveAnnouncer,
    protected baseServiceService: BaseServiceService,
    protected dialog: MatDialog,
    protected router: Router,
    protected matSnackBar: MatSnackBar,
    protected authService: AuthServiceService,
    protected authGuardService: AuthGuardService,
    protected activatedRoute: ActivatedRoute,
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
    if (!this.prossecingUrl()) {
      this.authGuardService.isAuthenticatedAndNavigate();
      this.baseServiceService.getAllStudents(0, 5, "id, asc").subscribe((studentsPage: Page<Student>) => {
        this.dataSource = new MatTableDataSource<Student>(studentsPage.content);
        this.totalElementsCount = studentsPage.totalElements;
        this.sort.sort({ id: 'id', start: 'asc', disableClear: false });
        this.dataSource.sort = this.sort;
      });
    }
  }

  prossecingUrl() :boolean {
    const thisPageIndex = Number(this.activatedRoute.snapshot.queryParams['thisPageIndex']);
    const thisPageSize  = Number(this.activatedRoute.snapshot.queryParams['thisPageSize']);
    const sortCriterion = this.activatedRoute.snapshot.queryParams['sortCriterion'];
    const filterData    = this.activatedRoute.snapshot.queryParams['filterData'];

    if (thisPageIndex !== 0 && thisPageSize != 5 && sortCriterion != "id, asc" && sortCriterion != undefined || filterData) {
      this.baseServiceService.getAllStudents(thisPageIndex, thisPageSize, sortCriterion, filterData).subscribe((studentsPage: Page<Student>) => {
        this.paginator.pageIndex = thisPageIndex;
        this.paginator.pageSize = thisPageSize;
        // this.sort..... Не уверен нужен ли
        this.filterData = filterData;
        this.dataSource = new MatTableDataSource<Student>(studentsPage.content);
        this.totalElementsCount = studentsPage.totalElements;
        this.dataSource.sort = this.sort;
        return true;
      });
    }
    return false;
  }

  getDataForPage(page: number, size: number, sort: string, filter?: string ) {
    this.baseServiceService.getAllStudents(page, size, sort, filter).subscribe((studentsPage: Page<Student>) => {
      this.dataSource = new MatTableDataSource<Student>(studentsPage.content);
      this.totalElementsCount = studentsPage.totalElements;
    });
    this.setUrl();
  }

  onChangePage(pe:PageEvent) {
    const sortCriterion = `${this.sort.active},${this.sort.direction}`;
    this.getDataForPage(pe.pageIndex, pe.pageSize, sortCriterion, this.filterData);
  }

  announceSortChange(sortState: Sort) {
    const thisPageIndex = this.paginator.pageIndex;
    const thisPageSize = this.paginator.pageSize;
    const sortCriterion = `${this.sort.active},${this.sort.direction}`;
    this.getDataForPage(thisPageIndex, thisPageSize, sortCriterion, this.filterData);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    const thisPageIndex = this.paginator.pageIndex;
    const thisPageSize = this.paginator.pageSize;
    const sortCriterion = `${this.sort.active},${this.sort.direction}`;
    this.filterData = filterValue;

    if (filterValue === '' && thisPageIndex !== 0) {
      this.paginator.pageIndex = 0;
      this.getDataForPage(thisPageIndex, thisPageSize, sortCriterion);
      return;
    }
    this.getDataForPage(thisPageIndex, thisPageSize, sortCriterion, filterValue);
  }

  setUrl() {
    const currentUrl = this.router.url;
    const queryParams = this.activatedRoute.snapshot.queryParamMap;
    const newQueryParams = {
      thisPageIndex: this.paginator.pageIndex,
      thisPageSize: this.paginator.pageSize,
      sortCriterion: `${this.sort.active},${this.sort.direction}`,
      filterData: this.filterData,
    };
    const mergedParams = { ...queryParams, ...newQueryParams };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: mergedParams,
      queryParamsHandling: 'merge'
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
      dialogAddingNewStudent.afterClosed().subscribe((result: AllDataOfStudent) => {
        if(result != null) {
          if(result.fio != "" && result.phoneNumberOfParents != null && result.group.id != 0 && result.phoneNumber != "" && result.fio != null) {
            console.log("adding new student: " + result.fio);
            this.baseServiceService.getGroupById(result.group.id).subscribe(data => {
              result.group = data;
              this.baseServiceService.addNewStudent(result).subscribe(k=> {
                this.getDataForPage(thisPageIndex, thisPageSize, sortCriterion, this.filterData);
              });
            });
          }
          else {
            this.matSnackBar.open('Проверьте вводимые значения', 'Закрыть', {
              duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' });
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
            this.getDataForPage(thisPageIndex, thisPageSize, sortCriterion, this.filterData) );
        }
      });
  }

  changeStudent(student:AllDataOfStudent): void {
    const thisPageIndex = this.paginator.pageIndex;
    const thisPageSize = this.paginator.pageSize;
    const sortCriterion = `${this.sort.active},${this.sort.direction}`;
    const dialogChangeStudentId =
      this.dialog.open(DialogChangeStudent, {
        width: '400px',
        data: student,
      });
      dialogChangeStudentId.afterClosed().subscribe((result: AllDataOfStudent) => {
        if(student === result) {
          this.matSnackBar.open('Вы ничего не изменили', 'Закрыть', {
            duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' });
        }
        else {
          this.baseServiceService.getGroupById(result.group.id).subscribe(data => {
            result.group = data;
            this.baseServiceService.changeStudent(result).subscribe(k=>
              this.getDataForPage(thisPageIndex, thisPageSize, sortCriterion, this.filterData) );
          });
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
