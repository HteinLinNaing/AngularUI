import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLevelService } from '../../core/services/admin-level.service';

@Component({
    selector: 'app-admin-level-detail',
    templateUrl: './admin-level-detail.component.html',
    styleUrls: ['./admin-level-detail.component.scss']
})
export class AdminLevelDetailComponent implements OnInit {

    @Input() adminlevel: any;
    @Output() editHandlerEvent = new EventEmitter<boolean>();

    adminLevelEdit = this.fb.group({
        AdminLevelId: [0],
        AdminLevelName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
        Description: [''],
        Remark: [''],
        ModifiedDate: [new Date()],
    });

    constructor(
        private route: ActivatedRoute,
        private adminlevelService: AdminLevelService,
        private fb: FormBuilder) { }

    ngOnInit(): void {
        this.getAdminLevel();
    }


    getAdminLevel(): void {
        const id = this.adminlevel.AdminLevelId;

        this.adminlevelService.getAdminLevel(id)
            .subscribe(resadmin => {
                this.adminLevelEdit.patchValue(resadmin);
            });
    }

    goBack(event: Event): void {
        event.preventDefault();
        this.editHandlerEvent.emit(false);
    }

    saveAdminLevel(): void {
        this.adminlevelService.updateAdminLevel(this.adminLevelEdit.getRawValue())
            .subscribe(resadmin => {
                this.editHandlerEvent.emit(false);
            });
    }
}
