import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  permissions: string[] = [];
  rolePermissions;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.rolePermissions = this.route.snapshot.data['permissions']['DATA'];
  }

  onSelectChanged(value: string){
    if(value != "")
      this.permissions = this.rolePermissions[value]
    else
      this.permissions = []
  }
}
