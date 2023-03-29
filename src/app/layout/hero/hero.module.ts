import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroRoutingModule } from './hero-routing.module';
import { HeroListComponent } from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroSearchComponent } from './hero-search.component';
// import { HeroAddComponent } from './hero-add.component';


@NgModule({
    declarations: [
        HeroListComponent,
        HeroDetailComponent,
        HeroSearchComponent,
        // HeroAddComponent
    ],
    imports: [
        CommonModule,
        HeroRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class HeroModule { }
