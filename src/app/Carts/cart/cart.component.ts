import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Common } from 'devextreme-angular';
import { CartsService } from '../carts.service';
import { Cart, CartItem } from '../cart.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(private service: CartsService, private router: Router) {}

  cartProducts: CartItem[] = [];
  total: number = 0;
  success: boolean = false;

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.service.getCart().subscribe(
      (cart) => {
        this.cartProducts = cart.cartItems;
        this.total = cart.totalPrice;
        this.service.setSelectedProducts(this.cartProducts);
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }

  getCartTotal(): void {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total +=
        this.cartProducts[x].product.price * this.cartProducts[x].quantity;
    }
  }

  addAmount(index: number): void {

    this.cartProducts[index].quantity++;
    this.updateCartItemQuantity(
      this.cartProducts[index].product.id,
      this.cartProducts[index].quantity
    );
  }

  minusAmount(index: number): void {
    if (this.cartProducts[index].quantity > 1) {
      this.cartProducts[index].quantity--;
      this.updateCartItemQuantity(
        this.cartProducts[index].product.id,
        this.cartProducts[index].quantity
      );
    }
  }

  detectChange(): void {
    this.cartProducts = this.cartProducts.map((item) => {
      if (item.quantity < 1) {
        item.quantity = 1;
      }
      return item;
    });
    this.cartProducts.forEach((item) => {
      this.updateCartItemQuantity(item.product.id, item.quantity);
    });
  }

  deleteProduct(index: number): void {
    const productId = this.cartProducts[index].product.id;
    this.cartProducts.splice(index, 1);
    this.service.removeFromCart(productId).subscribe(
      () => {
        this.service.setSelectedProducts(this.cartProducts);
      },
      (error) => {
        console.error('Error removing product from cart:', error);
      }
    );
  }

  clearCart(): void {
    this.service.clearCart().subscribe(
      () => {
        this.cartProducts = [];
        this.total = 0;
        this.service.setSelectedProducts(this.cartProducts); 
      },
      (error) => {
        console.error('Error clearing cart:', error);
      }
    );
  }

  private updateCartItemQuantity(productId: number, quantity: number): void {
    this.service.updateCartItemQuantity(productId, quantity).subscribe(
      () => {
        this.service.setSelectedProducts(this.cartProducts);
      },
      (error) => {
        console.error('Error updating cart item quantity:', error);
      }
    );
  }

  getCartProducts() {
    if ('cartProducts' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cartProducts')!);
    }
  }

  checkout(): void {
    this.service.setSelectedProducts(this.cartProducts);

    this.router.navigate(['/order']);
  }
}
