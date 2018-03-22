import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Theme } from '../../models/theme.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
 @Output() themeChanger: EventEmitter<string> = new EventEmitter<string>();
 @Output() loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

 themes: Theme[];

  constructor(private router: Router) {
    this.themes = [];
    this.themes.push(new Theme('Light','light-theme'))
    this.themes.push(new Theme('Dark','dark-theme'))
    this.themes.push(new Theme('Nature','nature-theme'))
    this.themes.push(new Theme('Default','default-theme'))
   }
  logo = 'assets/logo.png';

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.loggedIn.emit(true);
    }
  }

  onLogout(){
    debugger;
    localStorage.removeItem('user');
    this.loggedIn.emit(false);
  }

  toggleSide(){
    this.notify.emit(true);
  }

  onSelect(theme: Theme){
    this.themeChanger.emit(theme.className);
  }
 
}
