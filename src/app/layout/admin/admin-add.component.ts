import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';
import { AdminLevel } from '../../core/models/admin-level';
import { AdminLevelService } from '../../core/services/admin-level.service';
import { Location } from '@angular/common';
import { Globalfunction } from '../../core/global/globalfunction';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-admin-add',
    templateUrl: './admin-add.component.html',
    styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent {
    adminlevel: AdminLevel[];
    adminAdd: FormGroup;

    tempImage: string = "";
    uploadSaveUrl: string = "";
    uploadRemoveUrl: string = "";

    public globalfunction: Globalfunction = new Globalfunction();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adminService: AdminService,
        private adminLevelService: AdminLevelService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.uploadSaveUrl = `${environment.file_api_url}` + '/Upload/Temp';
        this.uploadRemoveUrl = `${environment.file_api_url}` + '/Upload/TempRemove';

        this.adminLevelService.getAdminLevels().subscribe(resdepts => this.adminlevel = resdepts);

        this.adminAdd = new FormGroup({
            AdminName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            Email: new FormControl(''),
            LoginName: new FormControl(''),
            Password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            ConfirmPassword: new FormControl(''),
            AdminLevelId: new FormControl(0),
            AdminPhoto: new FormControl(''),
        },
            {
                validators: this.matchingPasswordsValidator
            }
        );
    }

    submitAdmin(): void {
        if (this.adminAdd.value.AdminPhoto != null)
            this.adminAdd.patchValue({ AdminPhoto: this.tempImage });

        this.adminService.addAdmin(this.adminAdd.value)
            .subscribe(resadmin => {
                this.router.navigate(['/admin']);
            });
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
