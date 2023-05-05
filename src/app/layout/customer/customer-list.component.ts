import { Component } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { Customer } from '../../core/models/customer';
import { CustomerService } from '../../core/services/customer.service';
import { MessageService } from '../../core/services/message.service';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
    // public customergrid: GridDataResult;
    public customergrid: Observable<GridDataResult>;
    customers: Customer[] = [];
    public customerDataItem: Customer;
    public isNew: boolean;
    itemToRemove: any;

    public gridState: DataSourceRequestState = {
        skip: 0,
        take: 5,
        filter: { logic: 'and', filters: [] }
    };

    constructor(private customerService: CustomerService, private messageService: MessageService) { }

    ngOnInit() {
        const currentState = localStorage.getItem('MyCustomerState');
        if (currentState != null) {
            this.gridState = JSON.parse(currentState);
        } else {
            localStorage.setItem('MyCustomerState', JSON.stringify(this.gridState));
        }
        this.getCustomers();
    }

    getCustomers(): void {
        // this.customerService.getCustomerGrid(this.gridState)
        //     .subscribe(rescustomers => this.customergrid = rescustomers);
        this.customergrid = this.customerService;
        this.customerService.getCustomerGrid(this.gridState);
    }

    delete(customer: Customer): void {
        this.customers = this.customers.filter(h => h !== customer);
        this.customerService.deleteCustomer(customer.Id).subscribe();
    }

    public addHandler({ sender }) {
        this.isNew = true;
        this.customerDataItem = new Customer();
    }

    public editHandler({ sender, rowIndex, dataItem }) {
        this.isNew = false;
        this.customerDataItem = dataItem;

    }

    public cancelHandler() {
        this.customerDataItem = undefined;
    }

    public saveHandler(customer: Customer) {
        if (this.isNew) {
            this.customerService.addCustomer(customer)
                .subscribe(rescustomer => {
                    this.getCustomers();
                });
        } else {
            this.customerService.updateCustomer(customer)
                .subscribe(rescustomer => {
                    this.getCustomers();
                });
        }
        this.customerDataItem = undefined;
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

    onStateChange(dstate: DataStateChangeEvent): void {
        //console.log(dstate);
        this.gridState = dstate;
        localStorage.setItem('MyCustomerState', JSON.stringify(this.gridState));
        this.getCustomers();
    }

    public clearfilter(): void {
        this.gridState.skip = 0;
        this.gridState.filter = { logic: 'and', filters: [] };
        localStorage.setItem('MyCustomerState', JSON.stringify(this.gridState));
        this.getCustomers();
    }
}
