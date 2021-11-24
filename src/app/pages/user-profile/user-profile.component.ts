import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContentComponent } from '../ngbd-modal-content/ngbd-modal-content.component';
import { UserProfileService } from './services/userProfileService';
import { UserPermissionService } from 'app/services/user-permission.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userList:any;
  userForm:FormGroup;
  userName:string;
  submitted = false;
  validateRequiredFeilds:boolean=false;
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private modalService: NgbModal,
    private userProfileService:UserProfileService,private userPermissionService: UserPermissionService,
    private toaster: ToastrService,) {
    this.userForm = fb.group({
      adName:["",Validators.required],
      name:[""],
      email:[""],
      userRole:[""],
      isEnable:[""]
    })
   }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.userList = data['userProfileList'].DATA;
      console.log(this.userList,data['userProfileList'])
    })

    this.userPermissionService.getUserName().subscribe(data=>{
      console.log(data);
     this.userName=data;
    })
  }

// convenience getter for easy access to form fields
get formFileds() { return this.userForm.controls; }

  openConfirmation(id: string,status:boolean,type:string) {
    const modalRef = this.modalService.open(NgbdModalContentComponent,{
      beforeDismiss: () => this.getAllUsers()
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type=type;

    if(status){
      status=false;
    }
    else{
      status=true;
    }
    modalRef.componentInstance.status=status;
    modalRef.componentInstance.question = "Do you want to change the status of this user?" ;
  }

  getAllUsers(){
    this.userProfileService.getAllUsers().subscribe(users=>{
      this.userList=users.DATA;
    })
    return true;
  }

  clear(){
    this.userForm.reset();
    this.submitted = false;
    this.userForm.get('adName').enable();
    this.validateRequiredFeilds=false;
  }

  save(){
    this.submitted = true;
    if(!this.userForm.valid){
      this.userForm.markAllAsTouched();
      return;
    }
    let user={
      adName:this.userForm.get('adName').value,
      adminName:this.userForm.get('name').value,
      adminEmail:this.userForm.get('email').value,
      adminUserRole:this.userForm.get('userRole').value,
      isActiveAdmin:this.userForm.get('isEnable').value
  }
  console.log(user)
  this.userProfileService.addAdminDetail(user).subscribe(data=>{
    if(data.MESSAGE=="USER_ADDED"){
      this.toaster.success("User added successfully!", '', { positionClass: 'toast-top-center' });
      this.getAllUsers();
    }
    else if(data.MESSAGE=="USER_ADDED_FAILED"){
      this.toaster.error("Sorry, failed to add the selected user. Please try again.", '', { positionClass: 'toast-top-center' });
    }
    else if(data.MESSAGE=="USER_ALREADY_EXISTS"){
      this.toaster.error("Sorry, user already exists.", '', { positionClass: 'toast-top-center' });
    }
  })
  this.clear();
  }

  searchLdapUser(){
    this.submitted = true;
    if(!this.userForm.valid){
      this.userForm.markAllAsTouched();
      return;
    }
    let userName=this.userForm.get('adName').value;

    this.userProfileService.searchLdapUserDetails(userName).subscribe(userDetails=>{
      if(userDetails.MESSAGE=="SEARCH_SUCCESS"){
        this.validateRequiredFeilds=true;
        this.userForm.get('name').patchValue(userDetails.DATA.fullName)
        this.userForm.get('email').patchValue(userDetails.DATA.email)
        this.userForm.get('isEnable').patchValue(true)
        this.userForm.get('userRole').patchValue("ADMIN")
        this.userForm.get('adName').disable();
      }
      else if(userDetails.MESSAGE=="SEARCH_FAILED"){
        this.toaster.error("Sorry, we cannot find a user in the name you entered. Please check the name and try again.", '', { positionClass: 'toast-top-center' });
      }
      else if(userDetails.MESSAGE=="USER_NOT_FOUND"){
        this.toaster.error("Sorry, we cannot find a user in the name you entered. Please check the name and try again.", '', { positionClass: 'toast-top-center' });
      }

    })
  }
}
