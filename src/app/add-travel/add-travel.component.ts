import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
      'startDate': new FormControl(null, Validators.required),
      'endDate': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'activities': new FormControl(null, Validators.required),
      'comment': new FormControl(null, Validators.required),
      'rating': new FormGroup({
        'rating': new FormControl(null, Validators.required)
      })
    });
  }

  onSubmit(){
    console.log(this.travelForm);
  }
}
