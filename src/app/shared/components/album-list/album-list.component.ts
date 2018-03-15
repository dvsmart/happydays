import { Component, OnInit, Input } from '@angular/core';
import { Album, albums } from '../../models/album.model';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { AlbumService } from '../../services/album.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { AddAlbumDialog } from './add-album-dialog.component';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  albums$ : Observable<Album[]>;
  albumName:FormControl;
  albumModel:Album;

  private _todos: BehaviorSubject<Album[]>;

  dataSubject = new BehaviorSubject<any[]>([]);

  constructor(private router: Router,private albumService: AlbumService,public dialog: MatDialog) {
  }

  loadAll() {
    this.albumService.getAlbums().subscribe(data => {
      this._todos.next(data);
    }, error => console.log('Could not load todos.'));
  }

  get todos() {
    return this._todos.asObservable();
  }
  
  openDialog(): void {
    let dialogRef = this.dialog.open(AddAlbumDialog, {
      width: '250px',
      data: { name: this.albumName.value }
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger;
      console.log('The dialog was closed');
      this.albumName.setValue(result);
      this.albumModel.name = this.albumName.value;
      this.albumModel.isPublic = true;
      this.albumService.createAlbum(this.albumModel);
      this.albumName.valueChanges.subscribe(x=>this.albums$ = this.albumService.getAlbums());
    });
  }
  
  ngOnInit() {
    this.albumName = new FormControl();
    this.albumModel = new Album();
    this.albums$ = this.albumService.getAlbums();
    this.albumService.getAlbums().subscribe(x=> this.dataSubject.next(x));
  }

  onSelect(album: Album){
    this.router.navigateByUrl('/photos/'+ album.id, { skipLocationChange: true });
  }

  onSubmit(){
    this.albumModel.name = this.albumName.value;
    this.albumModel.isPublic = true;
    this.albumService.createAlbum(this.albumModel);
    this.albumName.setValue("");
    this.dataSubject.asObservable();
  }
}
