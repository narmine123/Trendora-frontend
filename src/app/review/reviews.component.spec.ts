import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewsComponent } from './reviews.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReviewService } from '../review.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;
  let mockReviewService: jasmine.SpyObj<ReviewService>;

  beforeEach(async () => {
    mockReviewService = jasmine.createSpyObj('ReviewService', ['getReviews']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ReviewsComponent],
      providers: [{ provide: ReviewService, useValue: mockReviewService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsComponent);
    component = fixture.componentInstance;

    // Mock data
    const reviewsMock = [
      { id: 1, content: 'Great product!', rating: 5 },
      { id: 2, content: 'Not as expected.', rating: 3 },
    ];
    mockReviewService.getReviews.and.returnValue(of(reviewsMock));

    // Pass inputs to the component
    component.productId = 1;

    fixture.detectChanges(); // Triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load reviews on init', () => {
    expect(mockReviewService.getReviews).toHaveBeenCalledWith(1);
    expect(component.reviews.length).toBe(2);
    expect(component.reviews[0].content).toBe('Great product!');
  });

  it('should display reviews in the template', () => {
    const reviewElements = fixture.debugElement.queryAll(By.css('.review-item'));
    expect(reviewElements.length).toBe(2);

    expect(reviewElements[0].nativeElement.textContent).toContain('Great product!');
    expect(reviewElements[1].nativeElement.textContent).toContain('Not as expected.');
  });

  it('should display "No reviews available" if there are no reviews', () => {
    component.reviews = [];
    fixture.detectChanges();

    const noReviewsMessage = fixture.debugElement.query(By.css('.no-reviews'));
    expect(noReviewsMessage).toBeTruthy();
    expect(noReviewsMessage.nativeElement.textContent).toContain('No reviews available.');
  });
});
