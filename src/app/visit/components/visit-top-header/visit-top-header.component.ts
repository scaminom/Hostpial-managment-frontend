import { Component, input } from '@angular/core';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { Visit } from '@app/visit/interfaces/visit.interface';

type Severity = 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'app-visit-top-header',
  standalone: true,
  imports: [PrimeNGModule],
  templateUrl: './visit-top-header.component.html',
  styles: [
    `
      :host ::ng-deep .p-tabview-panels {
        padding: 1rem;
      }
    `,
  ],
})
export class VisitTopHeaderComponent {
  visit = input.required<Visit>();

  getStatusTest(priority: string): Severity {
    switch (priority) {
      case 'pending' || 'cancelled':
        return 'danger';
      case 'in_progress':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'info';
    }
  }
}
