import { Component, OnInit, inject, signal } from '@angular/core';

import { ToastModule } from 'primeng/toast';

import { Patient } from '../../interfaces/patient.interface';
import { PatientService } from '../../services/patient.service';

import { Column } from '@shared/interfaces/column-table.interface';
import { DialogComponent } from '@shared/components/table/dialog/dialog.component';
import { MessageWrapedService } from '@shared/services/message-wraped.service';
import { TableListComponent } from '@shared/components/table/table-list/table-list.component';
import { ToolbarComponent } from '@shared/components/table/toolbar/toolbar.component';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [ToastModule, ToolbarComponent, TableListComponent, DialogComponent],
  templateUrl: './patient-list.component.html',
})
export class PatientListComponent implements OnInit {
  deletePatientDialog = signal(false);
  cols: Column[] = [];
  globalFilterFields: string[] = [
    'firstName',
    'lastName',
    'insuranceNumber',
    'dateOfBirth',
    'gender',
    'phoneNumber',
  ];
  patient = signal<Patient | null>(null);
  patients = signal<Patient[]>([]);

  private messageWrapedService = inject(MessageWrapedService);
  private patientService = inject(PatientService);

  ngOnInit(): void {
    this.loadPatients();
    this.initializeColumns();
  }

  private loadPatients(): void {
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
      {
        field: 'dateOfBirth',
        header: 'Date of Birth',
        pipe: { name: 'date', args: ['MM/dd/yyyy'] },
      },
      { field: 'gender', header: 'Gender' },
      { field: 'phoneNumber', header: 'Phone Number' },
    ];
  }

  deletePatient(patient: Patient): void {
    this.patient.set(patient);
    this.deletePatientDialog.set(true);
  }

  getPatientFullName(): string {
    const patient = this.patient();
    return patient ? `${patient.firstName} ${patient.lastName}` : '';
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
}
