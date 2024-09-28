import { Component, OnInit, inject, signal } from '@angular/core';
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
import { PatientService } from '../../services/patient.service';

interface Cols {
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
export class PatientTableComponent implements OnInit {
  deletePatientDialog = signal(false);
  deletePatientsDialog = signal(false);

  cols: Cols[] = [];
  patient = signal<Patient | null>(null);
  patients = signal<Patient[]>([]);
  selectedPatients = signal<Patient[]>([]);

  private messageService = inject(MessageService);
  private patientService = inject(PatientService);

  ngOnInit(): void {
    this.loadPatients();

    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'insuranceNumber', header: 'Insurance Number' },
      { field: 'dateOfBirth', header: 'Date of Birth' },
      { field: 'gender', header: 'Gender' },
      { field: 'phoneNumber', header: 'Phone Number' },
    ];
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        console.log('Patients fetched', patients);
        this.patients.set(patients);
      },
      error: (error) => {
        console.error('Error fetching patients', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load patients',
          life: 3000,
        });
      },
    });
  }

  deletePatient(patient: Patient) {
    this.deletePatientDialog.set(true);
    this.patient.set(patient);
  }

  deleteSelectedPatients() {
    this.deletePatientsDialog.set(true);
  }

  confirmDeleteSelected() {
    this.deletePatientsDialog.set(false);
    this.patients.update((currentPatients) =>
      currentPatients.filter(
        (patient) => !this.selectedPatients().includes(patient),
      ),
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Patients Deleted',
      life: 3000,
    });
    this.selectedPatients.set([]);
  }

  confirmDelete() {
    this.deletePatientDialog.set(false);
    this.patients.update((currentPatients) =>
      currentPatients.filter((patient) => patient !== this.patient()),
    );

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Patient Deleted',
      life: 3000,
    });
    this.patient.set(null);
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
