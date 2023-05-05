import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { MessageService } from './message.service';
import { Admin } from '../models/admin';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Injectable({
    providedIn: 'root'
})
export class AdminService extends BehaviorSubject<GridDataResult> {
    public gridLoading: boolean;

    constructor(
        private apiservice: ApiService,
        private messageService: MessageService
    ) {
        super(null);
    }

    getProfileImage(): Observable<string> {
        return this.apiservice.get('/fileservice/ProfilePhoto/');
    }

    getAdmins(): Observable<Admin[]> {
        this.messageService.add('AdminService: fetched admins');
        return this.apiservice.get("/admin");
    }

    getAdmin(id: number): Observable<Admin> {
        this.messageService.add(`AdminService: fetched Admin id=${id}`);
        return this.apiservice.get(`/admin/getadmin/${id}`);
    }

    // getAdminGrid(girdState: DataSourceRequestState): Observable<GridDataResult> {
    //     return this.apiservice.fetchgridpostJson('/admin/showlist/', girdState);
    // }

    // ? For Grid Loading
    getAdminGrid(girdState: DataSourceRequestState) {
        this.gridLoading = true;
        return this.apiservice.fetchgridpostJson('/admin/showlist', girdState)
            .subscribe(x => {
                super.next(x);
                this.gridLoading = false;
            });
    }

    // ? PUT: update the admin on the server
    updateAdmin(Admin: Admin): Observable<any> {
        this.messageService.add(`AdminService: update Admin =${Admin.AdminName}`);
        return this.apiservice.putJson('/admin/updateadmin/' + Admin.Id, Admin);
    }

    // ? POST: add a new admin to the server
    addAdmin(Admin: Admin): Observable<Admin> {
        this.messageService.add(`AdminService: add Admin =${Admin.AdminName}`);
        return this.apiservice.postJson('/admin/addadmin', Admin);
    }

    // ? DELETE: delete the admin from the server
    deleteAdmin(id: number): Observable<Admin> {
        this.messageService.add(`AdminService: delete Admin id=${id}`);
        return this.apiservice.delete('/admin/deleteadmin/' + id);
    }

    // ? GET employees whose name contains search term
    searchAdmines(term: string): Observable<Admin[]> {
        if (!term.trim()) {
            // if not search term, return empty Admin array.
            return of([]);
        }

        this.messageService.add('AdminService: search employees');
        return this.apiservice.postJson("/admin/search/", term);
    }

    getImagePath(id: number): Observable<any> {
        const base64 = btoa(id.toString())

        return this.apiservice.get(`/fileservice/download/AdminPhoto/${base64}`);
    }

    deleteAdminPhoto(id: number): Observable<any> {
        const base64 = btoa(id.toString())

        return this.apiservice.postJson(`/fileservice/remove/AdminPhoto/${base64}`, '');
    }

    changeStatus(admin: Admin): Observable<any> {
        return this.apiservice.putJson('/Admin/ChangeStatus/' + admin.Id, admin);
    }

    resetPassword(admin: Admin): Observable<any> {
        return this.apiservice.putJson('/Admin/ResetPassword/' + admin.Id, admin);
    }

    changePassword(admin: Admin): Observable<any> {
        return this.apiservice.putJson('/Admin/ChangePassword', admin);
    }
}
