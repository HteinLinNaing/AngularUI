import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { BehaviorSubject, Observable } from 'rxjs';
import { Supplier } from '../models/supplier';
import { ApiService } from './api.service';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root'
})
export class SupplierService extends BehaviorSubject<GridDataResult> {
    public gridLoading: boolean;

    constructor(
        private messageService: MessageService,
        private apiservice: ApiService,
    ) {
        super(null);
    }

    getSuppliers(): Observable<Supplier[]> {
        this.messageService.add('SupplierService: fetched suppliers');
        return this.apiservice.get("/supplier");
    }

    getSupplier(id: number): Observable<Supplier> {
        this.messageService.add(`SupplierService: fetched Supplier id=${id}`);
        return this.apiservice.get(`/supplier/getsupplier/${id}`);
    }

    getSupplierGrid(girdState: DataSourceRequestState) {
        this.gridLoading = true;
        return this.apiservice.fetchgridpostJson('/supplier/showlist', girdState)
            .subscribe(x => {
                super.next(x);
                this.gridLoading = false;
            });
    }

    // ? PUT: update the supplier on the server
    updateSupplier(Supplier: Supplier): Observable<any> {
        this.messageService.add(`SupplierService: update Supplier =${Supplier.SupplierName}`);
        return this.apiservice.putJson('/supplier/updatesupplier/' + Supplier.Id, Supplier);
    }

    /** POST: add a new supplier to the server */
    addSupplier(Supplier: Supplier): Observable<Supplier> {
        this.messageService.add(`SupplierService: add Supplier =${Supplier.SupplierName}`);
        return this.apiservice.postJson('/supplier/addsupplier', Supplier);
    }

    /** DELETE: delete the supplier from the server */
    deleteSupplier(id: number): Observable<Supplier> {
        this.messageService.add(`SupplierService: delete Supplier id=${id}`);
        return this.apiservice.delete('/supplier/deletesupplier/' + id);
    }

    getImagePath(id: number): Observable<string> {
        const encryptdata = btoa(id.toString());  //convert to base64
        return this.apiservice.get('/fileservice/DownloadDir/SupplierPhoto/' + encryptdata);
    }

    deleteSupplierPhoto(id: number, filename: string): Observable<string> {
        const encryptdata = btoa(id.toString());  //convert to base64
        this.messageService.add(`SupplierService: delete Supplier Photo =${id} ${filename}`);
        return this.apiservice.postJson('/fileservice/RemoveDir/SupplierPhoto/' + encryptdata, filename);
    }
}
