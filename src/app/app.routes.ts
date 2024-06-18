import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/home/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/home/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'report',
    loadChildren: () => import('./pages/reports/reports.routes').then(m => m.routes)
  },
  {
    path: 'alert',
    loadChildren: () => import('./pages/alerts/alerts.routes').then(m => m.routes)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/users/users.routes').then(m => m.routes)
  },
  {
    path: 'bus',
    loadComponent: () => import('./pages/bus-routes/bus-routes.component').then(m => m.BusRoutesComponent)
  }
];