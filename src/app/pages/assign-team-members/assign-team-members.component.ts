import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AssignTeamMemberRequestModel } from './models/assignTeamMemberRequest.model';
import { AssignTeamMemberService } from './assignTeamMember.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assign-team-members',
  templateUrl: './assign-team-members.component.html',
  styleUrls: ['./assign-team-members.component.scss']
})
export class AssignTeamMembersComponent implements OnInit {
  assignMemberForm: FormGroup;
  teamList: any[];
  teamMemberList:any[];
  constructor(private fb: FormBuilder, private assignTeamMemberService: AssignTeamMemberService , private toaster: ToastrService,
     private route: ActivatedRoute) {
    this.assignMemberForm = fb.group({
    teamName: ['', Validators.required],
    adName: ['',  Validators.required],
    name: [''],
    email: [''],
    isLead: [true]
  }) }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.teamList = data['teamList'].DATA;
        this.teamMemberList = data['teamMemberList'].DATA;
        console.log(this.teamMemberList);
      }
    );
  }

  saveTeamMember(){
    const assignTeamMemberRequestModel = new AssignTeamMemberRequestModel;
    assignTeamMemberRequestModel.adName = this.assignMemberForm.get('adName').value
    assignTeamMemberRequestModel.teamId = this.assignMemberForm.get('teamName').value
    assignTeamMemberRequestModel.role = this.assignMemberForm.get('isLead').value ? 'LEAD' : 'EMPLOYEE';
    console.log(assignTeamMemberRequestModel,this.assignMemberForm.get('isLead'))
    this.assignTeamMemberService.saveTeamMember(assignTeamMemberRequestModel).subscribe(data => {
      this.clear();
      this.getTeamMembers();
      this.toaster.success('Team member added sucessfully!', '', { positionClass: 'toast-top-center' });
     }, err => {
      this.toaster.error('Something went wrong!', '', { positionClass: 'toast-top-center' });
     })
  }

  clear(){
    this.assignMemberForm.reset();
  }

  getTeamMembers(){
    this.assignTeamMemberService.getAllTeamMembers().subscribe(teamMembers => {
      this.teamMemberList = teamMembers.DATA;
    })
  }
}
