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
import { FileUploadModule ,FileSelectDirective} from 'ng2-file-upload';


import { CloudinaryModule, CloudinaryConfiguration, CloudinaryImage } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { AddAlbumDialog } from './shared/components/album-list/add-album-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidenavComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FileUploadModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'vjcloud',api_key:'964577996685692',api_secret:'U_37RS6h4z4WJJC5qerbU-Ez0AY',secure:true } as CloudinaryConfiguration),
    HttpClientModule,
    PageModule
  ],
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
