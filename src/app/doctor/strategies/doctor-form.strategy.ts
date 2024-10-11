import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormStrategy } from '../../core/strategies/form-strategy.interface';
import { Doctor, DoctorCreationParams } from '../interfaces/doctor.interface';
import { Validators } from 'angular-reactive-validation';

@Injectable({
  providedIn: 'root',
})
export class DoctorFormStrategy implements FormStrategy<Doctor> {
  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup {
    return this.fb.group({
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
      password: [
        '',
        [
          Validators.required('Password is required'),
          Validators.minLength(6, 'Password must be at least 6 characters'),
        ],
      ],
      speciality: ['', Validators.required('Speciality is required')],
      licenseNumber: [
        '',
        [
          Validators.required('License number is required'),
          Validators.pattern(/^[A-Z]{2}\d{6}$/, 'Invalid license number'),
        ],
      ],
      department: ['', Validators.required('Department is required')],
    });
  }

  patchFormValues(form: FormGroup, doctor: Doctor): void {
    form.patchValue({
      firstName: doctor?.user?.firstName,
      lastName: doctor?.user?.lastName,
      email: doctor?.user?.email,
      username: doctor?.user?.username,
      speciality: doctor.speciality,
      licenseNumber: doctor.licenseNumber,
      department: {
        name: doctor.department?.name,
        code: doctor.department?.id,
      },
    });
  }

  prepareEntityData(form: FormGroup): DoctorCreationParams {
    const formValue = form.value;
    return {
      speciality: formValue.speciality,
      licenseNumber: formValue.licenseNumber,
      departmentId: formValue.department.code,
      userAttributes: {
        username: formValue.username,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        password: formValue.password,
      },
    };
  }
}
