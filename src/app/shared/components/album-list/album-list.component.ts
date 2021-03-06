import { Component, OnInit, Input } from '@angular/core';
import { Album} from '../../models/album.model';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlbumService } from '../../services/album.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { AddAlbumDialog } from './add-album-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { ObservableMedia } from '@angular/flex-layout';

import "rxjs/add/operator/map";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/startWith";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  albums : Album[];
  albumName:FormControl;
  albumModel:Album;
  errorMessage:Observable<string>;
  cols: Observable<number>;
  defaultImg: string;

  constructor(private router: Router,private albumService: AlbumService,public dialog: MatDialog,private media: ObservableMedia) {
    this.loadAll();
  }

  loadAll() {
    this.albumService.getAlbums().subscribe(x=> {this.albums = x;console.log(x);});
    this.defaultImg = "./assets/download.png";
  }
  
  
  
  openDialog(): void {
    let dialogRef = this.dialog.open(AddAlbumDialog, {
      width: '250px',
      data: { name: this.albumName.value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(this.validateInput){
        this.albumName.setValue(result);
        this.albumModel.name = this.albumName.value;
        this.albumModel.isPublic = true;
        this.albumService.createAlbum(this.albumModel).subscribe(x=> this.loadAll());
      }else{
        this.errorMessage.subscribe(x=> "Already Exists. Please choose a different name and try again.");
      }
    });
  }

 

  validateInput(name:string): boolean{
      var isValid = false;
      var localAlbums = this.albums;
      isValid = localAlbums.some(function (el) {
         return el.name === name ? false: true;
        });
      if(name !== "" && name !== undefined){
          isValid = true;
      }
      return isValid;
  }
  
  ngOnInit() {
    this.updateGrid();
    this.albumName = new FormControl('');
    this.albumModel = new Album();
  }

  onSelect(album: Album){
    this.router.navigateByUrl('/photos/'+ album.id);
  }

  updateGrid(){
    const grid = new Map([
      ["xs", 1],
      ["sm", 2],
      ["md", 2],
      ["lg", 3],
      ["xl", 4]
    ]);
    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.media.isActive(mqAlias)) {
        start = cols;
      }
    });
    this.cols = this.media.asObservable()
      .map(change => {
        console.log(change);
        console.log(grid.get(change.mqAlias));
        return grid.get(change.mqAlias);
      })
      .startWith(start);
  }
}
