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

  onMaxLevel(){
    this.champion.level = this.champion.max_level;
    this.champion.exp = 0;
    this.champ.updateChampions();
  }

}
