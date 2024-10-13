import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '@app/patient/interfaces/patient.interface';
import { PatientDataService } from '@app/patient/services/patient-data.service';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { ToolbarComponent } from '@app/shared/components/table/toolbar/toolbar.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-patient-card',
  standalone: true,
  imports: [PrimeNGModule, ToolbarComponent],
  templateUrl: './patient-card.component.html',
})
export class PatientCardComponent {
  patient = input.required<Patient>();
  private router = inject(Router);
  private patientDataService = inject(PatientDataService);

  visitSelectionItems: MenuItem[] = [
    {
      label: 'Create regular visit',
      icon: 'pi pi-calendar',
      styleClass: 'text-blue-500 font-semibold',
      command: () => {
        this.navigateToNewVisitForm(this.patient().id, false);
      },
    },
    {
      label: 'Create emergency visit',
      icon: 'pi pi-exclamation-triangle',
      styleClass: 'text-red-500 font-semibold',
      command: () => {
        this.navigateToNewVisitForm(this.patient().id, true);
      },
    },
  ];

  fullName = computed(() => {
    const patientValue = this.patient();
    return patientValue
      ? `${patientValue.lastName} ${patientValue.firstName}`
      : '';
  });

  navigateToNewVisitForm(patientId: number, isEmergency: boolean): void {
    this.patientDataService.setCurrentPatient(this.patient());
    this.router.navigate(['/patient', patientId, 'visit', 'new'], {
      queryParams: { isEmergency: isEmergency },
    });
  }
}
