import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Output() open:boolean;
  constructor(private router: Router) {
    this.open = true;
   }
  logo = 'assets/logo.png';

  

  ngOnInit() {
  }

  onNotify(message:boolean):void {
    this.open = this.open ? false : true;
  }
}
