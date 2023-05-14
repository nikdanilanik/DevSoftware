import { HomePageComponent } from './components/home-page/home-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found-component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';
import { StudentTableComponent } from './components/users-table/student-table/student-table.component';
import { AdminTableComponent } from './components/users-table/admin-table/admin-table.component';
import { TeacherTableComponent } from './components/users-table/teacher-table/teacher-table.component';

const routes: Routes = [
  { path: 'home',             component: HomePageComponent },
  { path: 'login',            component: AuthorizationComponent },
  { path: 'table-student',    component: StudentTableComponent, canActivate: [AuthGuardService] },
  { path: 'table-admin',      component: AdminTableComponent, canActivate: [AuthGuardService] },
  { path: 'table-teacher',    component: TeacherTableComponent, canActivate: [AuthGuardService] },
  { path: '',                 redirectTo: 'home', pathMatch: 'full' },
  { path: '**',               component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
