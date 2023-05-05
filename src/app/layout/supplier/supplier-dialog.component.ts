import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IntlService } from '@progress/kendo-angular-intl';
import { Supplier } from '../../core/models/supplier';
import { SupplierType } from '../../core/models/supplier-type';
import { SupplierTypeService } from '../../core/services/supplier-type.service';
import { Globalfunction } from '../../core/global/globalfunction';
import { environment } from '../../../environments/environment';
import { FileRestrictions } from '@progress/kendo-angular-upload';
import { SupplierService } from '../../core/services/supplier.service';

@Component({
    selector: 'app-supplier-dialog',
    templateUrl: './supplier-dialog.component.html',
    styleUrls: ['./supplier-dialog.component.scss']
})
export class SupplierDialogComponent {
    suppliertypes: SupplierType[];
    supplierformGroup: FormGroup;
    active = false;

    public uploadRestrictions: FileRestrictions = {
        allowedExtensions: ['.jpg', '.png', '.jpeg']
    };

    uploadSaveUrl: string = "";
    uploadRemoveUrl: string = "";
    photoToRemove: any;
    tempdir: string = "-";
    previewImage: {};

    public globalfunction: Globalfunction = new Globalfunction();

    @Input() public isNew = false;

    @Input() public set model(supplierobj: Supplier) {

        if (supplierobj !== undefined) {
            if (supplierobj.Id == undefined)  //New, can't use isNew flag because of delay of Input.
            {
                this.supplierformGroup = new FormGroup({
                    SupplierName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
                    RegisterDate: new FormControl(new Date()),
                    SupplierAddress: new FormControl(''),
                    SupplierTypeId: new FormControl(0),
                    SupplierPhoto: new FormControl('')
                });
            }
            else {  //Edit
                // this.previewImage = {};
                this.supplierService.getImagePath(supplierobj.Id)
                    .subscribe(resimage => {
                        this.previewImage = resimage;
                    });
                this.supplierformGroup = new FormGroup({
                    Id: new FormControl(supplierobj.Id),
                    SupplierName: new FormControl(supplierobj.SupplierName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
                    RegisterDate: new FormControl(this.intl.parseDate(this.intl.formatDate(supplierobj.RegisterDate, 'yyyy-MM-dd'))),
                    SupplierAddress: new FormControl(supplierobj.SupplierAddress),
                    SupplierTypeId: new FormControl(supplierobj.SupplierTypeId),
                    SupplierPhoto: new FormControl('')
                });
            }
        }

        this.active = supplierobj !== undefined;
    }
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Supplier> = new EventEmitter();

    constructor(
        private suppliertypeService: SupplierTypeService,
        private intl: IntlService,
        private supplierService: SupplierService,
    ) { }

    ngOnInit(): void {
        this.uploadSaveUrl = `${environment.file_api_url}` + '/Upload/TempDir';
        this.uploadRemoveUrl = `${environment.file_api_url}` + '/Upload/TempRemoveDir';

        this.suppliertypeService.getSupplierTypes().subscribe(resdepts => this.suppliertypes = resdepts);
    }


    public onSave(e): void {
        e.preventDefault();
        var regDate = new Date(this.supplierformGroup.value.RegisterDate.getTime() - (this.supplierformGroup.value.RegisterDate.getTimezoneOffset() * 60000));  // localtimemilisecond - (utcoffsetminute * 60 * 1000)

        if (this.supplierformGroup.value.SupplierPhoto != null || this.supplierformGroup.value.SupplierPhoto != "") {
            this.supplierformGroup.patchValue({ SupplierPhoto: this.tempdir });
        }

        this.supplierformGroup.patchValue({ RegisterDate: regDate });
        this.save.emit(this.supplierformGroup.getRawValue());
        this.active = false;
    }

    public uploadEventHandler(e) {  //to add unique temp dir as parameter when upload
        console.log(e);
        e.data = {
            tempdir: this.tempdir,
            enFile: this.globalfunction.encryptData(e.files[0].name)
        };
    }

    public removeEventHandler(e) {  //to clear temp file
        e.data = {
            tempdir: this.tempdir,
            tempfile: e.files[0].myUid
        };  //to add unique temp dir as parameter when remove
    }

    public successEventHandler(e) {
        //when the same file name upload, it will overwrite existing.
        if (e.operation == 'upload') {
            this.tempdir = e.response.body.TempDir;
            e.files[0].myUid = e.response.body.TempFile;  //store encrypted temp file name
        }
    }

    public deleteImageHandler(e, filename) {
        // console.log('delete handler')
        console.log(this.previewImage);
        // console.log(filename);
        this.photoToRemove = filename;
        console.log(this.photoToRemove.value.tempFile);

        e.preventDefault();
    }

    public confirmPhotoRemove(shouldRemove: boolean): void {

        if (shouldRemove) {
            // console.log(this.photoToRemove);
            this.supplierService.deleteSupplierPhoto(this.supplierformGroup.value.Id, this.photoToRemove.key).subscribe(deletestatus => {
                delete this.previewImage[this.photoToRemove.key];
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
