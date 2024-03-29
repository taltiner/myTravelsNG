import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTravel } from '../store/travel.actions';
import { Observable } from 'rxjs';
import { TravelState } from "../store/travel.state";
import { TravelService } from '../travel.service';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.css']
})
export class AddTravelComponent implements OnInit {
  travelForm: FormGroup = new FormGroup("");
  travelState$: Observable<TravelState>

  constructor(private travelService: TravelService, private store: Store<{ travel: TravelState }>) {
    this.travelState$ = store.select('travel');
  }

  ngOnInit(): void {
    console.log('----INITIALER STATE');
    console.log(this.travelState$);
    this.initializeForm();
    this.onActivityChange();
  }

  ngAfterViewInit() {
    console.log('----NACH INITIALER STATE');
    console.log(this.travelState$);
  }

  initializeForm() {
    this.travelForm = new FormGroup({
      'startDate': new FormControl(null, Validators.required),
      'endDate': new FormControl(null, Validators.required),
      'country': new FormControl(null, [Validators.required, this.validateLocation.bind(this)]),
      'city': new FormControl(null, [Validators.required, this.validateLocation.bind(this)]),
      'activities': new FormControl(null),
      'comment': new FormControl(null),
      'rating': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.travelForm);
    this.store.dispatch(addTravel({ travel: this.travelForm.value }));
      console.log(this.travelState$);
    this.travelService.addTravels(this.travelForm);  
  }

  validateLocation(control: FormControl): { [s: string]: boolean } | null {
    if (control.value) {
      if (control.value.length > 20) {
        return { 'maxLengthError': true };
      } else if (!this.isPatternCorrect('locationPattern', control.value)) {
        return { 'onlyLettersError': true };
      } else {
        return null;
      }
    }
    return null;
  }



  validateDate(control: FormControl): { [s: string]: boolean } | null {
    if (control.value && !this.isPatternCorrect('datePattern', control.value)) {
      return { 'datePatternError': true };
    } else {
      return null;
    }
  }

  isPatternCorrect(toBeChecked: string, inputString: any): boolean {
    let pattern: RegExp;
    switch (toBeChecked) {
      case 'locationPattern':
        pattern = /^[a-zA-Z]+$/;
        break;
      case 'datePattern':
        pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        break;
    }
    return pattern.test(inputString);
  }

  onActivityChange() {
      this.travelForm.controls.activities.valueChanges.subscribe(value => {
      if (value) {
        this.travelForm.get('rating').setValidators(Validators.required);
        this.travelForm.get('comment').setValidators(Validators.required);
      } else {
        this.travelForm.get('rating').clearValidators();
        this.travelForm.get('comment').clearValidators();
      }
      this.travelForm.get('rating').updateValueAndValidity();
      this.travelForm.get('comment').updateValueAndValidity();
    }) 
  }
}
