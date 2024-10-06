import { Component } from '@angular/core';
import { CalendarService } from '../services/calendar.service';
import { Calendar, Partit } from '../models/Calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})
export class CalendarPage {
  calendar: Calendar[] = [];
  jornada: string = 'totes';
  teamName: string = '';

  constructor(private calendarService: CalendarService) {
    this.calendarService.getCalendar().subscribe(data => {
      this.calendar = data;
    });
  }

  get filteredCalendar() {
    if (!this.teamName) {
      if (this.jornada === 'totes') {
        return this.calendar;
      } else {
        return [this.calendar[parseInt(this.jornada)]];
      }
    } else {
      return this.calendar.map(jornada => ({
        day: jornada.day,
        partits: jornada.partits.filter(partit => 
          partit.team1 === this.teamName || partit.team2 === this.teamName
        )
      })).filter(jornada => jornada.partits.length > 0);
    }
  }

  get teams() : string[] {
    if (this.calendar.length === 0) { return []; }

    let allTeams = this.calendar[0].partits.reduce((teams: string[], partit: Partit) => {
      teams.push(partit.team1, partit.team2);
      return teams;
    }, []);

    allTeams.sort((a, b) => a.localeCompare(b));

    return allTeams;
  }

  onChangeJornada() {
    console.log(this.jornada);
  }
}
