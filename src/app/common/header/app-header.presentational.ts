import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'header[app-header]',
  styleUrls: ['app-header.presentational.scss'],
  templateUrl: 'app-header.presentational.html',
  standalone: true,
  imports: [NgOptimizedImage],
})
export class AppHeaderPresentational {}
