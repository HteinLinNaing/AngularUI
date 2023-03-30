import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAddComponent } from './customer-add.component';
import { CustomerDetailComponent } from './customer-detail.component';
import { CustomerInlineComponent } from './customer-inline.component';
import { CustomerListComponent } from './customer-list.component';

const routes: Routes = [
    { path: '', component: CustomerListComponent },
    { path: 'add', component: CustomerAddComponent },
    { path: 'inline', component: CustomerInlineComponent },
    { path: 'detail/:id', component: CustomerDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
