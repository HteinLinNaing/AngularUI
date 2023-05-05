import { Component } from '@angular/core';
import { SupplierService } from '../../core/services/supplier.service';
import { MessageService } from '../../core/services/message.service';
import { Supplier } from '../../core/models/supplier';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent {
    public suppliergrid: Observable<GridDataResult>;
    suppliers: Supplier[] = [];
    public supplierDataItem: Supplier;
    public isNew: boolean;
    itemToRemove: any;

    public gridState: DataSourceRequestState = {
        skip: 0,
        take: 5,
        filter: { logic: 'and', filters: [] }
    };

    constructor(private supplierService: SupplierService, private messageService: MessageService) { }

    ngOnInit() {
        const currentState = localStorage.getItem('MySupplierState');
        if (currentState != null) {
            this.gridState = JSON.parse(currentState);
        } else {
            localStorage.setItem('MySupplierState', JSON.stringify(this.gridState));
        }
        this.getSuppliers();
    }

    getSuppliers(): void {
        this.suppliergrid = this.supplierService;
        this.supplierService.getSupplierGrid(this.gridState);
    }

    delete(supplier: Supplier): void {
        this.suppliers = this.suppliers.filter(h => h !== supplier);
        this.supplierService.deleteSupplier(supplier.Id).subscribe();
    }

    public addHandler({ sender }) {
        this.isNew = true;
        this.supplierDataItem = new Supplier();
    }

    public editHandler({ sender, rowIndex, dataItem }) {
        this.isNew = false;
        this.supplierDataItem = dataItem;

    }

    public cancelHandler() {
        this.supplierDataItem = undefined;
    }

    public saveHandler(supplier: Supplier) {
        if (this.isNew) {
            this.supplierService.addSupplier(supplier)
                .subscribe(ressupplier => {
                    this.getSuppliers();
                });
        } else {
            this.supplierService.updateSupplier(supplier)
                .subscribe(ressupplier => {
                    this.getSuppliers();
                });
        }
        this.supplierDataItem = undefined;
    }

    public removeHandler({ dataItem }) {
        this.itemToRemove = dataItem;
    }

    public confirmRemove(shouldRemove: boolean): void {
        if (shouldRemove) {
            this.supplierService.deleteSupplier(this.itemToRemove.Id).subscribe(deletestatus => {
                this.getSuppliers();
                console.log(deletestatus);
            });
        }

        this.itemToRemove = null;
    }

    onStateChange(dstate: DataStateChangeEvent): void {
        //console.log(dstate);
        this.gridState = dstate;
        localStorage.setItem('MySupplierState', JSON.stringify(this.gridState));
        this.getSuppliers();
    }

    public clearfilter(): void {
        this.gridState.skip = 0;
        this.gridState.filter = { logic: 'and', filters: [] };
        localStorage.setItem('MySupplierState', JSON.stringify(this.gridState));
        this.getSuppliers();
    }
}
