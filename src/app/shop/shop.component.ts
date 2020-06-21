import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../champion.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  shop_items: any[] = [
    {
      name: 'Champion',
      price: 20,
      id: 1
    },
    {
      name: 'Shard',
      price: 200,
      id: 2
    }
  ]

  constructor(public champ: ChampionService, public player: PlayerService) { }

  ngOnInit() {
    console.log(`player service:`,this.player);
  }

  buyChampion() {
    this.champ.buyChampion();
  }

  buyItem(item) {
    // check if you have enough silver
    if (this.player.player.silver >= item.price) {
      // subtract silver
      this.player.player.silver -= item.price;
      this.player.updatePlayer();

      // item logic
      if (item.name == 'Champion') {
        this.champ.buyChampion();
      } else if (item.name == 'Shard') {
        console.log(`buying shard placeholder`);
      }
    } else {
      alert('You do not have enough silver.  Battle to earn more silver.');
    }
  }

}
