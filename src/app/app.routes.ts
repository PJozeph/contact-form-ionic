import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./contact-form/form.routes').then(m => m.formRoutes),
    },
    {
        path: '',
        redirectTo: 'form',
        pathMatch: 'full',
    },
];
