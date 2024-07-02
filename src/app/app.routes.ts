import { Routes } from "@angular/router";
import { authGuard } from "./shared/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.routes)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)

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
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
];