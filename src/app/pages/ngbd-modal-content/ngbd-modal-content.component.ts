import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserProfileService } from '../user-profile/services/userProfileService';

@Component({
  selector: 'app-ngbd-modal-content',
  templateUrl: './ngbd-modal-content.component.html',
  styleUrls: ['./ngbd-modal-content.component.scss']
})
export class NgbdModalContentComponent implements OnInit {

  @Input() id;
  @Input() question;
  @Input() type;
  @Input() status;
  promotionList: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal,  private userProfileService:UserProfileService,
    private toaster: ToastrService, private router: Router)
     {

     }

  ngOnInit() {
  }

  confirm() {
    if (this.type == "Logout Confirmation"){
      localStorage.removeItem('access_token');
      this.activeModal.close('Close click');
      this.router.navigate([""]);

    }
  }

  // getPromotionList(){
  //   this.promotionService.getAllPromotions().subscribe(promoList => {
  //     this.promotionList = promoList.DATA;
  //   })
  //   return true;
  // }

}
