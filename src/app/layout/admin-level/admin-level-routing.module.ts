import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLevelListComponent } from './admin-level-list.component';

const routes: Routes = [
    { path: '', component: AdminLevelListComponent },
    // { path: 'add', component: AdminAddComponent },
    // { path: 'detail/:id', component: AdminDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminLevelRoutingModule { }
