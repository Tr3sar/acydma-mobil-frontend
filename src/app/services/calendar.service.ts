// calendar.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Calendar } from '../models/Calendar';
import { Observable, of } from 'rxjs';
import { CacheService } from './cache.service'; // Asegúrate de la ruta correcta
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = environment.apiBaseUrl + 'calendar';
  private cacheKey = 'calendarCache';

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  getCalendar(): Observable<Calendar[]> {
    return new Observable<Calendar[]>((observer) => {
      this.cacheService.shouldUpdateData(this.cacheKey).then(shouldUpdate => {
        if (shouldUpdate) {
          this.getNewDataFromServer().subscribe(calendar => {
            this.cacheService.setCache(this.cacheKey, {
              data: calendar,
              lastUpdated: new Date().toISOString()
            });
            observer.next(calendar);
            observer.complete();
          }, error => {
            observer.error(error);
          });
        } else {
          this.cacheService.getCache(this.cacheKey).then(cachedCalendar => {
            const calendar = cachedCalendar?.data || [];
            observer.next(calendar);
            observer.complete();
          }).catch(err => {
            observer.error(err);
          });
        }
      }).catch(err => {
        observer.error(err);
      });
    });
  }

  private getNewDataFromServer(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(this.apiUrl);
  }
}
