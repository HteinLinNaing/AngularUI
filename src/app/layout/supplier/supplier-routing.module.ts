import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierAddComponent } from './supplier-add.component';
import { SupplierDetailComponent } from './supplier-detail.component';
import { SupplierInlineComponent } from './supplier-inline.component';
import { SupplierListComponent } from './supplier-list.component';

const routes: Routes = [
    { path: '', component: SupplierListComponent },
    { path: 'add', component: SupplierAddComponent },
    { path: 'inline', component: SupplierInlineComponent },
    { path: 'detail/:id', component: SupplierDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SupplierRoutingModule { }
