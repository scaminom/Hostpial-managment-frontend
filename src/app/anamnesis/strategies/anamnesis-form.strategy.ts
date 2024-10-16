import { Injectable, inject, signal } from '@angular/core';
import { FormStrategy } from '@app/core/strategies/form-strategy.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'angular-reactive-validation';
import { Anamnesis } from '../interfaces/anamnese.interface';

import { DropdownItem } from '@shared/interfaces/drop-down-item.interface';

@Injectable({
  providedIn: 'root',
})
export class AnamnesisFormStrategy implements FormStrategy<Anamnesis> {
  private fb = inject(FormBuilder);

  maritalStatusItems = signal<DropdownItem[]>([
    { name: 'Single', code: 'Single' },
    { name: 'Married', code: 'Married' },
    { name: 'Divorced', code: 'Divorced' },
    { name: 'Widowed', code: 'Widowed' },
  ]);

  createForm(): FormGroup {
    return this.fb.group({
      currentResidence: [
        '',
        Validators.required('Current residence is required'),
      ],
      educationLevel: ['', Validators.required('Education level is required')],
      occupation: ['', Validators.required('Occupation is required')],
      maritalStatus: ['', Validators.required('Marital status is required')],
      religion: ['', Validators.required('Religion is required')],
      handedness: ['', Validators.required('Handedness is required')],
      familyReference: [
        '',
        Validators.required('Family reference is required'),
      ],
      genderIdentity: [''],
      medicalHistory: [''],
    });
  }

  patchFormValues(form: FormGroup, prescription: Anamnesis): void {
    form.patchValue({
      ...prescription,
    });
  }

  prepareEntityData(form: FormGroup) {
    const formValue = form.value;
    return {
      ...formValue,
      maritalStatus: formValue.maritalStatus.code,
    };
  }
}
