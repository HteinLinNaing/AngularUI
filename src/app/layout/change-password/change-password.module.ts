import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
    declarations: [
        ChangePasswordComponent
    ],
    imports: [
        CommonModule,
        ChangePasswordRoutingModule,
        ReactiveFormsModule,
        ButtonModule,
        InputsModule,
        NgxPermissionsModule
    ]
})
export class ChangePasswordModule { }
