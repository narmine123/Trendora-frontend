import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [NgFor, NgIf, RouterOutlet],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  product: any;
  id: any;
  constructor(private service: ProductsService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // get the id from route parameters
      this.getProduct();
    });
  }

  getProduct(): void {
    this.service.getProduct(this.id).subscribe((result: any) => {
        this.product = result;
        console.log('product', this.product);
      });
    }
  }



  /*
import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [NgFor, NgIf, RouterOutlet],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  customer: any;
  id: any;
  constructor(private service: AuthService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // get the id from route parameters
      this.getCustomer();
    });
  }

  getCustomer(): void {
    this.service.getCustomer(this.id).subscribe((result: any) => {
        this.customer = result;
        console.log('customer', this.customer);
      });
    }
  }
*/
