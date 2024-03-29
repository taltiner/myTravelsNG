import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent {
  @Input() ratingForm: FormControl; 


  updateRating(rating: string){
        this.ratingForm.patchValue({rating: rating})
  }
}
