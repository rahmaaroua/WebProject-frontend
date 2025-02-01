import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/reviews'; // Corrected API endpoint

  constructor(private http: HttpClient) {}

  getReviews(productId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/product/${productId}`);
  }

  submitReview(review: { rating: number; comment: string; productId: number; userId: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, review);
  }
}