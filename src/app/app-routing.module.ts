import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/user/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { MyProfileComponent } from './pages/user/my-profile/my-profile.component';
import { InfoComponent } from './pages/info/info.component';
import { HelpComponent } from './pages/help/help.component';
import { AlertsComponent } from './pages/alerts/list/alerts.component';
import { CreateAlertComponent } from './pages/alerts/create/create-alert.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { CreateComplaintComponent } from './pages/complaints/create-complaint/create-complaint.component';
import { ComplaintsComponent } from './pages/complaints/list/complaints.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'complaints', component: ComplaintsComponent },
  { path: 'create-complaint', component: CreateComplaintComponent },
  { path: 'info', component: InfoComponent },
  { path: 'help', component: HelpComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'create-alert', component: CreateAlertComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
