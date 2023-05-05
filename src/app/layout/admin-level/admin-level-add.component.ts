import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminLevelService } from '../../core/services/admin-level.service';

@Component({
    selector: 'app-admin-level-add',
    templateUrl: './admin-level-add.component.html',
    styleUrls: ['./admin-level-add.component.scss']
})
export class AdminLevelAddComponent {
    adminLevelAdd: FormGroup;

    @Output() addHandlerEvent = new EventEmitter<boolean>();

    constructor(
        private adminLevelService: AdminLevelService
    ) { }

    ngOnInit(): void {
        this.adminLevelAdd = new FormGroup({
            AdminLevelName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            Description: new FormControl(''),
            Remark: new FormControl(''),
            CreateDate: new FormControl(new Date)
        });
    }

    submitAdminLevel(): void {
        this.adminLevelService.addAdminLevel(this.adminLevelAdd.value)
            .subscribe(() => {
                this.addHandlerEvent.emit(false);
            });
    }

    goBack(event: Event): void {
        event.preventDefault();
        this.addHandlerEvent.emit(false);
    }
}
