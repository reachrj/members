import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadChildren: '../app/dashboard/dashboard.module#DashboardModule'
    }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
export class AppRoutingModule { }
