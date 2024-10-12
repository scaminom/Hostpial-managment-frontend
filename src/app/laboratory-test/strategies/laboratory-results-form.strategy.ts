import { Injectable, inject, signal } from '@angular/core';
import { FormStrategy } from '@app/core/strategies/form-strategy.interface';
import { LaboratoryResults } from '../interfaces/laboratory-test.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'angular-reactive-validation';
import { DropdownItem } from '@shared/interfaces/drop-down-item.interface';

@Injectable({
  providedIn: 'root',
})
export class LaboratoryResultsFormStrategy
  implements FormStrategy<LaboratoryResults>
{
  private fb = inject(FormBuilder);

  statusItems = signal<DropdownItem[]>([
    { name: 'Pending', code: 'pending' },
    { name: 'In Progress', code: 'in_progress' },
    { name: 'Completed', code: 'completed' },
    { name: 'Cancelled', code: 'cancelled' },
  ]);

  createForm(): FormGroup {
    return this.fb.group({
      labType: ['', Validators.required('Test type is required')],
      name: ['', Validators.required('Name test is required')],
      status: [null],
      results: [''],
    });
  }

  patchFormValues(form: FormGroup, laboratoryResults: LaboratoryResults): void {
    form.patchValue({
      ...laboratoryResults,
      status: this.statusItems().find(
        (status) => status.code === laboratoryResults.status,
      ),
    });
  }

  prepareEntityData(form: FormGroup) {
    const formValue = form.value;
    return {
      ...formValue,
      status: formValue.status?.code,
    };
  }
}
