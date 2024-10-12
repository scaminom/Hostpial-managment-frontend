import { Injectable, inject } from '@angular/core';
import { FormStrategy } from '@app/core/strategies/form-strategy.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'angular-reactive-validation';
import { Prescription } from '../interfaces/prescription.interface';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionFormStrategy implements FormStrategy<Prescription> {
  private fb = inject(FormBuilder);

  createForm(): FormGroup {
    return this.fb.group({
      medication: ['', Validators.required('Medication is required')],
      dosage: ['', Validators.required('Dosage is required')],
      duration: ['', Validators.required('Duration is required')],
    });
  }

  patchFormValues(form: FormGroup, prescription: Prescription): void {
    form.patchValue({
      ...prescription,
    });
  }

  prepareEntityData(form: FormGroup) {
    const formValue = form.value;
    return {
      ...formValue,
    };
  }
}
