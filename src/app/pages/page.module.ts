import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { MyalbumComponent } from './myalbum/myalbum.component';
import { HomeComponent } from './home/home.component';
import { PhotoListComponent } from '../shared/components/photo-list/photo-list.component';
import { PhotoService } from '../shared/services/photo.service';
import { CloudinaryImage, Cloudinary, CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import * as cloudinary from 'cloudinary-core';
import { AlbumListComponent } from '../shared/components/album-list/album-list.component';
import { MaterialModule } from '../shared/material.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from '../shared/components/file-upload/file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ImagePreview } from '../shared/directives/imagePreview.directive';
import { AlbumService } from '../shared/services/album.service';
import { AddAlbumDialog } from '../shared/components/album-list/add-album-dialog.component';

const routes: Routes = [
  {path:'Albums',component:AlbumComponent},
  {path:'photos/:id',component:PhotoListComponent},
];


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    CloudinaryModule.forRoot(cloudinary, { cloud_name: 'vjcloud', api_key:'964577996685692',api_secret:'U_37RS6h4z4WJJC5qerbU-Ez0AY',secure:true } as CloudinaryConfiguration),
  ],
  providers:[PhotoService,AlbumService],
  entryComponents: [AddAlbumDialog],
  declarations: [AlbumComponent, MyalbumComponent, HomeComponent,AlbumListComponent,PhotoListComponent,FileUploadComponent,ImagePreview,AddAlbumDialog]
})
export class PageModule { }
