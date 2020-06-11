import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../champion.service';

@Component({
  selector: 'rank-up',
  templateUrl: './rank-up.component.html',
  styleUrls: ['./rank-up.component.css']
})
export class RankUpComponent implements OnInit {

  constructor(public champ: ChampionService) { }

  ngOnInit() {
      // create merge slots for each champion that will merge into main champ
  }

  onCancel() {
      this.champ.rank_up_main = null;
  }

}
