import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list.component';
import { CustomerAddComponent } from './customer-add.component';
import { CustomerDetailComponent } from './customer-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';


@NgModule({
    declarations: [
        CustomerListComponent,
        CustomerAddComponent,
        CustomerDetailComponent
    ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        GridModule,
        DropDownListModule,
    ]
})
export class CustomerModule { }
