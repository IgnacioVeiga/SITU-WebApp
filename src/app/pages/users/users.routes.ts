import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        loadComponent: () => import('./list/user-list.component').then(m => m.UserListComponent)
    },
    {
        path: 'password',
        loadComponent: () => import('./password/user-password.component').then(m => m.UserPasswordComponent)
    }
]
