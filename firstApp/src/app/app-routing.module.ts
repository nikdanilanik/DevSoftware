import { HomePageComponent } from './components/home-page/home-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found-component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home',     component: HomePageComponent },
  { path: 'auth',     component: AuthorizationComponent },
  { path: '',     redirectTo: 'home', pathMatch: 'full' },
  { path: '**',       component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
