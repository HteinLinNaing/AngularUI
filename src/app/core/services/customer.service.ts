import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { catchError, Observable, of, tap } from 'rxjs';
import { Customer } from '../models/customer';
import { ApiService } from './api.service';
import { MessageService } from './message.service'

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private customerUrl = 'http://localhost:3600/api/Customer';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private apiservice: ApiService,
    ) { }

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.customerUrl)
            .pipe(
                tap(_ => this.log('fetched customers')),
                catchError(this.handleError<Customer[]>('getCustomers', []))
            );
    }

    getCustomer(id: number): Observable<Customer> {
        const url = `${this.customerUrl}/${id}`;
        return this.http.get<Customer>(url)
            .pipe(
                tap(_ => this.log(`fetched customer id=${id}`)),
                catchError(this.handleError<Customer>(`get customer id=${id}`))
            );
    }

    getCustomerGrid(girdState: DataSourceRequestState): Observable<GridDataResult> {
        return this.apiservice.fetchgridpostJson('/customer/showlist/', girdState);
    }

    // ? PUT: update the customer on the server
    updateCustomer(customer: Customer): Observable<any> {
        const url = `${this.customerUrl}/${customer.Id}`;
        return this.http.put(url, customer, this.httpOptions).pipe(
            tap(_ => this.log(`updated customer id = ${customer.Id}`)),
            catchError(this.handleError<any>('updateCustomer'))
        );
    }

    /** POST: add a new customer to the server */
    addCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(this.customerUrl, customer, this.httpOptions).pipe(
            tap((newCustomer: Customer) => this.log(`added customer w/ id=${newCustomer.Id}`)),
            catchError(this.handleError<Customer>('addCustomer'))
        );
    }

    /** DELETE: delete the customer from the server */
    deleteCustomer(id: number): Observable<Customer> {
        const url = `${this.customerUrl}/${id}`;

        return this.http.delete<Customer>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted customer id=${id}`)),
            catchError(this.handleError<Customer>('deleteCustomer'))
        );
    }

    // TODO: For Message Services
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`CustomerService: ${message}`);
    }
}
