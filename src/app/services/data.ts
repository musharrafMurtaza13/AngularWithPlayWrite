import { Injectable, signal } from '@angular/core';

export interface DashboardItem {
  id: number;
  title: string;
  category: string;
  status: 'Active' | 'Pending' | 'Completed';
  budget: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _items = signal<DashboardItem[]>([
    { id: 1, title: 'Microservices Architecture Migration', category: 'Backend', status: 'Active', budget: 5000 },
    { id: 2, title: 'Angular Signals & Standalone Upgradation', category: 'Frontend', status: 'Pending', budget: 3200 },
    { id: 3, title: 'PostgreSQL Index & Query Tuning', category: 'Database', status: 'Completed', budget: 1500 },
    { id: 4, title: 'Docker & CI/CD Pipeline Setup', category: 'DevOps', status: 'Active', budget: 4100 }
  ]);

  public items = this._items.asReadonly();

  addItem(newItem: DashboardItem) {
    this._items.update(currentItems => [...currentItems, newItem]);
  }
}