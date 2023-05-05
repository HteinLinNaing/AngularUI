import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { TodoDetailComponent } from './todo/todo-detail.component';
import { TodoComponent } from './todo/todo.component';
import { PermissionGuardService } from '../shared/guard/permission-guard.service';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then((m) => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then((m) => m.TablesModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then((m) => m.FormModule) },
            {
                path: 'bs-element',
                loadChildren: () => import('./bs-element/bs-element.module').then((m) => m.BsElementModule)
            },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then((m) => m.GridModule) },
            {
                path: 'components',
                loadChildren: () => import('./bs-component/bs-component.module').then((m) => m.BsComponentModule)
            },
            {
                path: 'blank-page',
                loadChildren: () => import('./blank-page/blank-page.module').then((m) => m.BlankPageModule)
            },
            {
                path: 'heroes',
                loadChildren: () => import('./hero/hero.module').then((m) => m.HeroModule)
            },
            {
                path: 'customers',
                loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
                canActivate: [PermissionGuardService]
            },
            {
                path: 'supplier',
                loadChildren: () => import('./supplier/supplier.module').then((m) => m.SupplierModule),
                canActivate: [PermissionGuardService]
            },
            {
                path: 'reports',
                loadChildren: () => import('./report/report.module').then((m) => m.ReportModule),
                canActivate: [PermissionGuardService]
            },
            {
                path: 'admin',
                loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
                canActivate: [PermissionGuardService]
            },
            {
                path: 'change-password',
                loadChildren: () => import('./change-password/change-password.module').then((m) => m.ChangePasswordModule),
                canActivate: [PermissionGuardService]
            },
            {
                path: 'admin-level',
                loadChildren: () => import('./admin-level/admin-level.module').then((m) => m.AdminLevelModule),
                canActivate: [PermissionGuardService]
            },

            { path: 'todos', component: TodoComponent },
            { path: 'todo-detail/:id', component: TodoDetailComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
