import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../core/models/customer';
import { CustomerType } from '../../core/models/customer-type';
import { CustomerTypeService } from '../../core/services/customer-type.service';
import { IntlService } from '@progress/kendo-angular-intl';
import { Globalfunction } from '../../core/global/globalfunction';
import { environment } from '../../../environments/environment';
import { CustomerService } from '../../core/services/customer.service';

@Component({
    selector: 'app-customer-dialog',
    templateUrl: './customer-dialog.component.html',
    styleUrls: ['./customer-dialog.component.scss']
})
export class CustomerDialogComponent {
    customertypes: CustomerType[];
    customerformGroup: FormGroup;
    active = false;

    tempImage: string = "";
    previewImage: string = "";
    uploadSaveUrl: string = "";
    uploadRemoveUrl: string = "";
    photoToRemove: string = "";

    public globalfunction: Globalfunction = new Globalfunction();

    @Input() public isNew = false;

    @Input() public set model(customerobj: Customer) {

        if (customerobj !== undefined) {
            if (customerobj.Id == undefined)  //New, can't use isNew flag because of delay of Input.
            {
                this.customerformGroup = new FormGroup({
                    CustomerName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
                    RegisterDate: new FormControl(new Date()),
                    CustomerAddress: new FormControl(''),
                    CustomerTypeId: new FormControl(0),
                    CustomerPhoto: new FormControl('')
                });
            }
            else {  //Edit
                this.customerService.getImagePath(customerobj.Id)
                    .subscribe(resimage => {
                        this.previewImage = resimage;
                    });

                this.customerformGroup = new FormGroup({
                    Id: new FormControl(customerobj.Id),
                    CustomerName: new FormControl(customerobj.CustomerName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
                    RegisterDate: new FormControl(this.intl.parseDate(this.intl.formatDate(customerobj.RegisterDate, 'yyyy-MM-dd'))),
                    CustomerAddress: new FormControl(customerobj.CustomerAddress),
                    CustomerTypeId: new FormControl(customerobj.CustomerTypeId),
                    CustomerPhoto: new FormControl("")
                });
            }
        }

        this.active = customerobj !== undefined;
    }
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Customer> = new EventEmitter();

    constructor(
        private customertypeService: CustomerTypeService,
        private intl: IntlService,
        private customerService: CustomerService,
    ) { }

    ngOnInit(): void {

        this.uploadSaveUrl = `${environment.file_api_url}` + '/Upload/Temp';
        this.uploadRemoveUrl = `${environment.file_api_url}` + '/Upload/TempRemove';

        this.customertypeService.getCustomerTypes().subscribe(resdepts => this.customertypes = resdepts);
    }


    public onSave(e): void {
        e.preventDefault();
        var regDate = new Date(this.customerformGroup.value.RegisterDate.getTime() - (this.customerformGroup.value.RegisterDate.getTimezoneOffset() * 60000));
        // localtimemilisecond - (utcoffsetminute * 60 * 1000)

        if (this.customerformGroup.value.CustomerPhoto != null && this.customerformGroup.value.CustomerPhoto != "") {
            this.customerformGroup.patchValue({ CustomerPhoto: this.tempImage });
        }

        this.customerformGroup.patchValue({ RegisterDate: regDate });
        this.save.emit(this.customerformGroup.getRawValue());
        this.active = false;
    }

    public uploadEventHandler(e) {  //to add unique temp dir as parameter when upload
        const encData = this.globalfunction.encryptData(e.files[0].name);
        e.data = {
            enFile: encData
        };
    }

    public removeEventHandler(e) {  //to clear temp file
        e.files[0].name = this.tempImage;  //replace original file name with unique temp file name
    }

    public successEventHandler(e) {
        if (e.operation == 'upload')
            this.tempImage = e.response.body;
    }

    public deleteImageHandler(e) {
        this.photoToRemove = "CustomerPhoto";
        e.preventDefault();
    }

    public confirmPhotoRemove(shouldRemove: boolean): void {

        if (shouldRemove) {
            this.customerService.deleteCustomerPhoto(this.customerformGroup.value.Id).subscribe(deletestatus => {
                this.previewImage = "";
                this.photoToRemove = null;
            });
        }
        else {
            this.photoToRemove = null;
        }
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
