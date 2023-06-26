import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseServiceService } from '../../../service/base-service.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AllDataOfStudent } from 'src/app/models/students';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { UrlPathUtil } from 'src/app/utils/url-path-util';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.css']
})
export class PersonalTableComponent {
  // Для того, чтобы вывести инфу студента
  editingStudent: AllDataOfStudent = new AllDataOfStudent();

  constructor(private router: Router,
    private authService: AuthServiceService,
    private baseServiceService: BaseServiceService,
    private matSnackBar: MatSnackBar) {
      baseServiceService.getOnlyOneStudent(2).subscribe(data => {
        this.editingStudent = data;
        return data;
      });
  }

  homeClick() {
    this.router.navigateByUrl(UrlPathUtil.navigateByUrlForRole());
  }

  logOut() {
    this.authService.logoutLogics();
    // window.location.reload();
  }

  acceptChange() {
    this.baseServiceService.changeStudentForStudent(this.editingStudent).subscribe(k=> {
      this.matSnackBar.open('Данные были изменены', 'Закрыть', {
        duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' });
      this.router.navigateByUrl(UrlPathUtil.navigateByUrlForRole());
    });
  }
}
