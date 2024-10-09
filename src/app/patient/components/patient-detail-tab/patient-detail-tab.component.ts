import { Component, input } from '@angular/core';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { VisitCardComponent } from '@app/visit/components/visit-card/visit-card.component';
import { Visit } from '@app/visit/interfaces/visit.interface';

@Component({
  selector: 'app-patient-detail-tab',
  standalone: true,
  imports: [PrimeNGModule, VisitCardComponent],
  templateUrl: './patient-detail-tab.component.html',
  styles: ``,
})
export class PatientDetailTabComponent {
  visits = input.required<Visit[]>();

  hasVisits(): boolean {
    return this.visits().length > 0;
  }
}
