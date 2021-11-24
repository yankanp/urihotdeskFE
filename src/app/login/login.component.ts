import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserPermissionService } from 'app/services/user-permission.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  isButtonHidden:boolean=false;
  teamNameList: any[];
  constructor( private router: Router,private fb: FormBuilder, private authService: AuthService, private toaster: ToastrService,
    private userPermissionService:UserPermissionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username:['', [Validators.required]],
      password:['', [Validators.required]],
      teamName:['',[Validators.required]]
    })
    this.route.data.subscribe(
      data => {
        this.teamNameList = data['teamNameList'].DATA;
      }
    );
    console.log(this.teamNameList)
  }

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  onSubmit(){
    this.isButtonHidden=true;
    this.loginForm.markAllAsTouched();
    if(!this.loginForm.valid){
      this.isButtonHidden=false;
      console.log('invalid form')
    }
    else{
      let teamName = this.loginForm.get('teamName').value;
      console.log(teamName)
      this.authService.login(this.username.value, this.password.value, teamName)
        .subscribe(data => {
          // this.getAdminDetails();
          this.isButtonHidden=false;
          localStorage.setItem('access_token', data['access_token']);
          localStorage.setItem('refresh_token', data['refresh_token'])
          this.router.navigate(['dashboard'])
          this.getUserDetails();
          localStorage.setItem('refresh_token', data['refresh_token'])
          localStorage.setItem('clusterId',teamName);
        },
        errorResponse => {
          console.log(errorResponse)
          if(errorResponse.statusText=="Unknown Error"){
            this.toaster.error("Sorry, looks like there’s a problem in your internet connection. Please try again.", '', {positionClass: 'toast-top-center'});
          }
          else if(errorResponse.error.error_description=="inactive_user"){
            this.toaster.error("Sorry, a user does not exist for the entered credentials.", '', {positionClass: 'toast-top-center'});
          }
          else if(errorResponse.error.error_description=="INVALID_CREDENTIALS"){
            this.toaster.error("Sorry, your username or password is incorrect. Please try again.", '', {positionClass: 'toast-top-center'});
          }
          else{
            this.toaster.error("Sorry, a user does not exist for the entered credentials.", '', {positionClass: 'toast-top-center'});
          }
          this.isButtonHidden=false;

        });
    }
  }

  // getAdminDetails(){
  //   this.authService.getAdminDetails().subscribe(permissionList=>{
  //     this.userPermissionService.setPermissionList(permissionList.DATA.permissions);
  //   })
  // }


  getUserDetails(){
    this.authService.getUserDetails().subscribe(user=>{
    console.log(user);
    localStorage.setItem('userName', user['name']);
    })
  }
}
