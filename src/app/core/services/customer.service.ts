import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Customer } from '../models/customer';
import { ApiService } from './api.service';
import { MessageService } from './message.service'

@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BehaviorSubject<GridDataResult> {

    public gridLoading: boolean;

    constructor(
        private messageService: MessageService,
        private apiservice: ApiService,
    ) {
        super(null);
    }

    getCustomers(): Observable<Customer[]> {
        this.messageService.add('CustomerService: fetched customers');
        return this.apiservice.get("/customer");
    }

    getCustomer(id: number): Observable<Customer> {
        this.messageService.add(`CustomerService: fetched Customer id=${id}`);
        return this.apiservice.get(`/customer/${id}`);
    }

    // getCustomerGrid(girdState: DataSourceRequestState): Observable<GridDataResult> {
    //     return this.apiservice.fetchgridpostJson('/customer/showlist/', girdState);
    // }

    // ? For Grid Loading
    getCustomerGrid(girdState: DataSourceRequestState) {
        this.gridLoading = true;
        return this.apiservice.fetchgridpostJson('/customer/showlist', girdState)
            .subscribe(x => {
                super.next(x);
                this.gridLoading = false;
            });
    }

    getCustomerReport(girdState: DataSourceRequestState, filterSet: any) {
        this.gridLoading = true;
        return this.apiservice.fetchgridpostJsonData('/customer/report', girdState, filterSet)
            .subscribe(x => {
                super.next(x);
                this.gridLoading = false;
            });
    }

    // ? PUT: update the customer on the server
    updateCustomer(Customer: Customer): Observable<any> {
        this.messageService.add(`CustomerService: update Customer =${Customer.CustomerName}`);
        return this.apiservice.putJson('/customer/updatecustomer/' + Customer.Id, Customer);
    }

    // ? POST: add a new customer to the server
    addCustomer(Customer: Customer): Observable<Customer> {
        this.messageService.add(`CustomerService: add Customer =${Customer.CustomerName}`);
        return this.apiservice.postJson('/customer/addcustomer', Customer);
    }

    // ? DELETE: delete the customer from the server
    deleteCustomer(id: number): Observable<Customer> {
        this.messageService.add(`CustomerService: delete Customer id=${id}`);
        return this.apiservice.delete('/customer/deletecustomer/' + id);
    }

    // ? GET employees whose name contains search term
    searchCustomeres(term: string): Observable<Customer[]> {
        if (!term.trim()) {
            // if not search term, return empty Customer array.
            return of([]);
        }

        this.messageService.add('CustomerService: search employees');
        return this.apiservice.postJson("/customer/search/", term);
    }

    getImagePath(id: number): Observable<any> {
        const base64 = btoa(id.toString())

        return this.apiservice.get(`/fileservice/download/CustomerPhoto/${base64}`);
    }

    deleteCustomerPhoto(id: number): Observable<any> {
        const base64 = btoa(id.toString())

        return this.apiservice.postJson(`/fileservice/remove/CustomerPhoto/${base64}`, '');
    }
}
