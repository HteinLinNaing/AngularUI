import { Component } from '@angular/core';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { AdminService } from '../../core/services/admin.service';
import { Admin } from '../../core/models/admin';

@Component({
    selector: 'app-admin-list',
    templateUrl: './admin-list.component.html',
    styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent {
    public admingrid: Observable<GridDataResult>;
    admins: Admin[] = [];
    public isActive: boolean;
    public itemToRemove: any;

    public gridState: DataSourceRequestState = {
        skip: 0,
        take: 5,
        filter: { logic: 'and', filters: [] }
    };

    constructor(
        private adminService: AdminService,
    ) { }

    ngOnInit() {
        const currentState = localStorage.getItem('MyAdminState');
        if (currentState != null) {
            this.gridState = JSON.parse(currentState);
        } else {
            localStorage.setItem('MyAdminState', JSON.stringify(this.gridState));
        }
        this.getAdmins();
    }

    getAdmins(): void {
        this.admingrid = this.adminService;
        this.adminService.getAdminGrid(this.gridState);
    }

    adminStatus(dataItem): void {
        this.adminService.changeStatus(dataItem).subscribe(
            x => {
                this.getAdmins();
            }
        );
    }

    public removeHandler({ dataItem }) {
        this.itemToRemove = dataItem;
        console.log(dataItem)
    }

    public confirmRemove(shouldRemove: boolean): void {
        if (shouldRemove) {
            this.adminService.deleteAdmin(this.itemToRemove.Id).subscribe(
                deletestatus => {
                    this.getAdmins();
                    console.log(deletestatus);
                }
            );
        }
        this.itemToRemove = null;
    }

    onStateChange(dstate: DataStateChangeEvent): void {
        this.gridState = dstate;
        localStorage.setItem('MyAdminState', JSON.stringify(this.gridState));
        this.getAdmins();
    }

    public clearfilter(): void {
        this.gridState.skip = 0;
        this.gridState.filter = { logic: 'and', filters: [] };
        localStorage.setItem('MyAdminState', JSON.stringify(this.gridState));
        this.getAdmins();
    }
}
