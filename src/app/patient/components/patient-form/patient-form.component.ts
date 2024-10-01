import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ReactiveValidationModule } from 'angular-reactive-validation';

import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { PatientFacade } from '@app/patient/helpers/patient.facade';
import { PatientFormService } from '@app/patient/services/patient-form.service';
import { PatientCreationParams } from '@app/patient/interfaces/patient.interface';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveValidationModule, PrimeNGModule],
  templateUrl: './patient-form.component.html',
})
export class PatientFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private patientFacade = inject(PatientFacade);
  private patientFormService = inject(PatientFormService);

  patientForm!: FormGroup;
  isEditMode = false;
  patientId: number | null = null;

  genderItems = this.patientFormService.genderItems;
  bloodTypeItems = this.patientFormService.bloodTypes;

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  private initForm(): void {
    this.patientForm = this.patientFormService.createForm();
  }

  private checkEditMode(): void {
    this.isEditMode = this.router.url.includes('edit');
    if (this.isEditMode) {
      this.route.params.subscribe((params) => {
        this.patientId = +params['id'];
        this.retrievePatient(this.patientId);
      });
    }
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const patientData: PatientCreationParams =
        this.patientFormService.preparePatientData(this.patientForm);
      this.isEditMode
        ? this.updatePatient(patientData)
        : this.createPatient(patientData);
    }
  }

  private createPatient(patientData: PatientCreationParams): void {
    this.patientFacade.createPatient(patientData);
  }

  private updatePatient(patientData: PatientCreationParams): void {
    if (this.patientId) {
      this.patientFacade.updatePatient(this.patientId, patientData);
    }
  }

  private retrievePatient(id: number): void {
    this.patientFacade.getPatient(id).subscribe({
      next: (doctor) =>
        this.patientFormService.patchFormValues(this.patientForm, doctor),
      error: () => this.router.navigate(['/patient']),
    });
  }
}
