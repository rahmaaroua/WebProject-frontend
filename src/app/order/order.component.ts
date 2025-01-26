import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule,FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../Carts/cart.models';
import { CartsService } from '../Carts/carts.service';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,

})
export class OrderComponent implements OnInit{
  selectedProducts : CartItem[]=[];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private cartservice: CartsService
  ){}

  ngOnInit(): void {
      //this.selectedProducts = this.orderService.getSelectedProducts();

      // Fetch selected products from the cart service
    this.cartservice.getSelectedProducts().subscribe((products) => {
      this.selectedProducts = products;
      console.log('Selected products:', this.selectedProducts);
    });

  }

  userData = this.authService.getUserData();

  OrderForm = new FormGroup({
    name: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl(this.userData.email),
    phone: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
  });

  calculateTotal(): number{
    return this.selectedProducts.reduce(
      (total , product) => total+ product.quantity * product.product.price ,0
    );
  }

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
      },
      (error) => {
        console.error('Erreur lors de la création de la commande :', error);
      }
    );
  }
}

}
