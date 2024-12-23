import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Common } from 'devextreme-angular';
import { CartsService } from '../carts.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(private service : CartsService) {}

  cartProducts: any[] = [];
  total: any = 0;
  success: boolean = false;

  ngOnInit(): void {
    // Fetch and parse the local storage data
    const cartProducts = localStorage.getItem('cartProducts');
    if (cartProducts) {
      this.cartProducts = JSON.parse(cartProducts);
    }
    this.getCartTotal();
  }

  getCartProducts() {
    if ('cartProducts' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cartProducts')!);
      console.log(this.cartProducts);
    }
  }

  getCartTotal(): void {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total +=
        this.cartProducts[x].product.price * this.cartProducts[x].quantity;
    }
  }
  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }
  minusAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getCartTotal();
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }

  detectChange() {
    this.getCartTotal();
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }
  deleteProduct(index: number){
    this.cartProducts.splice(index, 1);
    this.getCartTotal();
   localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));

  }
  clearCart(){
  this.cartProducts= [];
   this.getCartTotal();
  localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));

  }
  addCart(){
     let products = this.cartProducts.map(item => {
      return {productId: item.product.id, quantity: item.quantity}
     })
    let Model = {
      userID:5,
      date: new Date(),
      products:products
    }
    this.service.createNewCart(Model).subscribe(res =>{ this.success = true}
  )

    console.log(Model)
  }

}
