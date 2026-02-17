import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'my',
        pathMatch: 'full'
    },
    {
        path: 'all',
        loadComponent: () => import('./list/complaint-list.component').then(m => m.ComplaintListComponent),
        data: { scope: 'all' }
    },
    {
        path: 'my',
        loadComponent: () => import('./list/complaint-list.component').then(m => m.ComplaintListComponent),
        data: { scope: 'mine' }
    },
    {
        path: 'item/:id',
        loadComponent: () => import('./complaint-item/complaint-item.component').then(m => m.ComplaintItemComponent)
    }
]
