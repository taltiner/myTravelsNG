import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.css']
})
export class AddTravelComponent implements OnInit {
  travelForm: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.travelForm = new FormGroup({
      'startDate': new FormControl(null, [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/)]),
      'endDate': new FormControl(null, Validators.required),
      'country': new FormControl(null, [Validators.required, this.validateLocation.bind(this)]),
      'city': new FormControl(null, [Validators.required, this.validateLocation.bind(this)]),
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

  validateLocation(control: FormControl): {[s:string]: boolean} | null{
   if(control.value){
    if(control.value.length > 20){
      return {'maxLengthError': true};
    }else if(!this.isPatternCorrect('locationPattern', control.value)){
      return {'onlyLettersError': true};
    }else {
      return null;
    }
   }
    return null; 
  }



  validateDate(control: FormControl): {[s:string]: boolean} | null{
    if(control.value && !this.isPatternCorrect('datePattern', control.value)){
      console.log('invalid Date')
      return {'datePatternError': true};
    }else {
      return null;
    }
  }

  isPatternCorrect(toBeChecked: string, inputString: any): boolean{
   let pattern: RegExp;
   switch(toBeChecked){
    case 'locationPattern':
     pattern = /^[a-zA-Z]+$/;
     break;
    case 'datePattern': 
      pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    break;  
    }
    return pattern.test(inputString);
  }
}
