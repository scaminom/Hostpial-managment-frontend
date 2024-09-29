import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface DropdownItem {
  name: string;
  code: string;
}

import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../interfaces/patient.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    AutoCompleteModule,
    CommonModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  templateUrl: './patient-form.component.html',
})
export class PatientFormComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private patientService = inject(PatientService);
  private router = inject(Router);

  private patientId = signal<number | null>(null);
  patientForm = signal<FormGroup>(this.initForm());
  isEditMode = signal<boolean>(false);

  dropdownItems = signal<DropdownItem[]>([
    { name: 'Male', code: 'M' },
    { name: 'Female', code: 'F' },
  ]);

  ngOnInit(): void {
    this.isEditMode.set(this.router.url.includes('edit'));

    if (this.isEditMode()) {
      this.activeRoute.params.subscribe((params) => {
        const patientId = params['id'];
        this.patientId.set(patientId);
        this.retrievePatient(patientId);
      });
    }
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      insuranceNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bloodType: ['', Validators.required],
      allergies: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.patientForm().valid) {
      const patientData: Patient = {
        ...this.patientForm().value,
        gender: this.patientForm().get('gender')?.value?.code,
      };

      if (this.isEditMode()) {
        const id = this.patientId();
        if (id !== null) {
          this.updatePatient(id, patientData);
        } else {
          console.error('Cannot update patient: ID is null');
        }
      } else {
        this.createPatient(patientData);
      }
    }
  }

  private createPatient(patientData: Patient): void {
    this.patientService.createPatient({ patient: patientData }).subscribe({
      next: (response) => {
        console.log('Patient created:', response);
        this.router.navigate(['/patient']);
      },
      error: (error) => console.error('Error creating patient:', error),
    });
  }

  private updatePatient(id: number, patientData: Patient): void {
    this.patientService.updatePatient(id, { patient: patientData }).subscribe({
      next: (response) => {
        console.log('Patient updated:', response);
        this.router.navigate(['/patient']);
      },
      error: (error) => console.error('Error updating patient:', error),
    });
  }

  private retrievePatient(id: number): void {
    this.patientService.getPatientById(id).subscribe({
      next: (patient) => {
        this.patchFormValues(patient);
      },
      error: (error) => {
        console.error('Error retrieving patient:', error);
        this.router.navigate(['/dashboard/patients']);
      },
    });
  }

  private patchFormValues(patient: Patient): void {
    this.patientForm().patchValue({
      ...patient,
      dateOfBirth: new Date(patient.dateOfBirth),
      gender: this.dropdownItems().find((item) => item.code === patient.gender),
    });
  }
}
