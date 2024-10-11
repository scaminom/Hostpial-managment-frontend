import { Injectable, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DropdownItem } from '@shared/interfaces/drop-down-item.interface';
import { Validators } from 'angular-reactive-validation';
import { AgeValidator } from '../validators/age.validator';
import {
  Patient,
  PatientCreationParams,
} from '../interfaces/patient.interface';
import { FormStrategy } from '@app/core/strategies/form-strategy.interface';

@Injectable({
  providedIn: 'root',
})
export class PatientFormStrategy implements FormStrategy<Patient> {
  private fb = inject(FormBuilder);

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

  createForm(): FormGroup {
    return this.fb.group({
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
        [Validators.required('Date of birth is required'), AgeValidator(18)],
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
      birthPlace: [''],
    });
  }

  patchFormValues(form: FormGroup, patient: Patient): void {
    form.patchValue({
      ...patient,
      dateOfBirth: new Date(patient.dateOfBirth),
      gender: this.genderItems().find((item) => item.code === patient.gender),
      bloodType: this.bloodTypes().find(
        (item) => item.code === patient.bloodType,
      ),
    });
  }

  prepareEntityData(form: FormGroup): PatientCreationParams {
    const formValue = form.value;
    return {
      ...formValue,
      gender: formValue.gender.code,
      bloodType: formValue.bloodType.code,
    };
  }
}
