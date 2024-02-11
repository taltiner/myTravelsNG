import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTravelComponent } from './display-travel.component';

describe('DisplayTravelComponent', () => {
  let component: DisplayTravelComponent;
  let fixture: ComponentFixture<DisplayTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayTravelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
