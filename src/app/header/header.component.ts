import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jacs-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  errors = [];
  loading = false;

  constructor(

  ) { }

  ngOnInit() {

  }
}