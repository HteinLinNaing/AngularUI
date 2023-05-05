import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerService } from '../../core/services/customer.service';
import { CustomerTypeService } from '../../core/services/customer-type.service';
import { CustomerType } from '../../core/models/customer-type';

@Component({
    selector: 'app-customer-add',
    templateUrl: './customer-add.component.html',
    styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent {
    customertypes: CustomerType[];
    customerAdd: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
        private customertypeService: CustomerTypeService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.customertypeService.getCustomerTypes().subscribe(resdepts => this.customertypes = resdepts);
        this.customerAdd = new FormGroup({
            CustomerName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            CustomerAddress: new FormControl(''),
            CustomerTypeId: new FormControl(0),
            CustomerPhoto: new FormControl(''),
        });
    }

    submitCustomer(): void {
        this.customerService.addCustomer(this.customerAdd.value)
            .subscribe(rescustomer => {
                this.router.navigate(['/customers']);
            });
    }

    goBack(): void {
        this.location.back();
    }
}
