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
import { CustomerDialogComponent } from './customer-dialog.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { CustomerInlineComponent } from './customer-inline.component';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
    declarations: [
        CustomerListComponent,
        CustomerAddComponent,
        CustomerDetailComponent,
        CustomerDialogComponent,
        CustomerInlineComponent,
    ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        GridModule,
        DropDownListModule,
        DialogModule,
        DatePickerModule,
        UploadsModule,
        InputsModule,
        ProgressBarModule,
        NgxPermissionsModule
    ]
})
export class CustomerModule { }
