import { Component, OnInit, Input } from '@angular/core';
import { ChampionService } from '../champion.service';

@Component({
  selector: 'champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.css']
})
export class ChampionComponent implements OnInit {
    @Input() champion: any;

  constructor(public champ: ChampionService) { }

  ngOnInit() {
  }

  train(){
      if (this.champion.exp < this.champion.max_exp) {
          this.champion.exp += 1;
      }
  }

  onSelect() {
      this.champ.selectChampion(this.champion);
  }

  onClickRankUp() {
      console.log(`clicked rank up`);
      this.champ.rank_up_main = this.champion;
  }

}
