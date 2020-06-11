import { Component } from '@angular/core';
import { ChampionService } from './champion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'raid';

  constructor(public champ: ChampionService) {

  }

  onClickChampion(champion) {
    console.log(`clicked champion`);
    champion.exp += 1;
  }

  buyChampion() {
    this.champ.buyChampion();
  }

}
