import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { LeadSeatBookingService } from './leadSeatBooking.service';
import { GetAllSeatsRequestModel } from '../employee-seat-booking/models/getAllSeatsRequest.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HSeatBookingRequestModel } from '../employee-seat-booking/models/hSeatBookingRequest.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lead-seat-booking',
  templateUrl: './lead-seat-booking.component.html',
  styleUrls: ['./lead-seat-booking.component.scss']
})
export class LeadSeatBookingComponent implements OnInit {
  smodel: NgbDateStruct;
  emodel: NgbDateStruct;
  sdate: { year: number, month: number };
  edate: { year: number, month: number };
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
  ownerName = '';
  userName = '';
  constructor(private calendar: NgbCalendar, private leadSeatBookingService: LeadSeatBookingService, private fb: FormBuilder,
    private toaster: ToastrService, private route: ActivatedRoute) {
    this.bookingForm = fb.group({
      adName: ['', Validators.required],
      location: [''],
      bookingDate: ['']
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

  selectToday() {
    this.smodel = this.calendar.getToday();
    this.emodel = this.calendar.getToday();
  }
  addStartDate(date: any) {
    this.startDateSelected = true;
    this.formatedstartDate = this.formatDate(date);
  }

  formatDate(date: any) {
    console.log(date)
    return date.year + this.DELIMITER + date.month + this.DELIMITER + date.day + '';
  }

  getSeats(date: any) {
    this.isDisable = true;
    this.formatedstartDate = date.year + this.DELIMITER + date.month + this.DELIMITER + date.day + '';
    this.formatedEndDate = this.formatDate(date);
    let getAllSeatsRequestModel = new GetAllSeatsRequestModel();
    getAllSeatsRequestModel.bookDate = this.formatedstartDate;
    // getAllSeatsRequestModel.startDate = this.formatedstartDate;
    getAllSeatsRequestModel.clusterId = localStorage.getItem('clusterId');
    this.leadSeatBookingService.getAllSeats(getAllSeatsRequestModel).subscribe(allSeats => {
      this.totalSeatsforTeam = allSeats.DATA.totalSeatsforTeam;
      this.dedicatedSeatBookings = allSeats.DATA.availableSeats;
      this.allBookings = allSeats.DATA.allBookings;
      console.log(this.seats);
    })
  }

  changeBackground(seatId: any) {

    if (this.dedicatedSeatBookings != null) {
      // }
      // console.log(this.dedicatedSeatBookings)
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

  selectedSeat(seatId: any) {
    console.log('seatId', seatId);
    this.selectedSeatId = seatId;
    this.buttonVisibility(seatId);
  }

  bookDedicatedSeats() {
    if (!this.bookingForm.valid || this.formatedstartDate == null || this.selectedSeatId == null) {
      this.toaster.error('Some fields are empty', '', { positionClass: 'toast-top-center' });
      return;
    }
    const hSeatBookingRequestModel = new HSeatBookingRequestModel();
    hSeatBookingRequestModel.empId = this.bookingForm.get('adName').value;
    hSeatBookingRequestModel.endDate = this.formatedstartDate;
    hSeatBookingRequestModel.startDate = this.formatedstartDate;
    hSeatBookingRequestModel.seatNo = this.selectedSeatId;
    hSeatBookingRequestModel.clusterId = localStorage.getItem('clusterId')
    let location = this.bookingForm.get('location').value;
    this.getAllSeatsForLocation(location);
    this.leadSeatBookingService.bookHotSeat(hSeatBookingRequestModel).subscribe(data => {
      if (data.MESSAGE == 'SEAT_DOES_NOT_BELONG_TO_TEAM') {
        this.toaster.error('Seat does not belong to team !', '', { positionClass: 'toast-top-center' });
      }
      else if (data.MESSAGE == 'SEAT_ALREADY_BOOKED') {
        this.toaster.error('Seat already booked', '', { positionClass: 'toast-top-center' });
      }
      else if (data.MESSAGE == 'BOOKING_CREATED') {
        this.toaster.success('Dedicated seat booked sucessfully!', '', { positionClass: 'toast-top-center' });
      }
      else {
        this.toaster.error('Something went wrong', '', { positionClass: 'toast-top-center' });
      }

    })
  }

  getAllSeatsForLocation(value: string) {
    this.locationSelected = true;
    this.selectedSeatId = '';
    this.isDisable = true;
    this.leadSeatBookingService.getAllSeatsForLocation(value).subscribe(allSeats => {
      this.seats = allSeats.DATA.seatNos;
      console.log(allSeats, this.seats)
    })
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

  yourSeat(seatId: any){


    if (this.allBookings != null) {

      for (let val of this.allBookings) {
        if(val.seatId === seatId){
          if (val.employeeId === this.userName.split("_")[0]) {
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

  seatOwner(seatId: any){
    if (this.allBookings != null) {
      for (let val of this.allBookings) {
        if(val.seatId === seatId){
          if (val.employeeId === this.userName.split("_")[0]) {
            return { 'visibility': 'hidden' };
          }

          this.ownerName= val.employeeId.toString();
          return{ 'visibility': 'visible' };
        }

      }
      for (let val of this.seats) {
          return{ 'visibility': 'hidden' };
      }

    }
  }
}
