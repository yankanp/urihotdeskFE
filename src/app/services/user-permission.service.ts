import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {
  private permissionList:BehaviorSubject<any>;
  private userName:BehaviorSubject<any>;
  private displayName:BehaviorSubject<any>;

  constructor() { 
    this.permissionList= new BehaviorSubject<any>("");
    this.userName= new BehaviorSubject<any>("");
    this.displayName= new BehaviorSubject<any>("");
  }

  getPermissionList(): Observable<any>{
    return this.permissionList.asObservable();
  }
  setPermissionList(permissionList:any){
    this.permissionList.next(permissionList);
  }

  getUserName(): Observable<any>{
    return this.userName.asObservable();
  }

  setDisplayName(displayName:any){
    this.displayName.next(displayName);
  }

  getDisplayName(): Observable<any>{
    return this.displayName.asObservable();
  }

  setUserName(userName:any){
    this.userName.next(userName);
  }
}
