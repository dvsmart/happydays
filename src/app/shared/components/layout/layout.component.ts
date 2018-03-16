import { Component, OnInit, ViewChild, Output, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Output() open:boolean;

  mode:string;

  constructor(private router: Router) {
    this.open = true;
   }
  logo = 'assets/logo.png';

  

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.open = false;
    }
  }

  onNotify(message:boolean):void {
    this.open = this.open ? false : true;
  }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth < 768) {
            this.open = false;
        }
        if (event.target.innerWidth > 768) {
           this.open = true;
        }
    }
}
