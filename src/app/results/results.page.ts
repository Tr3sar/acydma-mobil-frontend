import { AfterContentChecked, Component } from '@angular/core';
import { ResultsService } from '../services/results.service';
import { Result } from '../models/Result';

@Component({
  selector: 'app-results',
  templateUrl: 'results.page.html',
  styleUrls: ['results.page.scss']
})
export class ResultsPage {

  results: Result[] = [];
  groupedResults: Result[][] = [];

  jornada!: number;
  teamName: string = '';

  constructor(private resultsService: ResultsService) {
    this.resultsService.getResults().subscribe((results) => {
      this.results = results;

      results.forEach(result => {
        let group = this.groupedResults.find(g => g[0]?.day === result.day);
        
        if (!group) {
          group = [];
          this.groupedResults.push(group);
        }
        
        group.push(result);
      });
      
      this.jornada = this.jornades.length-1;
    });
  }

  get jornades() : string[] {
    return Object.keys(this.groupedResults);
  }

  get teams() : string[] {
    if (this.groupedResults.length === 0) { return []; }

    let allTeams = this.groupedResults[0].reduce((teams: string[], result: Result) => {
      teams.push(result.localTeam, result.visitantTeam);
      return teams;
    }, []);

    allTeams.sort((a, b) => a.localeCompare(b));

    return allTeams;
  }

  get filteredResults() : Result[] {
    if (!this.teamName) {
      return this.groupedResults[this.jornada];
    } else {
      return this.groupedResults.flat().filter((result: Result) => 
        result.localTeam === this.teamName || result.visitantTeam === this.teamName
      );
    }
  }

  

}
