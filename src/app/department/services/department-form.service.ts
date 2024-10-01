import { Injectable, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'angular-reactive-validation';
import { DepartmentCreationParams } from '../interfaces/department.interface';
import { DropdownItem } from '@shared/interfaces/drop-down-item.interface';

@Injectable({
  providedIn: 'root',
})
export class DepartmentFormService {
  private fb = inject(FormBuilder);

  floorItems = signal<DropdownItem[]>([
    { name: 'Primer piso', code: 1 },
    { name: 'Segundo piso', code: 2 },
    { name: 'Tercer piso', code: 3 },
    { name: 'Cuarto piso', code: 4 },
  ]);

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required('Name is required')],
      floor: ['', Validators.required('Floor name is required')],
    });
  }

  patchFormValues(form: FormGroup, department: DepartmentCreationParams): void {
    form.patchValue({
      ...department,
      floor: this.floorItems().find((item) => item.code === department.floor),
    });
  }

  prepareDepartmentData(form: FormGroup): DepartmentCreationParams {
    const formValue = form.value;
    return {
      ...formValue,
      floor: formValue.floor.code,
    };
  }
}
