import { Component, OnInit, inject, signal } from '@angular/core';

import { ToastModule } from 'primeng/toast';
import { PatientToolbarComponent } from '../patient-toolbar/patient-toolbar.component';
import {
  Column,
  PatientTableComponent,
} from '../patient-table/patient-table.component';
import { PatientDialogComponent } from '../patient-dialog/patient-dialog.component';
import { Patient } from '../../interfaces/patient.interface';
import { PatientService } from '../../services/patient.service';
import { MessageWrapedService } from '../../../shared/services/message-wraped.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    ToastModule,
    PatientToolbarComponent,
    PatientTableComponent,
    PatientDialogComponent,
  ],
  templateUrl: './patient-list.component.html',
})
export class PatientListComponent implements OnInit {
  deletePatientDialog = signal(false);
  deletePatientsDialog = signal(false);
  cols: Column[] = [];
  patient = signal<Patient | null>(null);
  patients = signal<Patient[]>([]);
  selectedPatients = signal<Patient[]>([]);

  private messageWrapedService = inject(MessageWrapedService);
  private patientService = inject(PatientService);

  ngOnInit(): void {
    this.loadpatients();
    this.initializeColumns();
  }

  private loadpatients(): void {
    this.patientService.getPatients().subscribe({
      next: (patients) => this.patients.set(patients),
      error: (error) =>
        this.messageWrapedService.handleError(error, 'Failed to load patients'),
    });
  }

  private initializeColumns(): void {
    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'insuranceNumber', header: 'Insurance Number' },
      { field: 'dateOfBirth', header: 'Date of Birth' },
      { field: 'gender', header: 'Gender' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'actions', header: 'Actions' },
    ];
  }

  deletePatient(patient: Patient): void {
    this.patient.set(patient);
    this.deletePatientDialog.set(true);
  }

  deleteSelectedPatients(): void {
    this.deletePatientsDialog.set(true);
  }

  editPatient(patient: Patient): void {
    // Implement edit functionality
    console.log('Editing patient:', patient);
  }

  onSelectedPatientsChange(patients: Patient[]): void {
    this.selectedPatients.set(patients);
  }

  onCancelDelete(): void {
    this.deletePatientDialog.set(false);
  }

  onConfirmDelete(): void {
    const patientToDelete = this.patient();
    if (patientToDelete && patientToDelete.id) {
      this.patientService.deletePatient(patientToDelete.id).subscribe({
        next: (success) => {
          if (success) {
            this.patients.update((currentPatients) =>
              currentPatients.filter((p) => p.id !== patientToDelete.id),
            );
            this.messageWrapedService.showSuccessMessage('Patient Deleted');
          } else {
            this.messageWrapedService.handleError(
              null,
              'Failed to delete patient',
            );
          }
        },
        error: (error) => {
          this.messageWrapedService.handleError(error, error.message);
        },
      });
    }
    this.deletePatientDialog.set(false);
    this.patient.set(null);
  }

  onCancelDeleteMultiple(): void {
    this.deletePatientsDialog.set(false);
  }

  onConfirmDeleteMultiple(): void {
    console.log(this.selectedPatients());
    this.deletePatientsDialog.set(false);
    this.patients.update((currentpatients) =>
      currentpatients.filter(
        (patient) => !this.selectedPatients().includes(patient),
      ),
    );
    this.messageWrapedService.showSuccessMessage('patients Deleted');
    this.selectedPatients.set([]);
  }
}
