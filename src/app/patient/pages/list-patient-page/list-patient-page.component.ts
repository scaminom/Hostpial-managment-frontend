import { Component, inject, signal } from '@angular/core';
import { Patient } from '@app/patient/interfaces/patient.interface';
import { PatientService } from '@app/patient/services/patient.service';
import { DialogComponent } from '@app/shared/components/table/dialog/dialog.component';
import { TableListComponent } from '@app/shared/components/table/table-list/table-list.component';
import { ToolbarComponent } from '@app/shared/components/table/toolbar/toolbar.component';
import { Column } from '@app/shared/interfaces/column-table.interface';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-list-patient-page',
  standalone: true,
  imports: [ToastModule, ToolbarComponent, TableListComponent, DialogComponent],
  templateUrl: './list-patient-page.component.html',
  styles: ``,
})
export class ListPatientPageComponent {
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

  editPatient(patient: Patient): void {
    console.log('Editing patient:', patient);
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
            this.patients.update((currentpatients) =>
              currentpatients.filter((p) => p.id !== patientToDelete.id),
            );
            this.messageWrapedService.showSuccessMessage('patient Deleted');
          } else {
            this.messageWrapedService.handleError(
              null,
              'Failed to delete patient',
            );
          }
        },
      });
    }
    this.deletePatientDialog.set(false);
    this.patient.set(null);
  }
}
