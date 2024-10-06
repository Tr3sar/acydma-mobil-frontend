// cache.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private storage: Storage | null = null;

  constructor(private storageService: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.storageService.create();
  }

  async setCache(key: string, data: any): Promise<void> {
    await this.storage?.set(key, JSON.stringify(data));
    await this.storage?.set(`${key}_lastFetch`, new Date().toISOString());
  }

  async getCache(key: string): Promise<any | null> {
    const data = await this.storage?.get(key);
    return data ? JSON.parse(data) : null;
  }

  async getLastFetchDate(key: string): Promise<Date | null> {
    const dateStr = await this.storage?.get(`${key}_lastFetch`);
    return dateStr ? new Date(dateStr) : null;
  }

  async shouldUpdateData(key: string): Promise<boolean> {
    const lastFetchDate = await this.getLastFetchDate(key);
    const now = new Date();
    const lastMonday = this.getLastMonday(now);

    return !lastFetchDate || lastFetchDate < lastMonday;
  }

  private getLastMonday(date: Date): Date {
    const dayOfWeek = date.getDay();
    const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // Ajustar para el lunes
    const lastMonday = new Date(date);
    lastMonday.setDate(date.getDate() + diff);
    lastMonday.setHours(15, 0, 0, 0); // Ajustar a las 15:00
    return lastMonday;
  }
}
