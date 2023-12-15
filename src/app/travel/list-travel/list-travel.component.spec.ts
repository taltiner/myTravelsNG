import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTravelComponent } from './list-travel.component';

describe('ListTravelComponent', () => {
  let component: ListTravelComponent;
  let fixture: ComponentFixture<ListTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTravelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
