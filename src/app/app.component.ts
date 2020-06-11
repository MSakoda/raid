import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'raid';

  champions: any = [
    {
      name: 'champ 1',
      exp: 0
    },
    {
      name: 'champ 2',
      exp: 0
    },
  ];

  onClickChampion(champion) {
    console.log(`clicked champion`);
    champion.exp += 1;
  }

  buyChampion() {
    let newChamp = {
      name: `champ ${this.champions.length + 1}`,
      exp: 0
    }

    this.champions.push(newChamp);
  }

}
