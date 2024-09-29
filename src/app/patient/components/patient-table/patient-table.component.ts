import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { Patient } from '../../interfaces/patient.interface';

export interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-patient-table',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    DialogModule,
    InputTextModule,
    RippleModule,
    RouterLink,
    TableModule,
    ToastModule,
    ToolbarModule,
  ],
  templateUrl: './patient-table.component.html',
  providers: [MessageService],
})
export class PatientTableComponent {
  patients = input<Patient[]>([]);
  patient = input<Patient | null>(null);
  cols = input<Column[]>([]);

  deletePatientEvent = output<Patient>();
  editPatientEvent = output<Patient>();
  selectedPatientsChange = output<Patient[]>();

  selectedPatients = signal<Patient[]>([]);

  test = computed(() =>
    this.selectedPatientsChange.emit(this.selectedPatients()),
  );

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
