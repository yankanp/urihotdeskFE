import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSeatBookingComponent } from './employee-seat-booking.component';

describe('EmployeeSeatBookingComponent', () => {
  let component: EmployeeSeatBookingComponent;
  let fixture: ComponentFixture<EmployeeSeatBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSeatBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSeatBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
