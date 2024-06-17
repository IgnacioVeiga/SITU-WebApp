import { Routes } from "@angular/router";

import { AlertListComponent } from "./pages/alerts/list/alert-list.component";
import { BusRoutesComponent } from "./pages/bus-routes/bus-routes.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/home/login/login.component";
import { SignupComponent } from "./pages/home/signup/signup.component";
import { ReportListComponent } from "./pages/reports/list/report-list.component";
import { SeeReportComponent } from "./pages/reports/see-report/see-report.component";
import { UserListComponent } from "./pages/users/list/user-list.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  // Pages
  {
    path: 'home',
    component: HomeComponent
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
    path: 'report-item/:id',
    component: SeeReportComponent
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
  }
];