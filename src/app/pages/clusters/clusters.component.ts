import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.scss']
})
export class ClustersComponent implements OnInit {

  // clusterForm: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.clusterForm = fb.group({
  //     clusterName: ['', Validators.required],
  //     clusterdescription: [''],
  //     locations: [''],
  //     teamName: [''],
  //     dedicatedSeats: [''],
  //     hotseats: ['']
  //   })
  //  }

  ngOnInit() {
  }



}
