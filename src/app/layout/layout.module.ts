import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { TodoDetailComponent } from './todo/todo-detail.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        TodoComponent,
        TodoDetailComponent,
    ]
})
export class LayoutModule { }
