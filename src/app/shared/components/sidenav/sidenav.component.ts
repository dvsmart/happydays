import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Link } from '../../models/link.model';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() isOpened:boolean;
  links:Link[];

  @ViewChild('childMenu') public childMenu;
  constructor() { 
    this.links =  [
      {id: 1,caption:"Home",icon:'home',Order:1, routerLink: '/Home',},
      {id: 2,caption:"Albums",icon:'bug_report',Order:2,routerLink: '/Albums'},
      {id: 3,caption:"My Albums",icon:'settings',Order:3 ,routerLink: '/MyAlbums'},
    ]
  }

  ngOnInit() {
  }
  
}