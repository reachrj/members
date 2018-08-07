/*
  Author: Ronak Jangir
  Date: 7/20/2018
*/

import { Component, Inject, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-job',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public nameList: Array<string> = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams() {
    // to get teams member
    this.dashboardService.getTeams().subscribe((data) => {
      this.nameList = this.filterTeamData(data);
      this.setAnimationOnRender();
    }, (err) => {
      console.log(err);
    })
  }

  filterTeamData(data) {
    // “Technical Lead” || “Software Engineer” role
    let filteredTeamData = data.map(team => team.state === 'VA' && team.members.filter(member => member.role === 'Technical Lead' || member.role === 'Software Engineer'));
    // Concatenate VA teams into one team
    filteredTeamData = filteredTeamData[0].concat(filteredTeamData[1], filteredTeamData[2])
      // Sort by member last name (ascending) and then by member first name (ascending)
      .sort((previous, next) => {
        let [a, b] = [previous.lastName, next.lastName];
        if (a === b) [a, b] = [previous.firstName, next.firstName];
        return a > b ? 1 : -1;
      })
      // first and last name values to single full name
      .map(member => `${member.firstName} ${member.lastName}`);
    return filteredTeamData;
  }

  setAnimationOnRender() {
    // to set fadein transition
    setTimeout(() => {
      this.nameList.forEach((name, index) => {
        let value = 0.1 * index;
        document.getElementById('name_' + index).style.transition = `opacity .25s ease-in-out ${value}s, transform .25s ease-in-out ${value}s`;
      });
      document.querySelector(".dashboard").classList.add('active');
    });
  }

}

