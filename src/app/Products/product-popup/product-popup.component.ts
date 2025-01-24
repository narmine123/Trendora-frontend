/*

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgModule, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataComponent } from '../data/data.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DxDataGridModule, DxButtonModule, DxPopupModule } from 'devextreme-angular';

@Component({
  selector: 'app-customer-popup',
  standalone: true,
  imports: [RouterOutlet,RouterModule,DataComponent,DxDataGridModule, DxButtonModule, DxPopupModule],
  templateUrl: './customer-popup.component.html',
  styleUrl: './customer-popup.component.css'
})
export class CustomerPopupComponent {
  @Input() customer: any;
  @Input() visible: any;
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }

}*/

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgModule, OnInit } from '@angular/core';
import { DataComponent } from '../data/data.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {
  DxDataGridModule,
  DxButtonModule,
  DxPopupModule,
} from 'devextreme-angular';

@Component({
  selector: 'app-product-popup',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    DataComponent,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
  ],
  templateUrl: './product-popup.component.html',
  styleUrl: './product-popup.component.css',
})
export class ProductPopupComponent {
  @Input() product: any;
  @Input() visible: any;
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
}
