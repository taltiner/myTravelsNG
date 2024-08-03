import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTravel } from '../store/travel.actions';
import { Observable } from 'rxjs';
import { Travel } from "../model/travel";
import { Option } from "../model/options";
import { ActivityOptions } from "../model/activities";
import { TravelService } from '../travel.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.css']
})
export class AddTravelComponent implements OnInit {
  travelForm: FormGroup = new FormGroup("");
  travelState$: Observable<Travel>;
  activityOptions: Option[] = ActivityOptions;
  
  constructor(private travelService: TravelService, 
              private store: Store<{travel: Travel}>, 
              private activatedRoute: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.initializeForm();
      if(this.activatedRoute.snapshot !== undefined && this.activatedRoute.snapshot.queryParams.id !== undefined) {
        
        const id = this.activatedRoute.snapshot.queryParams.id;
        this.travelService.getTravel(id).subscribe( (travel) => {
          this.travelForm.patchValue(travel);
        });
      }

      this.onActivityChange();
  }

  ngAfterViewInit() {

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
    this.router.navigate(['..']);
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

  onCancel() {
    console.log('onCancel');
    
    this.router.navigate(['..']);
  }
}
