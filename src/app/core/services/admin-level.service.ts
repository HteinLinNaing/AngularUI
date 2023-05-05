import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminLevel } from '../models/admin-level';
import { ApiService } from './api.service';
import { MessageService } from '../../core/services/message.service';

@Injectable({
    providedIn: 'root'
})
export class AdminLevelService {

    constructor(
        private apiService: ApiService,
        private messageService: MessageService
    ) { }

    getAdminLevels(): Observable<AdminLevel[]> {
        return this.apiService.get('/adminlevel/getadminlevels');
    }

    getAdminMenus(): Observable<any[]> {
        return this.apiService.get('/adminlevel/getadminmenus');
    }

    getAdminLevelMenuById(id: number): Observable<any[]> {
        return this.apiService.get(`/adminlevel/getadminlevelmenu/${id}`);
    }

    updateAdminLevelMenuById(id: number, data: any[]): Observable<any> {
        return this.apiService.postJson(`/adminlevel/saveadminlevelmenu/${id}`, data);
    }

    getAdminLevel(id: number): Observable<AdminLevel> {
        this.messageService.add(`AdminLevelService: fetched AdminLevel id=${id}`);
        return this.apiService.get(`/adminlevel/getadminlevel/${id}`);
    }

    // ? PUT: update the adminlevel on the server
    updateAdminLevel(AdminLevel: AdminLevel): Observable<any> {
        this.messageService.add(`AdminLevelService: update AdminLevel =${AdminLevel.AdminLevelName}`);
        return this.apiService.putJson('/adminlevel/updateadminlevel/' + AdminLevel.AdminLevelId, AdminLevel);
    }

    // ? POST: add a new adminlevel to the server
    addAdminLevel(AdminLevel: AdminLevel): Observable<AdminLevel> {
        this.messageService.add(`AdminLevelService: add AdminLevel =${AdminLevel.AdminLevelName}`);
        return this.apiService.postJson('/adminlevel/addadminlevel', AdminLevel);
    }

    // ? DELETE: delete the adminlevel from the server
    deleteAdminLevel(id: number): Observable<AdminLevel> {
        this.messageService.add(`AdminLevelService: delete AdminLevel id=${id}`);
        return this.apiService.delete('/adminlevel/deleteadminlevel/' + id);
    }
}
