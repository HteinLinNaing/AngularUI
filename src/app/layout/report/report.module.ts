import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { CustomerReportComponent } from './customer-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';


@NgModule({
    declarations: [
        CustomerReportComponent
    ],
    imports: [
        CommonModule,
        ReportRoutingModule,
        FormsModule,
        GridModule,
        DropDownListModule,
        ReactiveFormsModule,
        DatePickerModule
    ]
})
export class ReportModule { }
