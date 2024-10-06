// classification.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Classification } from '../models/Classification';
import { Observable } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {
  private apiUrl = environment.apiBaseUrl + 'classification';
  private cacheKey = 'classificationCache';

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  getClassification(): Observable<Classification[]> {
    return new Observable<Classification[]>((observer) => {
      this.cacheService.shouldUpdateData(this.cacheKey).then(shouldUpdate => {
        if (shouldUpdate) {
          this.getNewDataFromServer().subscribe(classification => {
            this.cacheService.setCache(this.cacheKey, {
              data: classification,
              lastUpdated: new Date().toISOString()
            });
            observer.next(classification);
            observer.complete();
          }, error => {
            observer.error(error);
          });
        } else {
          this.cacheService.getCache(this.cacheKey).then(cachedClassification => {
            const classification = cachedClassification?.data || [];
            observer.next(classification);
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

  private getNewDataFromServer(): Observable<Classification[]> {
    return this.http.get<Classification[]>(this.apiUrl);
  }
}
