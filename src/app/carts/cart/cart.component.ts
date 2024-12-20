import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl:'./cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(){ };
  cartProducts: any[] = [];
  ngOnInit(): void {


  }

  getCartProducts() {
if("cart" in localStorage) {
this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
}
}

}
