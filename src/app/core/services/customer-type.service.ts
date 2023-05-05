import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerType } from '../models/customer-type';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerTypeService {

    constructor(
        private apiService: ApiService,
    ) { }

    getCustomerTypes(): Observable<CustomerType[]> {
        return this.apiService.get('/customertype');
    }
}
