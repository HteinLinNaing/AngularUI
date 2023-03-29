import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierListComponent } from './supplier-list.component';
import { SupplierDetailComponent } from './supplier-detail.component';
import { SupplierAddComponent } from './supplier-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        SupplierListComponent,
        SupplierDetailComponent,
        SupplierAddComponent
    ],
    imports: [
        CommonModule,
        SupplierRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SupplierModule { }
