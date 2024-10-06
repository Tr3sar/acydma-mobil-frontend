import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Player } from '../models/Player';
import { CacheService } from './cache.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private cacheKey = 'statsCache';
  private apiUrl = environment.apiBaseUrl + 'stats';

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getStats(): Observable<Player[]> {
    return new Observable<Player[]>((observer) => {
      this.cacheService.shouldUpdateData(this.cacheKey).then(shouldUpdate => {
        if (shouldUpdate) {
          this.getNewStatsFromServer().subscribe(stats => {
            this.cacheService.setCache(this.cacheKey, {
              data: stats,
              lastUpdated: new Date().toISOString()
            });
            observer.next(stats);
            observer.complete();
          }, error => {
            observer.error(error);
          });
        } else {
          this.cacheService.getCache(this.cacheKey).then(cachedStats => {
            const stats = cachedStats?.data || [];
            observer.next(stats); 
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

  private getNewStatsFromServer(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl);
  }
}
