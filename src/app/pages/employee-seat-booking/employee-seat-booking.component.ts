import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { HSeatBookingRequestModel } from './models/hSeatBookingRequest.model';
import { EmployeeSeatBookingService } from './employeeSeatBooking.service';
import { ToastrService } from 'ngx-toastr';
import { GetAllSeatsRequestModel } from './models/getAllSeatsRequest.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-seat-booking',
  templateUrl: './employee-seat-booking.component.html',
  styleUrls: ['./employee-seat-booking.component.scss']
})
export class EmployeeSeatBookingComponent implements OnInit {
  seatBookingForm: FormGroup;
  isDisable=false;
  public availableSeats:any[]=null;
  public totalSeatsforTeam:any[]=null;
  public seats: any[];

  model: NgbDateStruct;
  date: { year: number, month: number };
  readonly DELIMITER = '-';
  startDate: string = null;
  selectedSeatId: any = null;
  locationList: any[];
  locationSelected:boolean=false;
  changeText: boolean;
  public allBookings: any[] = null;
  ownerName = '';
  constructor(private fb: FormBuilder, private calendar: NgbCalendar, private toaster: ToastrService,
    private employeeSeatBookingService: EmployeeSeatBookingService,private route: ActivatedRoute,) {
    this.seatBookingForm = fb.group({
      location: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.locationList = data['locationList'].DATA;
      }
    );

  }

  getAllSeatsForLocation(value: string){
    this.locationSelected=true;
    this.isDisable=true;
    this.selectedSeatId='';
    this.employeeSeatBookingService.getAllSeatsForLocation(value).subscribe(allSeats => {
      this.seats = allSeats.DATA.seatNos;
    })
  }


  selectToday() {
    this.model = this.calendar.getToday();
  }

  getSeats(date: any) {
    this.isDisable=true;
    this.getAllSeatsForLocation(this.seatBookingForm.get('location').value);
    this.startDate = date.year + this.DELIMITER + date.month + this.DELIMITER + date.day + '';
    let getAllSeatsRequestModel = new GetAllSeatsRequestModel();
    getAllSeatsRequestModel.bookDate = this.startDate;
    // getAllSeatsRequestModel.startDate = this.startDate;
    getAllSeatsRequestModel.clusterId = localStorage.getItem('clusterId');
    this.employeeSeatBookingService.getAllSeats(getAllSeatsRequestModel).subscribe(allSeats => {
      // this.seats = allSeats.DATA.totalSeatsforTeam;
      this.availableSeats = allSeats.DATA.availableSeats;
      this.totalSeatsforTeam= allSeats.DATA.totalSeatsforTeam;
      this.allBookings = allSeats.DATA.allBookings;
    })
  }

  changeBackground(seatId: any) {
    console.log('Inside change beckgorund')
    if(this.availableSeats != null){
    for (let val of this.availableSeats) {
      console.log('val is'+val);
      console.log('response seatId '+val.seatId+' app seat id '+seatId);
      if (val.seatId == seatId) {
        if (val.type == 'Dedicated') {
          return { 'border': '3px solid #4FB0F9' }; //blue
        }
        else if(val.type == 'Hot'){
          console.log('this.availableSeats')
          // this.isDisable=false;
          return { 'border': '3px solid #53AA33', 'cursor': 'pointer','opacity': '1'   }; //green
        }
      }
    }
    for (let val of this.totalSeatsforTeam) {
      if (val.seatId == seatId) {
        return { 'border': '3px solid red' };
      }
    }
  }else if(this.availableSeats == []){
    return {'cursor': 'not-allowed'};
  }
  }

  bookHotSeat() {
    if (this.startDate == null || this.selectedSeatId== null) {
      this.toaster.error('Some fields are empty', '', { positionClass: 'toast-top-center' });
      return;
    }
    const hSeatBookingRequestModel = new HSeatBookingRequestModel();
    let displayName = localStorage.getItem('userName');
    let userName = displayName.match(/[^_]+_[^_]+/g).toString();
    hSeatBookingRequestModel.empId = userName;
    hSeatBookingRequestModel.endDate = this.startDate;
    hSeatBookingRequestModel.startDate = this.startDate;
    hSeatBookingRequestModel.seatNo = this.selectedSeatId;
    hSeatBookingRequestModel.clusterId = localStorage.getItem('clusterId')
    let location = this.seatBookingForm.get('location').value;
    this.employeeSeatBookingService.bookHotSeat(hSeatBookingRequestModel).subscribe(data => {
      console.log('Seat Booking Request '+hSeatBookingRequestModel)
      this.getAllSeatsForLocation(location);
      if(data.MESSAGE == 'SEAT_DOES_NOT_BELONG_TO_TEAM'){
        this.toaster.error('Seat does not belong to team !', '', { positionClass: 'toast-top-center' });
      }
      else if(data.MESSAGE == 'SEAT_ALREADY_BOOKED'){
        this.toaster.error('Seat already booked', '', { positionClass: 'toast-top-center' });
      }
      else if(data.MESSAGE == 'BOOKING_CREATED'){
        this.toaster.success('Hot seat booked sucessfully!', '', { positionClass: 'toast-top-center' });
      }
      else{
        this.toaster.error('Something went wrong', '', { positionClass: 'toast-top-center' });
      }
      // this.toaster.success('Hot  seat booked sucessfully!', '', { positionClass: 'toast-top-center' });
    },err => {
      this.toaster.error('Something went wrong', '', { positionClass: 'toast-top-center' });
    })
  }

  selectedSeat(seatId: any) {
    this.selectedSeatId = seatId;
    this.buttonVisibility(seatId);
  }


  buttonVisibility(seatId: any) {
    this.isDisable = true;
    for (let val of this.availableSeats) {
      if (val.seatId == seatId) {
        if (val.type == 'Dedicated') {
          this.isDisable=true;
          return;
        }
        else if(val.type == 'Hot'){
          this.isDisable=false;
          return;
        }

      }
      else{
        this.isDisable=true;
      }
    }
  }

  yourSeat(seatId: any){
    let displayName = localStorage.getItem('userName');
    let userName = displayName.match(/[^_]+_[^_]+/g).toString();
    userName=userName.split("_")[0];
    if (this.allBookings != null) {

      for (let val of this.allBookings) {
        if(val.seatId === seatId){
          console.log('yankan log ',userName,val.employeeId);
          if (val.employeeId === userName) {
            return { 'visibility': 'visible' };
          }
          else if(val.employeeId !== userName){
            return{ 'visibility': 'hidden' };
          }
        }

      }
      for (let val of this.seats) {
          return{ 'visibility': 'hidden' };
      }

    }
  }
}
