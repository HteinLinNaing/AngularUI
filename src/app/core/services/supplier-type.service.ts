import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierType } from '../models/supplier-type';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root'
})
export class SupplierTypeService {

    private supplierTypeUrl = 'http://localhost:3600/api/SupplierType';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
    ) { }

    getSupplierTypes(): Observable<SupplierType[]> {
        return this.http.get<SupplierType[]>(this.supplierTypeUrl);
    }
}
