import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { PlayerService } from './player.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  championSub: Subject<any> = new Subject();
  championChange = this.championSub.asObservable();

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
  teamEmpty: boolean = true;

  constructor(public player: PlayerService) {
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

        // get team from champions array
        console.log(`this.champions:`,this.champions);
        this.champions.forEach((c:any) => {
          // look for team_position
          if (c.team_position != null) {
            this.team[c.team_position].champion = c;
          }
        });

        console.log(`this.team:`,this.team);

        // if (window.localStorage.team == undefined) {
        //     this.updateTeam();
        // } else {
        //     this.team = JSON.parse(window.localStorage.team);
        // }
        let count = 0;
        this.team.forEach((t:any) => {
          if (t.champion != null) {
            count += 1;
          }
        })
        // is team full?
        console.log(`team count:`,count);
        this.teamFull = count == 4 ? true : false;
        this.teamEmpty = count == 0 ? true : false;
        // is team empty?
        console.log(`teamEmpty:`,this.teamEmpty);
    }

    updateTeam() {
        console.log(`updating team:`,this.team);
        window.localStorage.team = JSON.stringify(this.team);
    }

    onBattle2(level: any) {
      console.log(`onBattle2 with level:`,level);
      let team_pwr = this.getTeamPower();
      console.log(`team_pwr:`,team_pwr);
      // TODO:
      // check if power of team is high enough
      // if it is, allow them to battle
      // then split exp between heroes

      let msg = '';
      let win = true;
      if (team_pwr == level.power) {
        // 50/50 chance of winning
        if (Math.random() < .5) {
          win = false;
        }
      } else if (team_pwr < level.power) {
        // lose
        win = false;
      }

      let team_count = this.team.filter((c:any) => c.champion != null);
      let exp = level.exp;
      let exp_per_champ = Math.floor(exp/team_count.length);

      if (!win) {
        exp_per_champ = Math.floor(exp_per_champ/2);
      }

      msg = `You ${win ? 'won' : 'lost'} the battle. Each character gained ${exp_per_champ} exp.`;

      this.team.forEach((c:any) => {
        if (c.champion) {
          this.gainExp(c.champion,exp_per_champ);
        }
      })
      this.updateChampions();

      // give silver to player
      this.player.player.silver += 5;


      this.championSub.next({
        action: 'battle-log',
        log: msg
      })
    }

    getTeamPower() {
      console.log(`this.team:`,this.team);
      let team_pwr = 0;
      this.team.forEach((team_member:any) => {
        // console.log(`team_member:`,team_member);
          // calculate player power
          // level = 1 power
          // times by rank
          if (team_member.champion != null) {
            let player_pwr = team_member.champion.level * team_member.champion.rank;
            // console.log(`player_pwr:`,player_pwr);
            team_pwr += player_pwr;
          }
      });
      return team_pwr;
    }

  onBattle() {

      // give each champion exp
      // find number of champions in team
      let team_count = this.team.filter((c:any) => c.champion != null);
      let exp = 4;
      let exp_per_champ = Math.floor(exp/team_count.length);
      this.team.forEach((c:any) => {
          if (c.champion) {
              this.gainExp(c.champion,exp_per_champ);
          }
      })

      // give silver to player
      this.player.player.silver += 5;

      this.updateChampions();
  }

  selectChampion(champion) {

      // add to team
      if (this.rank_up_main == null) {
          if (!this.teamFull){
              let done = false;
              this.team.forEach((c: any, i) => {
                  if (done) return;
                  if (c.champion != null) return;
                  c.champion = champion;
                  champion.team_position = i;
                  done = true;
              })
              this.teamEmpty = false;
          }
          this.checkTeamFull();
          this.updateTeam();
          this.updateChampions();
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
      this.teamEmpty = empty;
  }

  createChampion(name) {
      let newChampion = {
          name: name,
          rank: 1,
          id: UUID.UUID(),
          exp: 0,
          max_exp: 25,
          max_level: 10,
          level: 1,
          team_position: null
      }
      return newChampion;
  }

  levelUpChampion(champion) {
    champion.exp = 0;
    champion.level += 1;
    champion.max_exp = Math.floor(champion.max_exp * 1.25);
  }

  buyChampion() {
      let name = `champ ${this.champions.length + 1}`;
      this.champions.push(this.createChampion(name));
      this.updateChampions();
  }

  gainExp(champion, exp) {

      // find champion
      let champ = this.champions.find(c => c.id == champion.id);
      // check if they are not at max xp
      if (champ.exp < champ.max_exp) {

          // if no overflow overflow
          if (exp < champ.max_exp - champ.exp) {
              champ.exp += exp;
          }
          // set to max exp
          else {
              champ.exp = champ.max_exp;
              // check if max level
              if (champ.level < champ.max_level) {
                this.levelUpChampion(champ);
              }
          }
      }
  }

  onClickRankUp(champion) {
      this.rank_up_main = champion;
  }
}
