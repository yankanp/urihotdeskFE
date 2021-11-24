import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklySeatBookingComponent } from './weekly-seat-booking.component';

describe('WeeklySeatBookingComponent', () => {
  let component: WeeklySeatBookingComponent;
  let fixture: ComponentFixture<WeeklySeatBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklySeatBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklySeatBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
