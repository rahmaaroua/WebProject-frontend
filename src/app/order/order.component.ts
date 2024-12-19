import { Component } from '@angular/core';
import { ReactiveFormsModule,FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  OrderForm = new FormGroup({
    name: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl(''),
    phone: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
  });

  submitOrder() {
    if(this.OrderForm.valid){
      const OrderData = {
        user : this.OrderForm.value
        // order :
        // totalPrice :
      }
    }
    //ne9es link bl back
  }
    
}
