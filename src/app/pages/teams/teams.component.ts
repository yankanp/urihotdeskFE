import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamsService } from './teams.service';
import { ToastrService } from 'ngx-toastr';
import { TeamRequestModel } from './models/teamRequest.model';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ConstantPool } from '@angular/compiler';
import { ClusterRequestModel } from './models/clusterRequest.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teamForm: FormGroup;
  clusterForm: FormGroup;
  locationList: any[];
  teamList: any[];
  smodel: NgbDateStruct;
  emodel: NgbDateStruct;
  sdate: {year: number, month: number};
  edate: {year: number, month: number};
  startDateSelected: boolean = false;
  formatedEndDate: any;
  formatedstartDate: any;
  readonly DELIMITER = '-';
  // items: any[];
  dedicatedSeats:  Array<any> = [];
  hotSeats:  Array<any> = [];
  duplicates: Array<any>=[];
  public items: any[];

  constructor(private fb: FormBuilder,private calendar: NgbCalendar, private teamsService: TeamsService, private toaster: ToastrService, private route: ActivatedRoute,) {
    this.teamForm = fb.group({
      teamName: ['', Validators.required],
      description: [''],
      location: [''],
    })
    this.clusterForm = fb.group({
      // clusterName: ['', Validators.required],
      // clusterdescription: [''],
      location: [''],
      teamName: [''],
    })
   }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.locationList = data['locationList'].DATA;
        this.teamList = data['teamList'].DATA;
      }
    );
    console.log(this.locationList[0].locationId);
  }
  onItemAddedToHot(event: any){
    console.log(event)
    this.hotSeats.push(event);
    this.checkDuplicated();
  }

  onItemAddedToDedicated(event: any){
    console.log(event)
    this.dedicatedSeats.push(event);
    console.log(this.dedicatedSeats);
    this.checkDuplicated();
  }

  removeHotSeats(event: any) {
    console.log(event)
    this.hotSeats = this.hotSeats.filter(({ value }) => value !== event.value);
    console.log(this.hotSeats);
    this.checkDuplicated();
  }

  removeDedicatedSeats(event: any) {
    console.log(event)
    this.dedicatedSeats = this.dedicatedSeats.filter(({ value }) => value !== event.value);
    console.log(this.dedicatedSeats);
    this.checkDuplicated();
  }

  saveTeams() {
    const teamRequestModel = new TeamRequestModel();
    teamRequestModel.teamId = this.teamForm.get('teamName').value;
    teamRequestModel.description = this.teamForm.get('description').value;
    teamRequestModel.location = this.teamForm.get('location').value;
    this.teamsService.saveTeams(teamRequestModel).subscribe(data => {
      this.clear();
      this.getAllTeams();
      this.toaster.success('Team added sucessfully!', '', { positionClass: 'toast-top-center' });
     }, err => {
      this.toaster.error('Something went wrong!', '', { positionClass: 'toast-top-center' });
     })
  }

  clear(){
    this.teamForm.reset();
  }


  selectToday() {
    this.smodel = this.calendar.getToday();
    this.emodel = this.calendar.getToday();
  }

  getSeats(date: any){
    this.formatedEndDate = this.formatDate(date);
    const request = {
      'startDate': this.formatedstartDate,
      'endDate': this.formatedEndDate,
	    'location': this.clusterForm.get('location').value
    }
    this.teamsService.getSeats(request).subscribe(seats=>{
      let seatList = seats.DATA;
      console.log(seatList)
      this.items = seatList
    })
  }

  addStartDate(date: any) {
    this.startDateSelected = true;
    this.formatedstartDate = this.formatDate(date);
  }

  formatDate(date: any) {
    return date.year + this.DELIMITER + date.month + this.DELIMITER + date.day + '' ;
  }

  checkDuplicated(){
    // const firstArray = [1,2,3,4,5,6 ],
    // secondArray = [2,4,6,8],
    console.log(this.hotSeats)
    this.duplicates = this.hotSeats.filter(o => this.dedicatedSeats.some(({display, value}) => o.display === display && o.value === value));
    console.log(this.duplicates)

  }

  saveSeatsForTeam(){
    let teamSeatCreateRequest :Array<any> = [];
    for(let hotseat of this.hotSeats){
      let clusterRequestModel = new ClusterRequestModel();
          clusterRequestModel.location = this.clusterForm.get('location').value;
          // this.clusterForm.get('location').value;
          clusterRequestModel.startDate = this.formatedstartDate;
          clusterRequestModel.endDate = this.formatedEndDate;
          clusterRequestModel.seatId = hotseat.value;
          clusterRequestModel.type = 'Hot';
          clusterRequestModel.teamId = this.clusterForm.get('teamName').value;
          console.log(clusterRequestModel);
          teamSeatCreateRequest.push(clusterRequestModel);
    }
    for(let dedicatedSeat of this.dedicatedSeats){
      let clusterRequestModel = new ClusterRequestModel();
        clusterRequestModel.location = this.clusterForm.get('location').value;
        // this.clusterForm.get('location').value;
        clusterRequestModel.type = 'Dedicated';
        clusterRequestModel.startDate = this.formatedstartDate;
        clusterRequestModel.endDate = this.formatedEndDate;
        clusterRequestModel.seatId = dedicatedSeat.value;
        clusterRequestModel.teamId = this.clusterForm.get('teamName').value;
        console.log(clusterRequestModel);
        teamSeatCreateRequest.push(clusterRequestModel);
    }
    console.log(teamSeatCreateRequest);
    let teamSeats ={
      teamSeatCreateRequest
    }
    this.teamsService.saveSeatsForTeam(teamSeats).subscribe(data=>{
      this.clearClusterForm();
      if(data.MESSAGE=== 'SEAT_ALREADY_BOOKED'){
        this.teamsService.getAllTeams().subscribe(teamList=>{
          this.teamList = teamList.DATA;
        })
        this.toaster.error('Some seats are already booked!', '', { positionClass: 'toast-top-center' });
      }
      else{
        this.toaster.success('Seats added sucessfully!', '', { positionClass: 'toast-top-center' });
      }

    })

  }

  clearClusterForm(){
    this.clusterForm.reset();
  }

  getAllTeams(){
    this.teamsService.getAllTeams().subscribe(teamList => {
      this.teamList = teamList.DATA;
    })
  }
}
