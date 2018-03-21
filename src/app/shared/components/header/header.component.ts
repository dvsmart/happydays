import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Theme } from '../../models/theme.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
 @Output() themeChanger: EventEmitter<string> = new EventEmitter<string>();
 themes: Theme[];
  constructor() {
    this.themes = [];
    this.themes.push(new Theme('Light','light-theme'))
    this.themes.push(new Theme('Dark','dark-theme'))
    this.themes.push(new Theme('Nature','nature-theme'))
    this.themes.push(new Theme('Default','default-theme'))
   }
  logo = 'assets/logo.png';

  navigation = [
    { link: 'about', label: 'About' },
    { link: 'features', label: 'Features' },
    { link: 'examples', label: 'Examples' }
  ];
  ngOnInit() {
  }

  toggleSide(){
    this.notify.emit(true);
  }

  onSelect(theme: Theme){
    this.themeChanger.emit(theme.className);
  }
 
}
