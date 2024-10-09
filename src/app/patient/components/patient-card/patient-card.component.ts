import { Component, computed, input } from '@angular/core';
import { Patient } from '@app/patient/interfaces/patient.interface';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { ToolbarComponent } from '@app/shared/components/table/toolbar/toolbar.component';

@Component({
  selector: 'app-patient-card',
  standalone: true,
  imports: [PrimeNGModule, ToolbarComponent],
  templateUrl: './patient-card.component.html',
  styles: ``,
})
export class PatientCardComponent {
  patient = input.required<Patient>();

  fullName = computed(() => {
    const patientValue = this.patient();
    return patientValue
      ? `${patientValue.lastName} ${patientValue.firstName}`
      : '';
  });
}
