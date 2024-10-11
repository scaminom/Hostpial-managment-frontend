import { Component, inject, signal } from '@angular/core';

import { ToastModule } from 'primeng/toast';

import { TableListComponent } from '@shared/components/table/table-list/table-list.component';
import { ToolbarComponent } from '@shared/components/table/toolbar/toolbar.component';
import { DialogComponent } from '@shared/components/table/dialog/dialog.component';
import { TableColumn } from '@app/shared/interfaces/column-table.interface';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import { Doctor } from '@app/doctor/interfaces/doctor.interface';
import { DoctorService } from '@app/doctor/services/doctor.service';
import { TableActionButton } from '@app/shared/interfaces/action-button.interface';
import { Router } from '@angular/router';
import { ToolbarButton } from '@app/shared/interfaces/tool-bar-button.interface';

@Component({
  selector: 'app-list-doctor-page',
  standalone: true,
  imports: [ToastModule, ToolbarComponent, TableListComponent, DialogComponent],
  templateUrl: './list-doctor-page.component.html',
})
export class ListDoctorPageComponent {
  deleteDoctorDialog = signal(false);
  cols: TableColumn[] = [];

  globalFilterFields: string[] = [
    'user.firstName',
    'user.lastName',
    'speciality',
    'licenseNumber',
    'department.name',
    'department.floor',
  ];

  toolbarButtons: ToolbarButton[] = [
    {
      label: 'New',
      icon: 'pi pi-plus',
      route: ['/doctor/new'],
      class: 'p-button-success mr-2',
    },
  ];

  doctor = signal<Doctor | null>(null);
  doctors = signal<Doctor[]>([]);

  doctorTableActions: TableActionButton[] = [];

  private messageWrapedService = inject(MessageWrapedService);
  private doctorService = inject(DoctorService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadDoctors();
    this.initializeColumns();
  }

  private loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (doctors) => this.doctors.set(doctors),
    });
  }

  private initializeColumns(): void {
    this.cols = [
      { field: 'licenseNumber', header: 'License Number' },
      { field: 'speciality', header: 'Doctor Speciality' },
      { field: 'user.firstName', header: 'First Name' },
      { field: 'user.lastName', header: 'Last Name' },
      { field: 'department.name', header: 'Department' },
      { field: 'department.floor', header: 'Floor' },
    ];

    this.doctorTableActions = [
      {
        icon: 'pi pi-pencil',
        class: 'p-button-rounded p-button-success mr-2',
        action: (doctor: Doctor) => this.editDoctor(doctor),
      },
      {
        icon: 'pi pi-trash',
        class: 'p-button-rounded p-button-danger mr-2',
        action: (doctor: Doctor) => this.deleteDoctor(doctor),
      },
    ];
  }

  deleteDoctor(doctor: Doctor): void {
    this.doctor.set(doctor);
    this.deleteDoctorDialog.set(true);
  }

  editDoctor(doctor: Doctor): void {
    this.router.navigate(['/doctor/edit', doctor.id]);
  }

  getDoctorFullName(): string {
    const doctor = this.doctor();
    return doctor ? doctor.fullName : '';
  }

  onConfirmDelete(): void {
    const doctorToDelete = this.doctor();
    if (doctorToDelete && doctorToDelete.id) {
      this.doctorService.deleteDoctor(doctorToDelete.id).subscribe({
        next: (success) => {
          if (success) {
            this.doctors.update((currentdoctors) =>
              currentdoctors.filter((p) => p.id !== doctorToDelete.id),
            );
            this.messageWrapedService.showSuccessMessage('doctor Deleted');
          }
        },
      });
    }
    this.deleteDoctorDialog.set(false);
    this.doctor.set(null);
  }
}
