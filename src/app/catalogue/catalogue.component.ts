import { Component, enableProdMode} from '@angular/core'
import { NgFor } from '@angular/common';
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

import { DataComponent } from '../data/data.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DxDataGridModule, DxButtonModule, DxPopupModule } from 'devextreme-angular';
import { FormPopupComponent } from '../form-popup/form-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChildComponent } from '../child/child.component';
import { ProductsService } from '../products.service';
import { ProductPopupComponent } from '../product-popup/product-popup.component';


@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [NgFor,NgIf,RouterOutlet,RouterModule,DataComponent,DxDataGridModule, DxButtonModule, DxPopupModule,FormPopupComponent,ReactiveFormsModule,ProductPopupComponent,ChildComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent implements OnInit {
  products: any[]=[];
  product:any;
  selectedProductId: any ;
  currentProduct: any;
  popupVisible = false;
  formPopupVisible = false;
  productPopupVisible = false;
  isEditMode = false;

  moreInfoButtonOptions: any;
  emailButtonOptions: any;
  closeButtonOptions: any;

  constructor(private service: ProductsService,private router: Router) {
  }







  ngOnInit():void {
    this.getProducts()
  }



  getProducts(){
    this.service.getProducts().subscribe((products:any[])=> {this.products=products;
      console.log("products",this.products)
    });

  }
  viewProductDetails(id: number): void {
    this.router.navigate(['/child', id]);
  }
  onButtonClick(id: number) {
    alert(`Button clicked for product with id: ${id}`);
  }
  showInfo(product: any) {
    this.currentProduct = product;
    this.popupVisible = true;
  }
  closePopup() {
    this.popupVisible = false;
    this.currentProduct = null;
    this.selectedProductId = null;
  }
  openFormPopup(product: any) {
    this.selectedProductId = product;
    this.isEditMode = true;
    this.formPopupVisible = true;
  }
  openFormPopup1() {
    this.formPopupVisible = true;
    this.isEditMode = false;
  }

  closeFormPopup() {
    this.formPopupVisible = false;
    this.currentProduct = null;
    this.selectedProductId = null;
  }

}

/*
import { Component, enableProdMode} from '@angular/core'
import { NgFor } from '@angular/common';
import { OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

import { DataComponent } from '../data/data.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DxDataGridModule, DxButtonModule, DxPopupModule } from 'devextreme-angular';
import { FormPopupComponent } from '../form-popup/form-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerPopupComponent } from '../customer-popup/customer-popup.component';
import { ChildComponent } from '../child/child.component';


@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [NgFor,NgIf,RouterOutlet,RouterModule,DataComponent,DxDataGridModule, DxButtonModule, DxPopupModule,FormPopupComponent,ReactiveFormsModule,CustomerPopupComponent,ChildComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent implements OnInit {
  customers: any[]=[];
  customer:any;
  selectedCustomerId: any ;
  currentCustomer: any;
  popupVisible = false;
  formPopupVisible = false;
  customerPopupVisible = false;
  isEditMode = false;

  moreInfoButtonOptions: any;
  emailButtonOptions: any;
  closeButtonOptions: any;

  constructor(private service: AuthService,private router: Router) {
  }







  ngOnInit():void {
    this.getCustomers()
  }



  getCustomers(){
    this.service.getCustomers().subscribe((customers:any[])=> {this.customers=customers;
      console.log("customers",this.customers)
    });

  }
  viewCustomerDetails(id: number): void {
    this.router.navigate(['/child', id]);
  }
  onButtonClick(id: number) {
    alert(`Button clicked for customer with id: ${id}`);
  }
  showInfo(customer: any) {
    this.currentCustomer = customer;
    this.popupVisible = true;
  }
  closePopup() {
    this.popupVisible = false;
    this.currentCustomer = null;
    this.selectedCustomerId = null;
  }
  openFormPopup(customer: any) {
    this.selectedCustomerId = customer;
    this.isEditMode = true;
    this.formPopupVisible = true;
  }
  openFormPopup1() {
    this.formPopupVisible = true;
    this.isEditMode = false;
  }

  closeFormPopup() {
    this.formPopupVisible = false;
    this.currentCustomer = null;
    this.selectedCustomerId = null;
  }

}

*/
