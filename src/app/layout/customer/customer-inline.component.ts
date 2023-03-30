import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { IntlService } from '@progress/kendo-angular-intl';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { CustomerTypeService } from '../../core/services/customer-type.service';
import { Customer } from '../../core/models/customer';
import { CustomerType } from '../../core/models/customer-type';
import { CustomerService } from '../../core/services/customer.service';

@Component({
    selector: 'app-customer-inline',
    templateUrl: './customer-inline.component.html',
    styleUrls: ['./customer-inline.component.scss']
})
export class CustomerInlineComponent {
    public customergrid: GridDataResult;
    public itemToRemove: any;
    public customerDataItem: Customer;
    public isNew: boolean;
    public customerformGroup: FormGroup;
    public editedRowIndex: number;
    public customertypes: CustomerType[];

    public gridState: DataSourceRequestState = {
        skip: 0,
        take: 5,
        filter: { logic: 'and', filters: [] },
    };

    constructor(
        private customerService: CustomerService,
        private customerTypeService: CustomerTypeService,
        private router: Router,
        private intl: IntlService
    ) { }

    ngOnInit() {
        this.customerTypeService.getCustomerTypes().subscribe(resdepts => this.customertypes = resdepts);

        const currentState = localStorage.getItem('MyCustomerInlineState');
        if (currentState != null) {
            this.gridState = JSON.parse(currentState);
        } else {
            localStorage.setItem('MyCustomerInlineState', JSON.stringify(this.gridState));
        }
        this.getCustomers();
    }

    getCustomers(): void {
        this.customerService.getCustomerGrid(this.gridState)
            .subscribe(rescustomers => this.customergrid = rescustomers);
        // this.customergrid = this.customerService;
        // this.customerService.getCustomerGrid(this.gridState);
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.customerformGroup = undefined;
    }

    public addHandler({ sender }) {
        this.closeEditor(sender);

        this.customerformGroup = new FormGroup({
            CustomerName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            RegisterDate: new FormControl(new Date()),
            CustomerAddress: new FormControl(''),
            CustomerTypeId: new FormControl(0)
        });
        sender.addRow(this.customerformGroup);

    }


    public editHandler({ sender, rowIndex, dataItem }) {
        this.closeEditor(sender);
        this.customerformGroup = new FormGroup({
            Id: new FormControl(dataItem.Id),
            CustomerName: new FormControl(dataItem.CustomerName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            RegisterDate: new FormControl(this.intl.parseDate(this.intl.formatDate(dataItem.RegisterDate, 'yyyy-MM-dd'))),
            CustomerAddress: new FormControl(dataItem.CustomerAddress),
            CustomerTypeId: new FormControl(dataItem.CustomerTypeId)
        });

        this.editedRowIndex = rowIndex;
        sender.editRow(rowIndex, this.customerformGroup);
    }

    public cancelHandler({ sender, rowIndex }) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({ sender, rowIndex, formGroup, isNew }) {
        if (isNew) {
            this.customerService.addCustomer(this.customerformGroup.value)
                .subscribe(rescustomer => {
                    this.getCustomers();
                });
        } else {
            this.customerService.updateCustomer(this.customerformGroup.value)
                .subscribe(rescustomer => {
                    this.getCustomers();
                });
        }
        sender.closeRow(rowIndex);
    }

    public removeHandler({ dataItem }) {
        this.itemToRemove = dataItem;
    }

    public confirmRemove(shouldRemove: boolean): void {
        if (shouldRemove) {
            this.customerService.deleteCustomer(this.itemToRemove.Id).subscribe(deletestatus => {
                this.getCustomers();
                console.log(deletestatus);
            });
        }
        this.itemToRemove = null;
    }

    detail(Customer: Customer): void {
        this.router.navigate(['/customer/' + Customer.Id]);
    }

    onStateChange(dstate: DataStateChangeEvent): void {
        //console.log(dstate);
        this.gridState = dstate;
        localStorage.setItem('MyCustomerInlineState', JSON.stringify(this.gridState));
        this.getCustomers();
    }
}
