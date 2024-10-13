import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';

@Component({
  selector: 'app-visit-selection',
  standalone: true,
  imports: [PrimeNGModule],
  templateUrl: './visit-selection.component.html',
  styles: [
    `
      :host ::ng-deep .p-card {
        margin-top: 2rem;
      }
    `,
  ],
})
export class VisitSelectionComponent {
  private router = inject(Router);

  createVisit(type: 'regular' | 'emergency') {
    this.router.navigate(['/visits/new'], { queryParams: { type } });
  }
}
