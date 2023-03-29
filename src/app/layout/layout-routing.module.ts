import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { TodoDetailComponent } from './todo/todo-detail.component';
import { TodoComponent } from './todo/todo.component';

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
                loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule)
            },
            {
                path: 'supplier',
                loadChildren: () => import('./supplier/supplier.module').then((m) => m.SupplierModule)
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
