import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewModalComponent } from './review-modal.component';
import { FormsModule } from '@angular/forms';

describe('ReviewModalComponent', () => {
  let component: ReviewModalComponent;
  let fixture: ComponentFixture<ReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewModalComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
