import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChampionService } from '../champion.service';

@Component({
  selector: 'battle-log',
  templateUrl: './battle-log.component.html',
  styleUrls: ['./battle-log.component.css']
})
export class BattleLogComponent implements OnInit {

  logs: any[] = [];
  sub;

  constructor(public champ: ChampionService) { }

  ngOnInit() {
    this.sub = this.champ.championChange.subscribe((res:any) => {
      if (res.action == 'battle-log') {
        this.logs.push(res.log);
        document.querySelector(".logs").scrollTop = document.querySelector(".logs").scrollHeight;
      }
    });
  }

  ngOnDestroy() {
    if (this.sub != undefined) {
      this.sub.unsubscribe();
    }
  }

}
