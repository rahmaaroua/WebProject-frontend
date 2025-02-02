import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from './review-modal/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
  }

  getReviews(productId: string): Observable<Review[]> {
    const headers = this.getHeaders();
    return this.http.get<Review[]>(`${this.apiUrl}/product/${productId}`, { headers });
  }

  submitReview(review: { rating: number; comment: string; productId: number; userId: number }): Observable<Review> {
    const headers = this.getHeaders();
    return this.http.post<Review>(this.apiUrl, review, { headers });
  }

  deleteReview(reviewId: number): Observable<{ message: string }> {
    const headers = this.getHeaders();
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${reviewId}`, { headers });
  }
}