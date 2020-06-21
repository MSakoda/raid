import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../champion.service';

@Component({
  selector: 'rank-up',
  templateUrl: './rank-up.component.html',
  styleUrls: ['./rank-up.component.css']
})
export class RankUpComponent implements OnInit {

  champions: any[] = [];

  canMerge: boolean = false;

  constructor(public champ: ChampionService) { }

  ngOnInit() {
      // create merge slots for each champion that will merge into main champ
      console.log(`this.champ.rank_up_main:`,this.champ.rank_up_main);
      // set champions length
      for (var i = 0; i < this.champ.rank_up_main.rank; i++) {
        this.champions[i] = null;
      }
      this.resetUsedForFood();
  }

  resetUsedForFood() {
    this.champ.champions.forEach((c:any) => {
      delete c.used_for_food;
    })
  }

  onSelect(champion: any){

    let added = false;
    let count = 0;
    // find an empty spot and fill it
    this.champions.forEach((slot:any, i) => {
      if (slot == null) {
        if (!added) {
          count += 1;
          champion.used_for_food = true;
          this.champions[i] = champion;
          added = true;
        }
      } else {
        count += 1;
      }
    })

    console.log(`count:`,count);
    this.canMerge = count == this.champions.length;
    }

  onMerge() {
    console.log(`clicked merge`);
    // rank up the selected champion
    this.champ.rank_up_main.rank += 1;
    this.champ.rank_up_main.level = 1;
    this.champ.rank_up_main.max_level = this.champ.rank_up_main.max_level + 10;
    this.champ.rank_up_main.exp = 0;
    this.champ.rank_up_main.max_exp = 30;

    // remove the merge food
    let food_ids = this.champions.map(c => c.id);
    console.log(`food_ids:`,food_ids);

    food_ids.forEach(id => {
      let idx = this.champ.champions.findIndex((c: any) => c.id == id);
      console.log(`idx:`,idx);
      if (idx > -1) {
        this.champ.champions = [...this.champ.champions.slice(0,idx), ...this.champ.champions.slice(idx + 1)];
      }
    })

    // update champions
    this.champ.updateChampions();
    this.champ.updateTeam();

    // set rank_up_main to null
    this.champ.rank_up_main = null;
  }

  onCancel() {
      this.champ.rank_up_main = null;
  }

}
