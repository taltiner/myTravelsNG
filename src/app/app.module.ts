import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DisplayTravelComponent } from './display-travel/display-travel.component';
import { AddTravelComponent } from './add-travel/add-travel.component'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { RatingComponent } from './rating/rating.component';
import { StoreModule } from '@ngrx/store';
import { travelReducer } from './store/travel.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddTravelComponent,
    NavbarComponent,
    DisplayTravelComponent,
    AddTravelComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    StoreModule.forRoot({
      travel: travelReducer,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    // Fügen Sie Material-Icons zum Icon-Registry hinzu
    this.matIconRegistry.addSvgIconSetInNamespace(
      'material-icons',
      this.domSanitizer.bypassSecurityTrustResourceUrl('path/to/material-icons.svg')
    );
  }
}
