import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReportListComponent } from './pages/report-list/report-list.component';
import { AlertListComponent } from './pages/alert-list/alert-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { BusRoutesComponent } from './pages/bus-routes/bus-routes.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AddUserComponent } from './dialogs/add-user/add-user.component';
import { AlertDetailsComponent } from './dialogs/alert-details/alert-details.component';
import { EditUserComponent } from './dialogs/edit-user/edit-user.component';
import { GenerateAlertComponent } from './dialogs/generate-alert/generate-alert.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  // Pages
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'report-list',
    component: ReportListComponent
  },
  {
    path: 'alert-list',
    component: AlertListComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'bus-routes',
    component: BusRoutesComponent
  },

  // TODO: Revisar si son necesarios estos 'path'
  // Dialogs
  {
    path: 'add-user',
    component: AddUserComponent
  },
  {
    path: 'alert-details',
    component: AlertDetailsComponent
  },
  {
    path: 'edit-user',
    component: EditUserComponent
  },
  {
    path: 'generate-alert',
    component: GenerateAlertComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
