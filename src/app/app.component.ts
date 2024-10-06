import { Component } from '@angular/core';
import { CacheService } from './services/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private cacheService: CacheService) {}
}
