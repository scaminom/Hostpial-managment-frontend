import { Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Patient } from '../../interfaces/patient.interface';
import { Column } from '@shared/interfaces/column-table.interface';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';

@Component({
  selector: 'app-patient-table',
  standalone: true,
  imports: [PrimeNGModule, RouterLink],
  templateUrl: './patient-table.component.html',
})
export class PatientTableComponent {
  patients = input<Patient[]>([]);
  patient = input<Patient | null>(null);
  cols = input<Column[]>([]);

  deletePatientEvent = output<Patient>();
  editPatientEvent = output<Patient>();

  selectedPatients = signal<Patient[]>([]);

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deletePatient(patient: Patient) {
    this.deletePatientEvent.emit(patient);
  }

  editPatient(patient: Patient) {
    this.editPatientEvent.emit(patient);
  }
}
