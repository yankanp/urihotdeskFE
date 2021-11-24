import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { GetAllSeatsRequestModel } from '../employee-seat-booking/models/getAllSeatsRequest.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HSeatBookingRequestModel } from '../employee-seat-booking/models/hSeatBookingRequest.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { WeeklySeatBookingService } from './weeklySeatBooking.service';
import { GetweeklySeatsRequestModel } from '../employee-seat-booking/models/getweeklySeatsRequest.model';


@Component({
  selector: 'app-weekly-seat-booking',
  templateUrl: './weekly-seat-booking.component.html',
  styleUrls: ['./weekly-seat-booking.component.scss']
})
export class WeeklySeatBookingComponent implements OnInit {

  startDateSelected: boolean = false;
  formatedEndDate: any;
  formatedstartDate: any = null;
  dedicatedSeatBookings: any[] = null;
  public totalSeatsforTeam: any[] = null;
  public totalSeats: any[] = null;
  public allBookings: any[] = null;
  selectedSeatId: any = null;
  readonly DELIMITER = '-';
  public seats: any[];
  bookingForm: FormGroup;
  locationList: any[];
  teamMemberList: Array<any> = [];
  locationSelected: boolean = false;
  loggedUserTeam: any;
  isDisable = true;
  displayYourSeat = false;
  userName = '';
  sdate: {year: number, month: number};
  edate: {year: number, month: number};

  constructor(private calendar: NgbCalendar, private fb: FormBuilder, private weeklySeatBookingService: WeeklySeatBookingService,
    private toaster: ToastrService, private route: ActivatedRoute) {
    this.bookingForm = fb.group({
      adName: ['', Validators.required],
      location: [''],
      // bookingDate: ['']
    })
  }
  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.locationList = data['locationList'].DATA;
        this.totalSeats = data['memberList'].DATA;
        console.log(this.teamMemberList)
      }
    );
    this.loggedUserTeam = localStorage.getItem('clusterId');
    for (let emp of this.totalSeats) {
      if (this.loggedUserTeam == emp.team) {
        this.teamMemberList.push(emp)
        console.log(this.teamMemberList)
      }
    }

    let displayName = localStorage.getItem('userName');
    this.userName = displayName.match(/[^_]+_[^_]+/g).toString();
  }

  getAllSeatsForLocation(value: string) {
    this.locationSelected = true;
    this.selectedSeatId = '';
    this.isDisable = true;
    this.weeklySeatBookingService.getAllSeatsForLocation(value).subscribe(allSeats => {
      this.seats = allSeats.DATA.seatNos;
      console.log(allSeats, this.seats)
    })
  }

  changeBackground(seatId: any) {

    if (this.dedicatedSeatBookings != null) {
      for (let val of this.dedicatedSeatBookings) {
        if (val.seatId == seatId) {
          if (val.type == 'Dedicated') {
            return { 'border': '3px solid #4FB0F9', 'cursor': 'pointer', 'opacity': '1' }; //blue
          }
          else if (val.type == 'Hot') {
            return { 'border': '3px solid #53AA33' }; //green
          }
        }
      }
      for (let val of this.totalSeatsforTeam) {
        if (val.seatId == seatId) {
          return { 'border': '3px solid red' };
        }
      }

    }
  }

  getSeats(date: any) {
    this.isDisable = true;
    // this.formatedstartDate = date.year + this.DELIMITER + date.month + this.DELIMITER + date.day + '';
    this.formatedEndDate = this.formatDate(date);
    let getweeklySeatsRequestModel = new GetweeklySeatsRequestModel();
    getweeklySeatsRequestModel.startDate = this.formatedstartDate;
    getweeklySeatsRequestModel.endDate = this.formatedEndDate;
    getweeklySeatsRequestModel.clusterId = localStorage.getItem('clusterId');
    this.weeklySeatBookingService.getAllSeats(getweeklySeatsRequestModel).subscribe(allSeats => {
      this.totalSeatsforTeam = allSeats.DATA.totalSeatsforTeam;
      this.dedicatedSeatBookings = allSeats.DATA.availableSeats;
      this.allBookings = allSeats.DATA.allBookings;
    })
  }

  formatDate(date: any) {
    console.log(date)
    return date.year + this.DELIMITER + date.month + this.DELIMITER + date.day + '';
  }

  addStartDate(date: any) {
    console.log("addStartDate")
    this.startDateSelected = true;
    this.formatedstartDate = this.formatDate(date);
  }

  yourSeat(seatId: any){
    if (this.allBookings != null) {

      for (let val of this.allBookings) {
        if(val.seatId === seatId){
          if (val.employeeId === this.userName) {
            return { 'visibility': 'visible' };
          }
          else if(val.employeeId !== this.userName){
            return{ 'visibility': 'hidden' };
          }
        }
      }
      for (let val of this.seats) {
          return{ 'visibility': 'hidden' };
      }
    }
  }

  selectedSeat(seatId: any) {
    console.log('seatId', seatId);
    this.selectedSeatId = seatId;
    this.buttonVisibility(seatId);
  }

  buttonVisibility(seatId: any) {
    this.isDisable = true;
    for (let val of this.dedicatedSeatBookings) {
      if (val.seatId == seatId) {
        if (val.type == 'Dedicated') {
          console.log('Dedicated', seatId);
          this.isDisable = false;
          return;
        }
        else if (val.type == 'Hot') {
          console.log('Hot', seatId);
          this.isDisable = true;
          return;
        }
      }
      else{
        this.isDisable=true;
      }
    }
  }


  bookDedicatedSeats() {
    if (!this.bookingForm.valid || this.formatedstartDate == null || this.selectedSeatId == null) {
      this.toaster.error('Some fields are empty', '', { positionClass: 'toast-top-center' });
      return;
    }
    const hSeatBookingRequestModel = new HSeatBookingRequestModel();
    hSeatBookingRequestModel.empId = this.bookingForm.get('adName').value;
    hSeatBookingRequestModel.endDate = this.formatedEndDate;
    hSeatBookingRequestModel.startDate = this.formatedstartDate;
    hSeatBookingRequestModel.seatNo = this.selectedSeatId;
    hSeatBookingRequestModel.clusterId = localStorage.getItem('clusterId')
    let location = this.bookingForm.get('location').value;
    this.getAllSeatsForLocation(location);
    this.weeklySeatBookingService.bookHotSeat(hSeatBookingRequestModel).subscribe(data => {
      if (data.MESSAGE == 'SEAT_DOES_NOT_BELONG_TO_TEAM') {
        this.toaster.error('Seat does not belong to team !', '', { positionClass: 'toast-top-center' });
      }
      else if (data.MESSAGE == 'SEAT_ALREADY_BOOKED') {
        this.toaster.error('Seat already booked', '', { positionClass: 'toast-top-center' });
      }
      else if (data.MESSAGE == 'BOOKING_CREATED') {
        this.toaster.success('Dedicated seat booked sucessfully!', '', { positionClass: 'toast-top-center' });
        this.bookingForm.reset();
      }
      else {
        this.toaster.error('Something went wrong', '', { positionClass: 'toast-top-center' });
      }

    })
  }
}
