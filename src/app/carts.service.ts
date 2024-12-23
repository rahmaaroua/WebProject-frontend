import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  baseApi = "https://fakestoreapi.com"

  constructor(private http: HttpClient) {

  }

  createNewCart(model : any ) {
    return this.http.post(this.baseApi + "/carts", model);
  }
}
