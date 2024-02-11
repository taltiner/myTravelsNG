import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrl: './add-travel.component.css'
})
export class AddTravelComponent implements OnInit {
  travelForm: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.travelForm = new FormGroup({
      'startDate': new FormControl(null),
      'endDate': new FormControl(null),
      'country': new FormControl(null),
      'city': new FormControl(null),
      'activities': new FormControl(null),
      'comment': new FormControl(null),
      'rating': new FormGroup({
        'rating': new FormControl(null)
      })
    });
  }

  onSubmit(){
    console.log(this.travelForm);
  }
}
