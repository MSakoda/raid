import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player: any = {
    level: 1,
    silver: 100,
  };

  constructor() { }

  getPlayer() {
    if (window.localStorage.player == undefined) {
      this.updatePlayer();
    } else {
      this.player = JSON.parse(window.localStorage.player);
    }
  }

  updatePlayer() {
    console.log(`updating player:`,this.player);
    window.localStorage.player = JSON.stringify(this.player);
  }
}
