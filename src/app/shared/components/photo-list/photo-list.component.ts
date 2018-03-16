import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../models/photo.model';
import { PhotoService } from '../../services/photo.service';
import { Album } from '../../models/album.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
    @Input() album: Album;
    photos: Photo[];
    albumId: string;
    folderId:number;

    isUploadSuccessful: boolean;

    constructor(
        private photoAlbum: PhotoService,private route:ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.albumId = id.toString();
        this.folderId = id;
        this.loadImages(id);
    }
    
    loadImages(id:number){
        this.photoAlbum.getPhotos(id).subscribe(x=>{ this.photos = x;console.log(x);});
    }

    receiveMessage($event) {
        debugger;
        this.isUploadSuccessful = $event
        this.loadImages(this.folderId);
      }

    onLoadImage(success) {
        console.log('On load', success);
    }
    onErrorImage(err) {
        console.log('On error!!', err);
    }

}
