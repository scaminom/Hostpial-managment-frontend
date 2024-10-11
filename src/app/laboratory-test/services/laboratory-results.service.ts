import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'angular-reactive-validation';
import { LaboratoryResults } from '../interfaces/laboratory-test.interface';

@Injectable({
  providedIn: 'root',
})
export class LaboratoryResultsService {
  private fb = inject(FormBuilder);

  createForm(): FormGroup {
    return this.fb.group({
      labType: ['', Validators.required('Test type is required')],
      name: ['', Validators.required('Name test is required')],
      visit: ['', Validators.required('Visit is required')],
      status: [''],
      results: [''],
    });
  }

  patchFormValues(form: FormGroup, laboratoryResults: LaboratoryResults): void {
    form.patchValue({
      ...laboratoryResults,
    });
  }

  prepareDepartmentData(form: FormGroup): LaboratoryResults {
    const formValue = form.value;
    return {
      ...formValue,
    };
  }
}
