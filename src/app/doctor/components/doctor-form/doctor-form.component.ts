import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DepartmentService } from '@app/department/services/department.service';
import { MessageWrapedService } from '@shared/services/message-wraped.service';

import {
  Doctor,
  DoctorCreationParams,
} from '@app/doctor/interfaces/doctor.interface';
import { DoctorService } from '@app/doctor/services/doctor.service';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';

import { DropdownItem } from '@shared/interfaces/drop-down-item.interface';
import {
  ReactiveValidationModule,
  Validators,
} from 'angular-reactive-validation';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [
    AutoCompleteModule,
    CalendarModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ToastModule,
    ReactiveValidationModule,
  ],
  templateUrl: './doctor-form.component.html',
  styles: ``,
})
export class DoctorFormComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private messageWrapedService = inject(MessageWrapedService);
  private doctorService = inject(DoctorService);
  private departmentService = inject(DepartmentService);
  private router = inject(Router);

  doctorForm = signal<FormGroup>(this.initForm());
  isEditMode = signal<boolean>(false);
  doctorId = signal<number | null>(null);

  departmentItems = signal<DropdownItem[]>([]);

  ngOnInit(): void {
    this.loadDepartments();
    this.isEditMode.set(this.router.url.includes('edit'));

    if (this.isEditMode()) {
      this.activeRoute.params.subscribe((params) => {
        const doctorId = +params['id'];
        this.doctorId.set(doctorId);
        this.retrieveDoctor(doctorId);
      });
    }
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      // User fields
      firstName: ['', Validators.required('First name is required')],
      lastName: ['', Validators.required('Last name is required')],
      email: [
        '',
        [
          Validators.required('Email is required'),
          Validators.email('Invalid email'),
        ],
      ],
      username: ['', Validators.required('Username is required')],
      password: ['', Validators.required('Password is required')],
      // Doctor fields
      speciality: ['', Validators.required('Speciality is required')],
      licenseNumber: [
        '',
        [
          Validators.required('License number is required'),
          Validators.pattern(/^\d{3}-[A-Z]{3}$/, 'Invalid license number'),
        ],
      ],
      department: ['', Validators.required('Department is required')],
    });
  }

  onSubmit(): void {
    if (this.doctorForm().valid) {
      const doctorData: DoctorCreationParams = this.prepareDoctorData();

      if (this.isEditMode()) {
        const id = this.doctorId();
        if (id !== null) {
          this.updateDoctor(id, doctorData);
        } else {
          console.error('Cannot update doctor: ID is null');
        }
      } else {
        this.createDoctor(doctorData);
      }
    }
  }

  private prepareDoctorData(): DoctorCreationParams {
    const formValue = this.doctorForm().value;
    return {
      speciality: formValue.speciality,
      licenseNumber: formValue.licenseNumber,
      departmentId: this.doctorForm().get('department')?.value.code,
      userAttributes: {
        username: formValue.username,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        password: formValue.password,
      },
    };
  }

  private createDoctor(doctorData: DoctorCreationParams): void {
    this.doctorService.createDoctor({ doctor: doctorData }).subscribe({
      next: () => {
        this.router.navigate(['/doctor']);
        this.messageWrapedService.showSuccessMessage(
          'Doctor created successfully',
        );
      },
      error: (error) => {
        this.messageWrapedService.handleError(error, 'Error creating doctor');
      },
    });
  }

  private updateDoctor(id: number, doctorData: DoctorCreationParams): void {
    this.doctorService.updateDoctor(id, { doctor: doctorData }).subscribe({
      next: () => {
        this.router.navigate(['/doctor']);
        this.messageWrapedService.showSuccessMessage(
          'Doctor updated successfully',
        );
      },
      error: (error) => {
        this.messageWrapedService.handleError(error, 'Error updating doctor');
      },
    });
  }

  private retrieveDoctor(id: number): void {
    this.doctorService.getDoctorById(id).subscribe({
      next: (doctor) => {
        this.patchFormValues(doctor);
      },
      error: (error) => {
        this.messageWrapedService.handleError(error, 'Error fetching doctor');
        this.router.navigate(['/doctor']);
      },
    });
  }

  private patchFormValues(doctor: Doctor): void {
    this.doctorForm().patchValue({
      firstName: doctor.user.firstName,
      lastName: doctor.user.lastName,
      email: doctor.user.email,
      username: doctor.user.username,
      speciality: doctor.speciality,
      licenseNumber: doctor.licenseNumber,
      department: this.departmentItems().find(
        (item) => item.code === doctor.department.id,
      ),
    });
  }

  private loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (departments) => {
        this.departmentItems.set(
          departments.map((dept) => ({
            name: dept.name,
            code: dept.id,
          })),
        );
      },
      error: (error) => {
        this.messageWrapedService.handleError(
          error,
          'Error loading departments',
        );
      },
    });
  }
}
