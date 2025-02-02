import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule,FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../Carts/cart.models';
import { CartsService } from '../Carts/carts.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class OrderComponent implements OnInit {
  selectedProducts: CartItem[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private cartservice: CartsService
  ) {}

  ngOnInit(): void {
    //this.selectedProducts = this.orderService.getSelectedProducts();

    this.cartservice.getSelectedProducts().subscribe((products) => {
      this.selectedProducts = products;
    });
  }

  userData = this.authService.getUserData();

  OrderForm = new FormGroup({
    name: new FormControl(this.userData.firstName, Validators.required),
    lastName: new FormControl(this.userData.lastName, Validators.required),
    email: new FormControl(this.userData.email),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  calculateTotal(): number {
    return this.selectedProducts.reduce(
      (total, product) => total + product.quantity * product.product.price,
      0
    );
  }
  /**
  submitOrder() {
    if(this.OrderForm.valid){
      const OrderData = {
        user : this.OrderForm.value,
        products : this.selectedProducts,
        totalPrice : this.calculateTotal()
      };

     // Envoyer les données au backend
     this.orderService.createOrder(OrderData).subscribe(
      (response) => {
        console.log('Commande créée avec succès :', response);
        window.alert('Votre commande a été soumise avec succès ! 🎉');
      },
      (error) => {
        console.error('Erreur lors de la création de la commande :', error);
      }
    );
  }
}
*/

  async submitOrder() {
    if (this.OrderForm.valid) {
      const orderData = {
        user: {
          name: this.OrderForm.get('name')?.value,
          lastName: this.OrderForm.get('lastName')?.value,
          email: this.OrderForm.get('email')?.value,
          phone: this.OrderForm.get('phone')?.value,
          address: this.OrderForm.get('address')?.value,
        },
        products: this.selectedProducts,
        totalPrice: this.calculateTotal(),
      };

      try {
        const response = await firstValueFrom(
          this.orderService.createOrder(orderData)
        );
        console.log('Order created successfully:', response);
        alert('Your order has been submitted successfully!');
      } catch (error) {
        console.error('Error creating order:', error);
        alert('An error occurred while submitting the order.');
      }
    }
  }
}
