import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminListComponent } from './admin-list.component';
import { AdminDetailComponent } from './admin-detail.component';
import { AdminAddComponent } from './admin-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AdminResetPasswordComponent } from './admin-reset-password.component';


@NgModule({
    declarations: [
        AdminListComponent,
        AdminDetailComponent,
        AdminAddComponent,
        AdminResetPasswordComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        ButtonModule,
        DropDownListModule,
        UploadsModule,
        DatePickerModule,
        GridModule,
        NgxPermissionsModule,
        DialogModule,
        InputsModule,
    ]
})
export class AdminModule { }
