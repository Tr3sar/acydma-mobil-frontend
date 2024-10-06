import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Result } from '../models/Result';
import { Observable} from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private apiUrl = environment.apiBaseUrl + 'results';
  private cacheKey = 'resultsCache';

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  getResults(): Observable<Result[]> {
    return new Observable<Result[]>((observer) => {
      this.cacheService.shouldUpdateData(this.cacheKey).then(shouldUpdate => {
        if (shouldUpdate) {
          this.getNewDataFromServer().subscribe(results => {
            this.cacheService.setCache(this.cacheKey, {
              data: results,
              lastUpdated: new Date().toISOString()
            });
            observer.next(results);
            observer.complete();
          }, error => {
            observer.error(error);
          });
        } else {
          this.cacheService.getCache(this.cacheKey).then(cachedResults => {
            const results = cachedResults?.data || [];
            observer.next(results); 
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

  private getNewDataFromServer(): Observable<Result[]> {
    return this.http.get<Result[]>(this.apiUrl);
  }
}
