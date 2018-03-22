import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule,NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MaterialModule } from './shared/material.module';
import { PageModule } from './pages/page.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AddAlbumDialog } from './shared/components/album-list/add-album-dialog.component';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './shared/services/authservice.service';
import { AuthGuard } from './_guards/authguard';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidenavComponent,
    HeaderComponent,
    BreadcrumbComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PageModule
  ],
  providers: [AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
