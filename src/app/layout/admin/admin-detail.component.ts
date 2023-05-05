import { Component } from '@angular/core';
import { FileRestrictions } from '@progress/kendo-angular-upload';
import { AdminLevel } from '../../core/models/admin-level';
import { Globalfunction } from '../../core/global/globalfunction';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';
import { AdminLevelService } from '../../core/services/admin-level.service';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Component({
    selector: 'app-admin-detail',
    templateUrl: './admin-detail.component.html',
    styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent {
    previewImage: '';
    public uploadRestrictions: FileRestrictions = {
        allowedExtensions: ['.jpg', '.png']
    };
    uploadSaveUrl: string = '';
    uploadRemoveUrl: string = '';
    tempImage: string = '';
    photoToRemove = null;
    adminlevel: AdminLevel[];
    selectedAdminlevel: number;
    public globalfunction: Globalfunction = new Globalfunction();

    adminEdit = this.fb.group({
        Id: [0],
        AdminName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
        Email: [''],
        LoginName: [''],
        AdminLevelId: [0],
        AdminPhoto: [''],
    });



    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adminService: AdminService,
        private adminlevelService: AdminLevelService,
        private location: Location,
        private fb: FormBuilder) { }

    ngOnInit(): void {
        this.uploadSaveUrl = `${environment.file_api_url}` + '/Upload/Temp';
        this.uploadRemoveUrl = `${environment.file_api_url}` + '/Upload/TempRemove';
        this.adminlevelService.getAdminLevels().subscribe(resdepts => this.adminlevel = resdepts);
        this.getAdmin();
    }


    getAdmin(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.previewImage = '';

        this.adminService.getAdmin(id)
            .subscribe(resadmin => {
                this.adminService.getImagePath(id)
                    .subscribe(resimage => {
                        this.previewImage = resimage;
                    });
                this.adminEdit.patchValue(resadmin);
                this.selectedAdminlevel = resadmin.AdminLevelId;
            });

    }

    goBack(event: Event): void {
        event.preventDefault();
        this.location.back();
    }

    saveAdmin(): void {
        if (this.adminEdit.value.AdminPhoto != null && this.adminEdit.value.AdminPhoto != "")
            this.adminEdit.patchValue({ AdminPhoto: this.tempImage });

        this.adminService.updateAdmin(this.adminEdit.getRawValue())
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

    public deleteImageHandler(e) {
        this.photoToRemove = "AdminPhoto";
        e.preventDefault();
    }

    public confirmPhotoRemove(shouldRemove: boolean): void {

        if (shouldRemove) {
            this.adminService.deleteAdminPhoto(this.adminEdit.value.Id).subscribe(deletestatus => {
                this.previewImage = "";
                this.photoToRemove = null;
            });
        }
        else {
            this.photoToRemove = null;
        }
    }
}
