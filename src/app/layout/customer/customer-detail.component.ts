import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../core/models/customer';
import { CustomerService } from '../../core/services/customer.service';
import { Location } from '@angular/common'
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerType } from '../..//core/models/customer-type';
import { CustomerTypeService } from '../../core/services/customer-type.service';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {
    // customer?: Customer;
    customertypes: CustomerType[];
    selectedCustomertype: number;

    customerEdit = this.fb.group({
        Id: [0],
        CustomerName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
        RegisterDate: [new Date],
        CustomerAddress: [''],
        CustomerTypeId: [0],
        CustomerPhoto: ['']
    });

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
        private customertypeService: CustomerTypeService,
        private location: Location,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.customertypeService.getCustomerTypes().subscribe(resdepts => this.customertypes = resdepts);
        this.getCustomer();
    }

    getCustomer(): void {
        const id = +this.route.snapshot.paramMap.get('id');

        // console.log(this.customerEdit.value);

        this.customerService.getCustomer(id)
            .subscribe(rescustomer => {
                this.customerEdit.setValue(rescustomer);
                this.selectedCustomertype = rescustomer.CustomerTypeId;
            });

    }


    saveCustomer(): void {
        this.customerService.updateCustomer(this.customerEdit.getRawValue())
            .subscribe(rescustomer => {
                this.router.navigate(['/customers']);
            });
    }

    goBack(): void {
        this.location.back();
    }
}
