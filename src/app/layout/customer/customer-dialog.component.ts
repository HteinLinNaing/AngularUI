import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../core/models/customer';
import { CustomerType } from '../../core/models/customer-type';
import { CustomerTypeService } from '../../core/services/customer-type.service';
import { IntlService } from '@progress/kendo-angular-intl';

@Component({
    selector: 'app-customer-dialog',
    templateUrl: './customer-dialog.component.html',
    styleUrls: ['./customer-dialog.component.scss']
})
export class CustomerDialogComponent {
    customertypes: CustomerType[];
    customerformGroup: FormGroup;
    active = false;

    @Input() public isNew = false;

    @Input() public set model(customerobj: Customer) {

        if (customerobj !== undefined) {
            if (customerobj.Id == undefined)  //New, can't use isNew flag because of delay of Input.
            {
                this.customerformGroup = new FormGroup({
                    CustomerName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
                    RegisterDate: new FormControl(new Date()),
                    CustomerAddress: new FormControl(''),
                    CustomerTypeId: new FormControl(0)
                });
            }
            else {  //Edit
                this.customerformGroup = new FormGroup({
                    Id: new FormControl(customerobj.Id),
                    CustomerName: new FormControl(customerobj.CustomerName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
                    RegisterDate: new FormControl(this.intl.parseDate(this.intl.formatDate(customerobj.RegisterDate, 'yyyy-MM-dd'))),
                    CustomerAddress: new FormControl(customerobj.CustomerAddress),
                    CustomerTypeId: new FormControl(customerobj.CustomerTypeId)
                });
            }
        }

        this.active = customerobj !== undefined;
    }
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Customer> = new EventEmitter();

    constructor(
        private customertypeService: CustomerTypeService,
        private intl: IntlService
    ) { }

    ngOnInit(): void {
        this.customertypeService.getCustomerTypes().subscribe(resdepts => this.customertypes = resdepts);
    }


    public onSave(e): void {
        e.preventDefault();
        var regDate = new Date(this.customerformGroup.value.RegisterDate.getTime() - (this.customerformGroup.value.RegisterDate.getTimezoneOffset() * 60000));  // localtimemilisecond - (utcoffsetminute * 60 * 1000)
        this.customerformGroup.patchValue({ RegisterDate: regDate });
        this.save.emit(this.customerformGroup.getRawValue());
        this.active = false;
    }

    public onCancel(e): void {
        e.preventDefault();
        this.closeForm();
    }

    private closeForm(): void {
        this.active = false;
        this.cancel.emit();
    }
}
