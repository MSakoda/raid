import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChampionComponent } from './champion/champion.component';
import { RankUpComponent } from './rank-up/rank-up.component';
import { TeamComponent } from './team/team.component';
import { ChampionsComponent } from './champions/champions.component';
import { ShopComponent } from './shop/shop.component';
import { BattleComponent } from './battle/battle.component';
import { BattleLogComponent } from './battle-log/battle-log.component';

@NgModule({
  declarations: [
    AppComponent,
    ChampionComponent,
    RankUpComponent,
    TeamComponent,
    ChampionsComponent,
    ShopComponent,
    BattleComponent,
    BattleLogComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
