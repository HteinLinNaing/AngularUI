import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IntlService } from '@progress/kendo-angular-intl';
import { Supplier } from '../../core/models/supplier';
import { SupplierType } from '../../core/models/supplier-type';
import { SupplierTypeService } from '../../core/services/supplier-type.service';

@Component({
    selector: 'app-supplier-dialog',
    templateUrl: './supplier-dialog.component.html',
    styleUrls: ['./supplier-dialog.component.scss']
})
export class SupplierDialogComponent {
    suppliertypes: SupplierType[];
    supplierformGroup: FormGroup;
    active = false;

    @Input() public isNew = false;

    @Input() public set model(supplierobj: Supplier) {

        if (supplierobj !== undefined) {
            if (supplierobj.Id == undefined)  //New, can't use isNew flag because of delay of Input.
            {
                this.supplierformGroup = new FormGroup({
                    SupplierName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
                    RegisterDate: new FormControl(new Date()),
                    SupplierAddress: new FormControl(''),
                    SupplierTypeId: new FormControl(0)
                });
            }
            else {  //Edit
                this.supplierformGroup = new FormGroup({
                    Id: new FormControl(supplierobj.Id),
                    SupplierName: new FormControl(supplierobj.SupplierName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
                    RegisterDate: new FormControl(this.intl.parseDate(this.intl.formatDate(supplierobj.RegisterDate, 'yyyy-MM-dd'))),
                    SupplierAddress: new FormControl(supplierobj.SupplierAddress),
                    SupplierTypeId: new FormControl(supplierobj.SupplierTypeId)
                });
            }
        }

        this.active = supplierobj !== undefined;
    }
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Supplier> = new EventEmitter();

    constructor(
        private suppliertypeService: SupplierTypeService,
        private intl: IntlService
    ) { }

    ngOnInit(): void {
        this.suppliertypeService.getSupplierTypes().subscribe(resdepts => this.suppliertypes = resdepts);
    }


    public onSave(e): void {
        e.preventDefault();
        var regDate = new Date(this.supplierformGroup.value.RegisterDate.getTime() - (this.supplierformGroup.value.RegisterDate.getTimezoneOffset() * 60000));  // localtimemilisecond - (utcoffsetminute * 60 * 1000)
        this.supplierformGroup.patchValue({ RegisterDate: regDate });
        this.save.emit(this.supplierformGroup.getRawValue());
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
