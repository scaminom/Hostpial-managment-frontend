import { Component, inject, signal } from '@angular/core';

import { ToastModule } from 'primeng/toast';

import { TableListComponent } from '@shared/components/table/table-list/table-list.component';
import { ToolbarComponent } from '@shared/components/table/toolbar/toolbar.component';
import { DialogComponent } from '@shared/components/table/dialog/dialog.component';
import { Column } from '@app/shared/interfaces/column-table.interface';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import { Doctor } from '@app/doctor/interfaces/doctor.interface';
import { DoctorService } from '@app/doctor/services/doctor.service';

@Component({
  selector: 'app-list-doctor-page',
  standalone: true,
  imports: [ToastModule, ToolbarComponent, TableListComponent, DialogComponent],
  templateUrl: './list-doctor-page.component.html',
  styles: ``,
})
export class ListDoctorPageComponent {
  deleteDoctorDialog = signal(false);
  cols: Column[] = [];
  globalFilterFields: string[] = [
    'user.firstName',
    'user.lastName',
    'speciality',
    'licenseNumber',
    'department.name',
    'department.floor',
  ];
  doctor = signal<Doctor | null>(null);
  doctors = signal<Doctor[]>([]);

  private messageWrapedService = inject(MessageWrapedService);
  private doctorService = inject(DoctorService);

  ngOnInit(): void {
    this.loadDoctors();
    this.initializeColumns();
  }

  private loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (doctors) => this.doctors.set(doctors),
      error: (error) =>
        this.messageWrapedService.handleError(error, 'Failed to load doctors'),
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
  }

  deleteDoctor(doctor: Doctor): void {
    this.doctor.set(doctor);
    this.deleteDoctorDialog.set(true);
  }

  editDoctor(doctor: Doctor): void {
    console.log('Editing doctor:', doctor);
  }

  getDoctorFullName(): string {
    const doctor = this.doctor();
    return doctor ? `${doctor.user.firstName} ${doctor.user.lastName}` : '';
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
          } else {
            this.messageWrapedService.handleError(
              null,
              'Failed to delete doctor',
            );
          }
        },
        error: (error) => {
          this.messageWrapedService.handleError(error, error.message);
        },
      });
    }
    this.deleteDoctorDialog.set(false);
    this.doctor.set(null);
  }
}
