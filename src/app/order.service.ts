import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private link = 'http://localhost:3000/order'; // Base URL pour le backend


  constructor(private http: HttpClient) { }

createOrder(orderData: any): Observable<any> {
    const formattedOrder = {
      name: orderData.user.name,
      lastName: orderData.user.lastName,
      email: orderData.user.email,
      phone: orderData.user.phone,
      address: orderData.user.address,
      products: orderData.products,
      totalPrice: orderData.totalPrice
    };
    return this.http.post<any>(this.link, formattedOrder);
  }



  getSelectedProducts(): { name: string; quantity: number; price: number }[] {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      return JSON.parse(cartData); // Parse and return the selected products
    }
    return []; // Return an empty array if no data is found
  }
}
