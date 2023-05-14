import { UrlPathUtil } from 'src/app/utils/url-path-util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/students';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { BaseServiceService } from 'src/app/service/base-service.service';



@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  students: Student[]
  loaded = false;

  constructor(private router: Router,
    private authService: AuthServiceService,
    private baseServiceService: BaseServiceService) {
      this.students = [];
      console.log("");
      console.log("Конструктор student-table");
  }

  ngOnInit(): void {
    this.baseServiceService.getAllStudents().subscribe((students:Student[]) => {
        this.students = students;
        this.loaded = true;
    });
    console.log("ngOnInit student-table");
  }

  emmitMethod(event: String): void {
    console.log("emmitMethod student-table");
  }

  homeClick() {
    this.router.navigateByUrl(UrlPathUtil.HOME);
  }

  logOut() {
    this.router.navigateByUrl(UrlPathUtil.LOGIN);
    this.authService.logoutLogics();
    // window.location.reload();
  }
}
