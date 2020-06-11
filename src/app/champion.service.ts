import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  champions: any = [];
  rank_up_main: any;
  rank_up_food: any;

  team: any[] = [
      {
        champion: null
    },
      {
        champion: null
    },
      {
        champion: null
    },
      {
        champion: null
    },
  ];

  teamFull: boolean = false;

  constructor() {
      this.buyChampion();
  }

  selectChampion(champion) {
      if (!this.teamFull){
          let done = false;
          this.team.forEach((c: any) => {
              if (done) return;
              if (c.champion != null) return;
              c.champion = champion;
              done = true;
          })
      }
      this.checkTeamFull();
  }

  teamIncludesChamp(champion){
      let included = false;
      this.team.forEach((c: any) => {
          if (included) return;
          if (c.champion == champion) {
              included = true;
              return;
          }
      });
      return included;
  }

  checkTeamFull() {
      let full = true;
      this.team.forEach((c:any) => {
          if (c.champion == null) full = false;
      })
      this.teamFull = full;
  }

  createChampion(name) {
      let newChampion = {
          name: name,
          rank: 1,
          exp: 0,
          max_exp: 25
      }
      return newChampion;
  }

  buyChampion() {
      let name = `champ ${this.champions.length + 1}`;
      this.champions.push(this.createChampion(name));
  }
}
