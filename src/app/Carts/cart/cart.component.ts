import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Common } from 'devextreme-angular';
import { CartsService } from '../carts.service';
import { Cart, CartItem } from '../cart.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(private service: CartsService, private router: Router) {}

  cartProducts: CartItem[] = [];
  total: number = 0;
  success: boolean = false;

  ngOnInit(): void {
    // Fetch cart items from DB using service
    this.getCart();
  }

  getCart(): void {
    this.service.getCart().subscribe(
      (cart: Cart) => {
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
      // prevent negative quantities
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
        item.quantity = 1; // reset to minimum valid quantity
      }
      return item;
    });
    this.cartProducts.forEach((item) => {
      this.updateCartItemQuantity(item.product.id, item.quantity);
    });
  }
  private updateCartItemQuantity(productId: number, quantity: number): void {

    this.service.updateCartItemQuantity(productId, quantity).subscribe(
      (cart: Cart) => {
        this.cartProducts = cart.cartItems;
        this.total = cart.totalPrice;
        this.service.setSelectedProducts(cart.cartItems);
      },
      (error) => {
        console.error('Error updating cart item quantity:', error);
      }
    );
  }

  deleteProduct(index: number): void {
    const productId = this.cartProducts[index].product.id;


    this.service.removeFromCart(productId).subscribe((cart) => {

      this.cartProducts = cart.cartItems;
      this.total = cart.totalPrice;
      this.service.setSelectedProducts(cart.cartItems);

      // remove the product from the UI in case of backend sync delay
      if (this.cartProducts.length === 0) {
        this.cartProducts = [];
        this.total = 0;
      }
    });
  }

  clearCart(): void {

    this.service.clearCart().subscribe(
      (cart: Cart) => {
        this.cartProducts = [];
        this.total = 0;
        this.service.setSelectedProducts(this.cartProducts);
      },
      (error) => {
        console.error('Error clearing cart:', error);
      }
    );
  }



  checkout(): void {
    this.service.setSelectedProducts(this.cartProducts);

    this.router.navigate(['/order']);
  }
}
