import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'sales-report',
        pathMatch: 'full',
    },
    {
        path: '',
        loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
        children: [
            {
                path: 'sales-report',
                loadComponent: () =>
                    import('./pages/sales-report/sales-report.component').then(
                        (m) => m.SalesReportComponent
                    ),
                data: {
                    title: 'Sales Report',
                },
            },
        ],
    },
];
