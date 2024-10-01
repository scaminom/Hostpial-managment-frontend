import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ReactiveValidationModule } from 'angular-reactive-validation';

import { DoctorFacade } from '@app/doctor/facades/doctor.facade';
import { DepartmentFacade } from '@app/doctor/facades/department.facade';

import { DoctorFormService } from '@app/doctor/services/doctor-form.service';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { DoctorCreationParams } from '@app/doctor/interfaces/doctor.interface';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveValidationModule, PrimeNGModule],
  templateUrl: './doctor-form.component.html',
  styles: ``,
})
export class DoctorFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private doctorFacade = inject(DoctorFacade);
  private departmentFacade = inject(DepartmentFacade);
  private doctorFormService = inject(DoctorFormService);

  doctorForm!: FormGroup;
  isEditMode = false;
  doctorId: number | null = null;

  departmentItems = this.departmentFacade.departments;

  ngOnInit(): void {
    this.initForm();
    this.loadDepartments();
    this.checkEditMode();
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      const doctorData: DoctorCreationParams =
        this.doctorFormService.prepareDoctorData(this.doctorForm);
      this.isEditMode
        ? this.updateDoctor(doctorData)
        : this.createDoctor(doctorData);
    }
  }

  private initForm(): void {
    this.doctorForm = this.doctorFormService.createForm();
  }

  private checkEditMode(): void {
    this.isEditMode = this.router.url.includes('edit');
    if (this.isEditMode) {
      this.route.params.subscribe((params) => {
        this.doctorId = +params['id'];
        this.retrieveDoctor(this.doctorId);
      });
    }
  }

  private retrieveDoctor(id: number): void {
    this.doctorFacade.getDoctor(id).subscribe({
      next: (doctor) =>
        this.doctorFormService.patchFormValues(this.doctorForm, doctor),
      error: () => this.router.navigate(['/doctor']),
    });
  }

  private createDoctor(doctorData: DoctorCreationParams): void {
    this.doctorFacade.createDoctor(doctorData);
  }

  private updateDoctor(doctorData: DoctorCreationParams): void {
    if (this.doctorId) {
      this.doctorFacade.updateDoctor(this.doctorId, doctorData);
    }
  }

  private loadDepartments(): void {
    this.departmentFacade.loadDepartments();
  }
}
