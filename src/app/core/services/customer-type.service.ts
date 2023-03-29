import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CustomerType } from '../models/customer-type';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerTypeService {

    private customerTypeUrl = 'http://localhost:3600/api/CustomerType';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
    ) { }

    getCustomerTypes(): Observable<CustomerType[]> {
        return this.http.get<CustomerType[]>(this.customerTypeUrl);
    }
}
