import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-wrapper">
      <header class="dash-header">
        <h2>Enterprise Dashboard</h2>
        <button class="logout-btn" (click)="authService.logout()">Logout</button>
      </header>

      <div class="metrics-container">
        <div class="metric-card">
          <h4>Total Projects</h4>
          <p>{{ totalProjects() }}</p>
        </div>
        <div class="metric-card">
          <h4>Cumulative Budget</h4>
          <p>\${{ totalBudget() }}</p>
        </div>
      </div>

      <div class="table-section">
        <h3>Active Project Details</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Budget</th>
            </tr>
          </thead>
          <tbody>
            @for (item of dataService.items(); track item.id) {
              <tr>
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.category }}</td>
                <td><span [class]="'badge ' + item.status.toLowerCase()">{{ item.status }}</span></td>
                <td>\${{ item.budget }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-wrapper { max-width: 1000px; margin: 40px auto; padding: 20px; font-family: sans-serif; }
    .dash-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 15px; }
    .logout-btn { background: #ef4444; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
    .metrics-container { display: flex; gap: 20px; margin: 25px 0; }
    .metric-card { flex: 1; background: #f3f4f6; padding: 20px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .metric-card h4 { margin: 0; color: #4b5563; font-size: 14px; }
    .metric-card p { font-size: 24px; font-weight: bold; margin: 10px 0 0 0; color: #1f2937; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
    th { background: #f9fafb; font-weight: 600; }
    .badge { padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; }
    .badge.active { background: #dcfce7; color: #166534; }
    .badge.pending { background: #fef9c3; color: #854d0e; }
    .badge.completed { background: #e0f2fe; color: #0369a1; }
  `]
})
export class Dashboard {
  dataService = inject(DataService);
  authService = inject(AuthService);

  // Reactive Computed Signals
  totalProjects = computed(() => this.dataService.items().length);
  totalBudget = computed(() => this.dataService.items().reduce((acc, curr) => acc + curr.budget, 0));
}