import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLevelRoutingModule } from './admin-level-routing.module';
import { AdminLevelListComponent } from './admin-level-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonModule, ButtonsModule } from '@progress/kendo-angular-buttons';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { AdminLevelAddComponent } from './admin-level-add.component';
import { AdminLevelDetailComponent } from './admin-level-detail.component';


@NgModule({
    declarations: [
        AdminLevelListComponent,
        AdminLevelAddComponent,
        AdminLevelDetailComponent,
    ],
    imports: [
        CommonModule,
        AdminLevelRoutingModule,
        ReactiveFormsModule,
        DropDownListModule,
        TreeViewModule,
        InputsModule,
        ButtonsModule,
        ButtonModule,
        NgxPermissionsModule,
        DialogModule,
        DatePickerModule
    ]
})
export class AdminLevelModule { }
