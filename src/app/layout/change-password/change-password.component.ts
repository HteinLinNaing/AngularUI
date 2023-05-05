import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { Location } from '@angular/common';
import { LocalStorageService } from '../../core/services/localstorage.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
    changePassword: FormGroup;
    adminId: string;
    message: any;

    constructor(
        private adminService: AdminService,
        private location: Location,
        private localStorageService: LocalStorageService,
    ) { }

    ngOnInit(): void {
        this.changePassword = new FormGroup({
            OldPassword: new FormControl('', [Validators.required]),
            Password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            ConfirmPassword: new FormControl(''),
        },
            {
                validators: this.matchingPasswordsValidator
            }
        );
    }

    submitAdmin(): void {
        this.adminService.changePassword(this.changePassword.value)
            .subscribe(
                response => this.message = response
            );
    }

    goBack(event: Event): void {
        event.preventDefault();
        this.location.back();
        this.message = "";
    }

    // ? Password Match
    matchingPasswordsValidator(control: AbstractControl): { [key: string]: any } | null {
        const password = control.get('Password');
        const confirmPassword = control.get('ConfirmPassword');

        if (password.value !== confirmPassword.value) {
            return { 'passwordMismatch': true };
        }
        return null;
    }

    getNumbersFromString(str: string): string {
        return str.replace(/[^0-9]/g, '');
    }
}
