import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';
import { NgxPermissionsModule } from 'ngx-permissions';
import { PermissionGuardService } from './shared/guard/permission-guard.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        NgxPermissionsModule.forRoot(),
    ],
    declarations: [AppComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        PermissionGuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
