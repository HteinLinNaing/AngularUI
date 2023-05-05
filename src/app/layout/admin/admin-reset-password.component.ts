import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-admin-reset-password',
    templateUrl: './admin-reset-password.component.html',
    styleUrls: ['./admin-reset-password.component.scss']
})
export class AdminResetPasswordComponent {
    adminResetPassword: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adminService: AdminService,
        private location: Location
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.adminResetPassword = new FormGroup({
            Id: new FormControl(id),
            Password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            ConfirmPassword: new FormControl(''),
        },
            {
                validators: this.matchingPasswordsValidator
            }
        );
    }

    submitAdmin(): void {
        this.adminService.resetPassword(this.adminResetPassword.value)
            .subscribe(resadmin => {
                this.router.navigate(['/admin']);
            });
    }

    goBack(event: Event): void {
        event.preventDefault();
        this.location.back();
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
}
