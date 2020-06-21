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

  onBattle() {
      console.log(`clicked battle`);
  }

  resetLocalStorage() {
    if (confirm("Are you sure you want to clear localstorage?")) {
      let items = ['champions','team','player'];
      items.forEach((i: string) => {
        delete localStorage[i];
      });
      window.location.reload();
    }
  }

}
