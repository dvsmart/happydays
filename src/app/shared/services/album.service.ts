import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import { Album } from '../models/album.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AlbumService {
  url = 'http://localhost:63159/api/Album';

  
  constructor(private http: HttpClient, private cloudinary: Cloudinary) { }

  createAlbum(album:Album) {
    return this.http.post(this.url, album).subscribe();
  }
  
  getAlbums() : Observable<Album[]> {
    return this.http.get<Album[]>(this.url, {responseType: 'json'});
  }

}