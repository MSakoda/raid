import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../champion.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  levels: any = [
    // {
    //   name: '1-1',
    //   exp: 4,
    //   power: 4
    // },
    // {
    //   name: '1-2',
    //   exp: 6,
    //   power: 5
    // },
    // {
    //   name: '1-3',
    //   exp: 8,
    //   power: 6
    // },
  ]

  constructor(public champ: ChampionService, public player: PlayerService) { }

  ngOnInit() {
      this.levels = this.createLevels();
  }

  createLevels(){
      // 12 areas
      // each area has 7 stages
      // power increments by 1 for each stage
      // exp increments by 2 for each stage

      let areas = [];
      let pwr = 4;
      let exp = 4;
      // areas
      for (var i = 0; i < 12; i++) {
          let area = [];
          // stages
          for (var j = 0; j < 7; j++) {
              let stage = {
                  name: `${i+1}-${j+1}`,
                  exp: exp,
                  power: pwr
              }
              area.push(stage);
              exp += 2;
              pwr += 2;
          }
          areas.push(area);
      }
      console.log(`areas:`,areas);
      return areas;
  }

  isDisabed(stage) {
      // if this stage is 1 stage after, the same, or before player
      // higest_stage, it is not disabled
      // player highest stage

      // 1-1 always enabled
      if (stage.name == '1-1') return false;
      if (this.player.player.highest_stage) {
          let hs = this.player.player.highest_stage.split("-");
          let highest_area = parseInt(hs[0]);
          let highest_stage = parseInt(hs[1]);
          let s = stage.name.split("-");
          let area = parseInt(s[0]);
          let _stage = parseInt(s[1]);
          if (highest_area >= area) {
              if (highest_stage >= _stage) {

              } else {
                  return true;
              }
          } else {
              return true;
          }
      } else {
          return true;
      }
  }

  onClickLevel(level) {
    console.log(`clicked level:`,level);
    this.champ.onBattle2(level);
  }

}
