import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private link = 'http://localhost:3000/order'; // Base URL pour le backend


  constructor(private http: HttpClient) { }

  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.link}`, order);
  }


  getSelectedProducts(): { name: string; quantity: number; price: number }[] {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      return JSON.parse(cartData); // Parse and return the selected products
    }
    return []; // Return an empty array if no data is found
  }
}
