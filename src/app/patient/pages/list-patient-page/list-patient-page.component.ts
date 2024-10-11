import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PatientFacade } from '@app/patient/helpers/patient.facade';
import { Patient } from '@app/patient/interfaces/patient.interface';
import { DialogComponent } from '@app/shared/components/table/dialog/dialog.component';
import { TableListComponent } from '@app/shared/components/table/table-list/table-list.component';
import { ToolbarComponent } from '@app/shared/components/table/toolbar/toolbar.component';
import { TableActionButton } from '@app/shared/interfaces/action-button.interface';
import { TableColumn } from '@app/shared/interfaces/column-table.interface';
import { ToolbarButton } from '@app/shared/interfaces/tool-bar-button.interface';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-list-patient-page',
  standalone: true,
  imports: [ToastModule, ToolbarComponent, TableListComponent, DialogComponent],
  templateUrl: './list-patient-page.component.html',
})
export class ListPatientPageComponent implements OnInit {
  private patientFacade = inject(PatientFacade);
  private router = inject(Router);

  deletePatientDialog = signal(false);
  cols: TableColumn[] = [];
  globalFilterFields: string[] = [
    'firstName',
    'lastName',
    'insuranceNumber',
    'dateOfBirth',
    'gender',
    'phoneNumber',
  ];
  toolbarButtons: ToolbarButton[] = [
    {
      label: 'New',
      icon: 'pi pi-plus',
      route: ['/patient/new'],
      class: 'p-button-success mr-2',
    },
  ];
  patient = signal<Patient | null>(null);
  patients = signal<Patient[]>([]);
  patientTableActions: TableActionButton[] = [];

  ngOnInit(): void {
    this.loadPatients();
    this.initializeTableColumns();
    this.initializeButtons();
  }

  private loadPatients(): void {
    this.patientFacade
      .getAllEntities()
      .subscribe((patients) => this.patients.set(patients));
  }

  private initializeTableColumns(): void {
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

  private initializeButtons(): void {
    this.patientTableActions = [
      {
        icon: 'pi pi-pencil',
        class: 'p-button-rounded p-button-success mr-2',
        action: (patient: Patient) => this.editPatient(patient),
      },
      {
        icon: 'pi pi-eye',
        class: 'p-button-rounded p-button-primary',
        action: (patient: Patient) => this.viewPatient(patient),
      },
    ];
  }

  viewPatient(patient: Patient): void {
    this.router.navigate(['/patient/', patient.id]);
  }

  deletePatient(patient: Patient): void {
    this.patient.set(patient);
    this.deletePatientDialog.set(true);
  }

  editPatient(patient: Patient): void {
    this.router.navigate(['/patient/edit', patient.id]);
  }

  getPatientFullName(): string {
    const patient = this.patient();
    return patient ? `${patient.firstName} ${patient.lastName}` : '';
  }

  onConfirmDelete(): void {
    const patientToDelete = this.patient();
    if (patientToDelete && patientToDelete.id) {
      this.patientFacade.deleteEntity(patientToDelete.id);
    }
    this.deletePatientDialog.set(false);
    this.patient.set(null);
  }
}
