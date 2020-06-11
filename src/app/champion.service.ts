import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

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

  merge_champions: any[] = [];

  teamFull: boolean = false;

  constructor() {
      this.getChampions();
      this.getTeam();
  }


    getChampions() {
        if (window.localStorage.champions == undefined) {
            this.updateChampions();
        }
        this.champions = JSON.parse(window.localStorage.champions);
    }

    updateChampions() {
        window.localStorage.champions = JSON.stringify(this.champions);
    }

    getTeam() {
        if (window.localStorage.team == undefined) {
            this.updateTeam();
        } else {
            this.team = JSON.parse(window.localStorage.team);
        }
    }

    updateTeam() {
        console.log(`updating team:`,this.team);
        window.localStorage.team = JSON.stringify(this.team);
    }

  onBattle() {
      this.team.forEach((c:any) => {
          if (c.champion) {
              this.gainExp(c.champion,1);
          }
      })
      this.updateChampions();
  }

  selectChampion(champion) {
      // add to team
      if (this.rank_up_main == null) {
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
          this.updateTeam();
      }
      // add to merge food
      else {

      }
  }

  teamIncludesChamp(champion){
      let included = false;
      this.team.forEach((c: any) => {
          if (included) return;
          if (c.champion && c.champion.id == champion.id) {
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

  checkTeamEmpty() {
      let empty = true;
      this.team.forEach((c: any) => {
          if (empty){
              if (c.champion != null) empty = false;
          }
      });
      return empty;
  }

  createChampion(name) {
      let newChampion = {
          name: name,
          rank: 1,
          id: UUID.UUID(),
          exp: 0,
          max_exp: 25
      }
      return newChampion;
  }

  buyChampion() {
      let name = `champ ${this.champions.length + 1}`;
      this.champions.push(this.createChampion(name));
      this.updateChampions();
  }

  gainExp(champion, exp) {
      let champ = this.champions.find(c => c.id == champion.id);
      if (champ.exp < champ.max_exp) {
          if (exp < champ.max_exp - champ.exp) {
              champ.exp += exp;
          } else {
              champ.exp = champ.max_exp;
          }
      }
  }

  onClickRankUp(champion) {
      this.rank_up_main = champion;
  }
}
