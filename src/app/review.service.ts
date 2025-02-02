import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Review } from './review-modal/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Access token is missing. Please log in.');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getReviews(productId: string): Observable<Review[]> {
    const headers = this.getHeaders();
    return this.http.get<Review[]>(`${this.apiUrl}/product/${productId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  submitReview(review: { rating: number; comment: string; productId: number; userId: number }): Observable<Review> {
    const headers = this.getHeaders();
    return this.http.post<Review>(this.apiUrl, review, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteReview(reviewId: number): Observable<{ message: string }> {
    const headers = this.getHeaders();
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${reviewId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('API error:', error);
    return throwError(() => new Error(error?.message || 'Something went wrong'));
  }
}
