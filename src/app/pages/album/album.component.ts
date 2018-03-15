import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Album } from '../../shared/models/album.model';

import {map} from 'rxjs/operators';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { AlbumService } from '../../shared/services/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  constructor(private albumService: AlbumService ) { }

  ngOnInit() {
  }

  
}
