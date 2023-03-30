import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { IntlService } from '@progress/kendo-angular-intl';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { Supplier } from '../../core/models/supplier';
import { SupplierType } from '../../core/models/supplier-type';
import { SupplierTypeService } from '../../core/services/supplier-type.service';
import { SupplierService } from '../../core/services/supplier.service';

@Component({
    selector: 'app-supplier-inline',
    templateUrl: './supplier-inline.component.html',
    styleUrls: ['./supplier-inline.component.scss']
})
export class SupplierInlineComponent {
    public suppliergrid: GridDataResult;
    public itemToRemove: any;
    public supplierDataItem: Supplier;
    public isNew: boolean;
    public supplierformGroup: FormGroup;
    public editedRowIndex: number;
    public suppliertypes: SupplierType[];

    public gridState: DataSourceRequestState = {
        skip: 0,
        take: 5,
        filter: { logic: 'and', filters: [] },
    };

    constructor(
        private supplierService: SupplierService,
        private supplierTypeService: SupplierTypeService,
        private router: Router,
        private intl: IntlService
    ) { }

    ngOnInit() {
        this.supplierTypeService.getSupplierTypes().subscribe(resdepts => this.suppliertypes = resdepts);

        const currentState = localStorage.getItem('MySupplierInlineState');
        if (currentState != null) {
            this.gridState = JSON.parse(currentState);
        } else {
            localStorage.setItem('MySupplierInlineState', JSON.stringify(this.gridState));
        }
        this.getSuppliers();
    }

    getSuppliers(): void {
        this.supplierService.getSupplierGrid(this.gridState)
            .subscribe(ressuppliers => this.suppliergrid = ressuppliers);
        // this.suppliergrid = this.supplierService;
        // this.supplierService.getSupplierGrid(this.gridState);
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.supplierformGroup = undefined;
    }

    public addHandler({ sender }) {
        this.closeEditor(sender);

        this.supplierformGroup = new FormGroup({
            SupplierName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            RegisterDate: new FormControl(new Date()),
            SupplierAddress: new FormControl(''),
            SupplierTypeId: new FormControl(0)
        });
        sender.addRow(this.supplierformGroup);

    }


    public editHandler({ sender, rowIndex, dataItem }) {
        this.closeEditor(sender);
        this.supplierformGroup = new FormGroup({
            Id: new FormControl(dataItem.Id),
            SupplierName: new FormControl(dataItem.SupplierName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            RegisterDate: new FormControl(this.intl.parseDate(this.intl.formatDate(dataItem.RegisterDate, 'yyyy-MM-dd'))),
            SupplierAddress: new FormControl(dataItem.SupplierAddress),
            SupplierTypeId: new FormControl(dataItem.SupplierTypeId)
        });

        this.editedRowIndex = rowIndex;
        sender.editRow(rowIndex, this.supplierformGroup);
    }

    public cancelHandler({ sender, rowIndex }) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({ sender, rowIndex, formGroup, isNew }) {
        if (isNew) {
            this.supplierService.addSupplier(this.supplierformGroup.value)
                .subscribe(ressupplier => {
                    this.getSuppliers();
                });
        } else {
            this.supplierService.updateSupplier(this.supplierformGroup.value)
                .subscribe(ressupplier => {
                    this.getSuppliers();
                });
        }
        sender.closeRow(rowIndex);
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

    detail(Supplier: Supplier): void {
        this.router.navigate(['/supplier/' + Supplier.Id]);
    }

    onStateChange(dstate: DataStateChangeEvent): void {
        //console.log(dstate);
        this.gridState = dstate;
        localStorage.setItem('MySupplierInlineState', JSON.stringify(this.gridState));
        this.getSuppliers();
    }
}
