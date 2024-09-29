import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
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
import { ToastModule } from 'primeng/toast';
import { MessageWrapedService } from '../../../shared/services/message-wraped.service';

import {
  ReactiveValidationModule,
  ValidatorDeclaration,
  Validators,
} from 'angular-reactive-validation';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    AutoCompleteModule,
    CalendarModule,
    CommonModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ToastModule,
    ReactiveValidationModule,
  ],
  templateUrl: './patient-form.component.html',
})
export class PatientFormComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private messageWrapedService = inject(MessageWrapedService);
  private patientService = inject(PatientService);
  private router = inject(Router);

  patientForm = signal<FormGroup>(this.initForm());
  private isEditMode = signal<boolean>(false);
  private patientId = signal<number | null>(null);

  genderItems = signal<DropdownItem[]>([
    { name: 'Male', code: 'M' },
    { name: 'Female', code: 'F' },
  ]);

  bloodTypes = signal<DropdownItem[]>([
    { name: 'O negative', code: 'O-' },
    { name: 'O positive', code: 'O+' },
    { name: 'A negative', code: 'A-' },
    { name: 'A positive', code: 'A+' },
    { name: 'B negative', code: 'B-' },
    { name: 'B positive', code: 'B+' },
    { name: 'AB negative', code: 'AB-' },
    { name: 'AB positive', code: 'AB+' },
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
      firstName: ['', Validators.required('First name is required')],
      lastName: ['', Validators.required('Last name is required')],
      insuranceNumber: [
        '',
        [
          Validators.required('Insurance number is required'),
          Validators.pattern(/^\d{3}-[A-Z]{3}$/, 'Invalid insurance number'),
        ],
      ],
      dateOfBirth: [
        '',
        [
          Validators.required('Date of birth is required'),
          this.ageValidator(18),
        ],
      ],
      gender: ['', Validators.required('Gender is required')],
      address: ['', Validators.required('Address is required')],
      phoneNumber: [
        '',
        [
          Validators.required('Phone number is required'),
          Validators.pattern(/^\d{10}$/, 'Invalid phone number'),
        ],
      ],
      email: [
        '',
        [
          Validators.required('Email is required'),
          Validators.email('Invalid email'),
        ],
      ],
      bloodType: ['', Validators.required('Blood type is required')],
      allergies: ['', Validators.required('Allergies are required')],
    });
  }

  onSubmit(): void {
    if (this.patientForm().valid) {
      const patientData: Patient = {
        ...this.patientForm().value,
        gender: this.patientForm().get('gender')?.value?.code,
        bloodType: this.patientForm().get('bloodType')?.value?.code,
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
      next: () => {
        this.router.navigate(['/patient']);
        this.messageWrapedService.showSuccessMessage(
          'Patient created successfully',
        );
      },
      error: (error) => {
        this.messageWrapedService.handleError(error, error.message);
      },
    });
  }

  private updatePatient(id: number, patientData: Patient): void {
    this.patientService.updatePatient(id, { patient: patientData }).subscribe({
      next: () => {
        this.router.navigate(['/patient']);
        this.messageWrapedService.showSuccessMessage(
          'Patient updated successfully',
        );
      },
      error: (error) => {
        this.messageWrapedService.handleError(error, error.message);
      },
    });
  }

  private retrievePatient(id: number): void {
    this.patientService.getPatientById(id).subscribe({
      next: (patient) => {
        this.patchFormValues(patient);
      },
      error: (error) => {
        this.messageWrapedService.handleError(error, error.message);
        this.router.navigate(['/patient']);
      },
    });
  }

  private patchFormValues(patient: Patient): void {
    this.patientForm().patchValue({
      ...patient,
      dateOfBirth: new Date(patient.dateOfBirth),
      gender: this.genderItems().find((item) => item.code === patient.gender),
      bloodType: this.bloodTypes().find(
        (item) => item.code === patient.bloodType,
      ),
    });
  }

  private ageValidator(minAge: number) {
    return ValidatorDeclaration.wrapSingleArgumentValidator(
      (minAge: number) => {
        return (control: AbstractControl): ValidationErrors | null => {
          if (!control.value) {
            return null;
          }
          const birthDate = new Date(control.value);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          return age >= minAge ? null : { underage: true };
        };
      },
      'underage',
    )(minAge);
  }
}
