import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ReviewService } from '../review.service';
import { Review } from './review.model';

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
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmitReview(): void {
    const user = this.authService.getUserData_with_id();
    const review = {
      rating: this.newReview.rating,
      comment: this.newReview.content,
      productId: this.data.productId,
      userId: user.id
    };

    this.reviewService.submitReview(review).subscribe(
      (response: Review) => {
        this.data.reviews.push(response);
        this.newReview = { content: '', rating: 0 };
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
        this.data.reviews.splice(index, 1);
      },
      (error: Error) => {
        console.error('Error deleting review:', error);
      }
    );
  }
}