import { Component } from '@angular/core';
import { AdminLevelService } from '../../core/services/admin-level.service';
import { AdminLevel } from '../../core/models/admin-level';
import { CheckableSettings, CheckedState, TreeViewSize } from '@progress/kendo-angular-treeview';

@Component({
    selector: 'app-admin-level-list',
    templateUrl: './admin-level-list.component.html',
    styleUrls: ['./admin-level-list.component.scss']
})
export class AdminLevelListComponent {
    adminLevelList: AdminLevel[] = [];
    isPermissionTree: any = "";
    checkedKeys: any[] = [];
    saveBtn: any = false;
    addFrom: any = false;
    editForm: any = "";
    itemToRemove: any;
    public adminMenus: any[];
    public componentSizes: TreeViewSize[] = ["medium"];
    public key = "menu_id";

    public get checkableSettings(): CheckableSettings {
        return {
            checkChildren: false,
            checkDisabledChildren: false,
            checkParents: true,
            enabled: true,
            checkOnClick: true,
        };
    }

    public isChecked = (dataItem: any, index: string): CheckedState => {
        if (this.containsItem(dataItem)) {
            return "checked";
        }

        if (this.isIndeterminate(dataItem.items)) {
            return "indeterminate";
        }

        return "none";
    };

    private containsItem(item: any): boolean {
        return this.checkedKeys.indexOf(item[this.key]) > -1;
    }

    private isIndeterminate(items: any[] = []): boolean {
        let idx = 0;
        let item;

        while ((item = items[idx])) {
            if (this.isIndeterminate(item.items) || this.containsItem(item)) {
                return true;
            }

            idx += 1;
        }

        return false;
    }

    constructor(
        private adminLevelService: AdminLevelService,
    ) { };

    ngOnInit() {
        this.getAdminLevels();
        this.getAdminMenus();
    }

    getAdminLevels(): void {
        this.adminLevelService.getAdminLevels()
            .subscribe(res => this.adminLevelList = res);
    }

    getAdminMenus(): void {
        this.adminLevelService.getAdminMenus()
            .subscribe(
                data => {
                    if (data) {
                        this.adminMenus = this.createPermissionTree(data, 0);
                    }
                }
            );
    }

    getAdminLevelMenuById(id: number): void {
        this.adminLevelService.getAdminLevelMenuById(id)
            .subscribe(
                data => {
                    const list = data.map(item => item.AdminMenuId)
                    this.checkedKeys = [...list];
                }
            );
    }

    permissionHandler(adminlevel): void {
        this.getAdminLevelMenuById(adminlevel.AdminLevelId);
        this.isPermissionTree = adminlevel;
    }

    public onSaveChange(id: number): void {
        console.log(this.checkedKeys)

        const resultData = this.checkedKeys.map(key => ({ AdminLevelId: id, AdminMenuId: key }));
        this.adminLevelService.updateAdminLevelMenuById(id, resultData)
            .subscribe(
                res => {
                    if (res) {
                        this.isPermissionTree = "";
                    }
                }
            );
    }

    onCheckedKeysChange(event: any) {
        this.saveBtn = true;
    }

    addHandler(event: Event) {
        this.addFrom = true;
    }

    receiveAddEvent(event: Event) {
        this.addFrom = event;
        if (!event) {
            this.getAdminLevels();
        }
    }

    editHandler(e: Event, adminlevel) {
        e.stopPropagation();
        this.editForm = adminlevel;
    }

    receiveEditEvent(event: Event) {
        this.editForm = event;
        if (!event) {
            this.getAdminLevels();
        }
    }

    public deleteHandler(e: Event, adminlevel) {
        e.stopPropagation();
        this.itemToRemove = adminlevel;
    }

    public confirmRemove(shouldRemove: boolean): void {
        if (shouldRemove) {
            this.adminLevelService.deleteAdminLevel(this.itemToRemove.AdminLevelId).subscribe(
                deletestatus => {
                    this.getAdminLevels();
                    console.log(deletestatus);
                }
            );
        }
        this.itemToRemove = null;
    }


    public onCancel(): void {
        this.isPermissionTree = "";
    }

    createPermissionTree(db_data, ParentId) {
        let nodes, node_item, admin_menu_id;
        let controller_name, label_text, parent_id, tree_icon_text, sr_no;
        const i = 0;
        const nodeObj = [];
        nodes = this.filterJson(db_data, 'ParentId', ParentId);
        for (let i = 0; i < nodes.length; i++) {
            if (nodes.length > 0) {
                node_item = nodes[i];
                admin_menu_id = node_item['AdminMenuId'];      // id
                controller_name = node_item['ControllerName'];    // Controller name
                label_text = node_item['AdminMenuName'];     //menu name
                parent_id = node_item['ParentId'];      // parent id
                tree_icon_text = node_item['Icon'];     // icon
                sr_no = node_item['SrNo'];   //sr_no

                nodeObj.push({
                    menu_name: label_text, controller: controller_name,
                    tree_icon: tree_icon_text, menu_sr_no: sr_no,
                    menu_parent: parent_id, menu_id: admin_menu_id
                });
                nodeObj[i].children = this.createPermissionTree(db_data, admin_menu_id);
            }
        }
        return nodeObj;
    }

    // json filter
    filterJson(jsonobj: any, field: string, value: number) {
        return jsonobj.filter(s => s[field] == value);
    }
}
