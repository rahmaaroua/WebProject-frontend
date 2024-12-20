import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl:'./cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(){ };
  cartProducts: any[] = [
    {
      category: "men's clothing",
      description:  "great outerwear jackets",
      id: 3,
      image: "https://fakestoreapi.com/img",
      price: 55.99,
      rating: {rate: 4.7, count: 500},
      title: "Mens Cotton Jacket",
      quantity: 1

    }
  ];


  ngOnInit(): void {

      this.getCartProducts();
  }

  getCartProducts() {
if("cart" in localStorage) {
this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
}
    console.log(this.cartProducts);

}

}
