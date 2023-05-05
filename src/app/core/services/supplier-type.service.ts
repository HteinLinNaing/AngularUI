import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierType } from '../models/supplier-type';
import { ApiService } from './api.service';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root'
})
export class SupplierTypeService {

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private apiService: ApiService,
    ) { }

    getSupplierTypes(): Observable<SupplierType[]> {
        return this.apiService.get('/suppliertype');
    }
}
