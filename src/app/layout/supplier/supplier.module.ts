import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierListComponent } from './supplier-list.component';
import { SupplierDetailComponent } from './supplier-detail.component';
import { SupplierAddComponent } from './supplier-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { SupplierDialogComponent } from './supplier-dialog.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { SupplierInlineComponent } from './supplier-inline.component';


@NgModule({
    declarations: [
        SupplierListComponent,
        SupplierDetailComponent,
        SupplierAddComponent,
        SupplierDialogComponent,
        SupplierInlineComponent
    ],
    imports: [
        CommonModule,
        SupplierRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        DropDownListModule,
        GridModule,
        DialogModule,
        DatePickerModule
    ]
})
export class SupplierModule { }
