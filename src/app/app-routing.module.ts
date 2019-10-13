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
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  // todos
  {
    // inicio (todos)
    path: 'home',
    component: HomeComponent
  },
  {
    // mi perfil (todos)
    path: 'my-profile',
    component: MyProfileComponent
  },
  {
    // ingresar (todos)
    path: 'login',
    component: LoginComponent
  },

  // pasajero
  {
    // registrar (pasajero)
    path: 'register',
    component: RegisterComponent
  },
  {
    // denunciar (pasajero)
    path: 'create-complaint',
    component: CreateComplaintComponent
  },
  {
    // información (pasajero)
    path: 'info',
    component: InfoComponent
  },
  {
    // ayuda (pasajero)
    path: 'help',
    component: HelpComponent
  },
  {
    // noticias o alertas (pasajero)
    path: 'alerts',
    component: AlertsComponent
  },
  {
    // horarios (pasajero)
    path: 'schedule',
    component: ScheduleComponent
  },

  // admin
  {
    // lista de incidencias (admin)
    path: 'complaints',
    component: ComplaintsComponent
  },
  {
    // generar alerta (admin y chofer)
    path: 'create-alert',
    component: CreateAlertComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
