import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { Visit } from '@app/visit/interfaces/visit.interface';

type Severity = 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'app-visit-card',
  standalone: true,
  imports: [PrimeNGModule],
  templateUrl: './visit-card.component.html',
})
export class VisitCardComponent {
  visit = input.required<Visit>();
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onView(): void {
    this.router.navigate(['..', 'visit', this.visit().id], {
      relativeTo: this.route,
    });
  }

  getPrioritySeverity(priority: string): Severity {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'info';
    }
  }
}
