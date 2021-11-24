import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationRequestModel } from './models/locationRequest.model';
import { LocationsService } from './locations.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locationForm: FormGroup;
  locationList: any[];
  constructor(private fb: FormBuilder, private locationsService: LocationsService, private toaster: ToastrService,private route: ActivatedRoute) {
    this.locationForm = fb.group({
      location: ['', Validators.required],
      seatId: ['',  Validators.required],
      description: [''],
  }) }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.locationList = data['locationList'].DATA;
      }
    );
    console.log(this.locationList);
  }

  saveLocation() {
    const locationRequestModel = new LocationRequestModel();
    locationRequestModel.seatId = this.locationForm.get('seatId').value;
    locationRequestModel.location = this.locationForm.get('location').value
    locationRequestModel.description = this.locationForm.get('description').value;
    this.locationsService.saveLocation(locationRequestModel).subscribe(data => {
      this.clear();
      if(data.MESSAGE == 'SEAT_ALREADY_EXSIST'){
        this.toaster.error('Seat already exist', '', { positionClass: 'toast-top-center' });
      }
      else{
      this.locationsService.getAllLocations().subscribe(locationList => {
        this.locationList = locationList.DATA;
      })
      this.toaster.success('Seat added sucessfully!', '', { positionClass: 'toast-top-center' });

      }
     }, err => {
      this.toaster.error('Something went wrong!', '', { positionClass: 'toast-top-center' });
     })
    }

  clear() {
    this.locationForm.reset();
  }

}
