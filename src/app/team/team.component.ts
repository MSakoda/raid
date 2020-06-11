import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../champion.service';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(public champ: ChampionService) { }

  removeChampion(index){
      this.champ.team[index].champion = null;
      this.champ.checkTeamFull();
      this.champ.updateTeam();
  }

  ngOnInit() {
  }

}
