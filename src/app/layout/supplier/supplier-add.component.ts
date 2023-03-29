import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierTypeService } from '../../core/services/supplier-type.service';
import { SupplierService } from '../../core/services/supplier.service';
import { SupplierType } from '../../core/models/supplier-type';
import { Location } from '@angular/common';

@Component({
    selector: 'app-supplier-add',
    templateUrl: './supplier-add.component.html',
    styleUrls: ['./supplier-add.component.scss']
})
export class SupplierAddComponent {
    suppliertypes: SupplierType[];
    supplierAdd: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private supplierService: SupplierService,
        private suppliertypeService: SupplierTypeService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.suppliertypeService.getSupplierTypes().subscribe(resdepts => this.suppliertypes = resdepts);
        this.supplierAdd = new FormGroup({
            SupplierName: new FormControl(''),
            SupplierAddress: new FormControl(''),
            SupplierTypeId: new FormControl(0)
        });
    }


    submitSupplier(): void {
        this.supplierService.addSupplier(this.supplierAdd.value)
            .subscribe(ressupplier => {
                this.router.navigate(['/suppliers']);
            });
    }

    goBack(): void {
        this.location.back();
    }
}
