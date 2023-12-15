import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { TravelComponent } from './travel/travel.component';
import { AddTravelComponent } from './travel/add-travel/add-travel.component';
import { ListTravelComponent } from './travel/list-travel/list-travel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TravelComponent,
    AddTravelComponent,
    ListTravelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
