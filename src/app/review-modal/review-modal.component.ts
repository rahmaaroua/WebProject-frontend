import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service'; // Import AuthService
import { ReviewService } from '../review.service'; // Import ReviewService
import { Review } from './review.model'; // Import Review model

@Component({
  standalone: true,
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ReviewModalComponent {
  newReview = { content: '', rating: 0 };

  constructor(
    public dialogRef: MatDialogRef<ReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number, reviews: Review[] },
    private reviewService: ReviewService, // Inject ReviewService
    private authService: AuthService // Inject AuthService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmitReview(): void {
    const user = this.authService.getUserData_with_id(); // Get the user data with ID
    const review = {
      rating: this.newReview.rating,
      comment: this.newReview.content,
      productId: this.data.productId,
      userId: user.id // Use the user ID from the user data
    };

    this.reviewService.submitReview(review).subscribe(
      (response: Review) => {
        this.data.reviews.push(response);
        this.newReview = { content: '', rating: 0 }; // Reset the form
        this.dialogRef.close();
      },
      (error: Error) => {
        console.error('Error submitting review:', error);
      }
    );
  }

  onDeleteReview(reviewId: number, index: number): void {
    this.reviewService.deleteReview(reviewId).subscribe(
      (response: { message: string }) => {
        this.data.reviews.splice(index, 1); // Remove the review from the list
      },
      (error: Error) => {
        console.error('Error deleting review:', error);
      }
    );
  }
}