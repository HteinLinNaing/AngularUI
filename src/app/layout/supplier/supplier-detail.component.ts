import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierTypeService } from '../../core/services/supplier-type.service';
import { SupplierService } from '../../core/services/supplier.service';
import { SupplierType } from '../../core/models/supplier-type';
import { Location } from '@angular/common';

@Component({
    selector: 'app-supplier-detail',
    templateUrl: './supplier-detail.component.html',
    styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent {
    suppliertypes: SupplierType[];
    selectedSuppliertype: number;

    supplierEdit = this.fb.group({
        Id: [0],
        SupplierName: [''],
        RegisterDate: [new Date],
        SupplierAddress: [''],
        SupplierTypeId: [0],
        SupplierPhoto: ['']
    });

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private supplierService: SupplierService,
        private suppliertypeService: SupplierTypeService,
        private location: Location,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.suppliertypeService.getSupplierTypes().subscribe(resdepts => this.suppliertypes = resdepts);
        this.getSupplier();
    }

    getSupplier(): void {
        const id = +this.route.snapshot.paramMap.get('id');


        this.supplierService.getSupplier(id)
            .subscribe(ressupplier => {
                this.supplierEdit.setValue(ressupplier);
                this.selectedSuppliertype = ressupplier.SupplierTypeId;
            });
    }

    saveSupplier(): void {
        this.supplierService.updateSupplier(this.supplierEdit.getRawValue())
            .subscribe(ressupplier => {
                this.router.navigate(['/supplier']);
            });
    }

    goBack(): void {
        this.location.back();
    }
}
