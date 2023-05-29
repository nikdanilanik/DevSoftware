import { CookieService } from 'ngx-cookie-service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found-component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogChangeStudent, DialogDeleteStudent, DialogEditWrapperComponent } from './components/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AngularPaginatorModule } from 'angular-paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { StudentTableComponent } from './components/users-table/student-table/student-table.component';
import { AdminTableComponent } from './components/users-table/admin-table/admin-table.component';
import { TeacherTableComponent } from './components/users-table/teacher-table/teacher-table.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { TableMainExample } from './components/table-base/table-base.component';
import { PersonalTableComponent } from './components/users-table/personal-page/personal-page.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogEditWrapperComponent,DialogDeleteStudent,DialogChangeStudent,
    TableMainExample,
    AuthorizationComponent,
    PageNotFoundComponent,
    HomePageComponent,
    StudentTableComponent,
    AdminTableComponent,
    TeacherTableComponent,
    PersonalTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot( InMemoryDataComponent, { dataEncapsulation: false }),
    MatTableModule,
    MatSortModule,
    AngularPaginatorModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        [JwtHelperService],
        [CookieService],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
