import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../models/photo.model';
import {map} from 'rxjs/operators';

@Injectable()
export class PhotoService {
    url = 'http://localhost:63159/api/Image/';
  constructor(private http: HttpClient) { }


  getPhotos(id: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.url + id);
    }

    postFile(photoModel: any): Observable<boolean> {
      const endpoint = 'http://localhost:63159/api/imageupload';
      return this.http
        .post(endpoint, photoModel)
        .map(() => { return true; });
  }
}
