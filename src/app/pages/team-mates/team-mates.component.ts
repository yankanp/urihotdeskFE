import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-mates',
  templateUrl: './team-mates.component.html',
  styleUrls: ['./team-mates.component.scss']
})
export class TeamMatesComponent implements OnInit {
  teamMemberList: any[];
  loggedUserTeam:any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.teamMemberList = data['memberList'].DATA;
        console.log(this.teamMemberList)
      }
    );
      this.loggedUserTeam = localStorage.getItem('clusterId');

  }

}
