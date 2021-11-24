import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadSeatBookingComponent } from './lead-seat-booking.component';

describe('LeadSeatBookingComponent', () => {
  let component: LeadSeatBookingComponent;
  let fixture: ComponentFixture<LeadSeatBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadSeatBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadSeatBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
