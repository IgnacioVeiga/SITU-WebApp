import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./auth.component').then(m => m.AuthComponent),
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            {
                path: 'login',
                loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
            },
            {
                path: 'signup',
                loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent),
            },
        ],
    },
];
