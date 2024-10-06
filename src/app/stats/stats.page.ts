import { Component } from '@angular/core';
import { Player } from '../models/Player';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss']
})
export class StatsPage {

  playerStats: Player[] = [];

  constructor(private statsService: StatsService) {
    this.statsService.getStats().subscribe(stats => {
      this.playerStats = stats;
    });
  }

}
