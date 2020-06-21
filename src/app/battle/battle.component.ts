import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../champion.service';

@Component({
  selector: 'battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  levels: any = [
    {
      name: '1-1',
      exp: 4,
      power: 4
    },
    {
      name: '1-2',
      exp: 6,
      power: 5
    },
    {
      name: '1-3',
      exp: 8,
      power: 6
    },
  ]

  constructor(public champ: ChampionService) { }

  ngOnInit() {
  }

  onClickLevel(level) {
    console.log(`clicked level:`,level);
    this.champ.onBattle2(level);
  }

}
