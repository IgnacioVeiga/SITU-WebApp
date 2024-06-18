import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        loadComponent: () => import('./list/report-list.component').then(m => m.ReportListComponent)
    },
    {
        path: 'item/:id',
        loadComponent: () => import('./report-item/report-item.component').then(m => m.ReportItemComponent)
    }
]