import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../models/photo.model';
import { PhotoService } from '../../services/photo.service';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
    @Input() album: Album;
  private photos: Observable<Photo[]>;
    private publicId: string = 'officialchucknorrispage';

    constructor(
        private photoAlbum: PhotoService
    ) { }

    ngOnInit(): void {
        this.photos = this.photoAlbum.getPhotos();
    }

    changePublicId() {
        this.publicId = (this.publicId === 'officialchucknorrispage') ? 'billclinton' : 'officialchucknorrispage';
    }

    onLoadImage(success) {
        console.log('On load', success);
    }
    onErrorImage(err) {
        console.log('On error!!', err);
    }

}
