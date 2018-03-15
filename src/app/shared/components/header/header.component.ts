import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
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
 
}
