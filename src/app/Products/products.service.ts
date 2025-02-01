import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private pathUrl="http://localhost:3000/products";
  private reviewsPathUrl="http://localhost:3000/reviews"; // Assuming you have reviews endpoint

  constructor(private http: HttpClient, private router: Router) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.pathUrl);
  }

  getProduct(id: any): Observable<any> {
    return this.http.get<any[]>(`${this.pathUrl}/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.pathUrl}`, product);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put(`${this.pathUrl}/update/${product.id}`, product);
  }

  // New method to get reviews
  getReviews(productId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.reviewsPathUrl}?productId=${productId}`);
  }
}