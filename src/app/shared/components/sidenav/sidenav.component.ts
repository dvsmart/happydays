import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Link } from '../../models/link.model';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() isOpened:boolean;
  links:Link[];
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @ViewChild('childMenu') public childMenu;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.links =  [
      {id: 1,caption:"Home",icon:'home',Order:1, routerLink: '/Home',},
      {id: 2,caption:"Albums",icon:'bug_report',Order:2,routerLink: '/Albums'},
      {id: 3,caption:"My Albums",icon:'settings',Order:3 ,routerLink: '/MyAlbums'},
    ];
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
}