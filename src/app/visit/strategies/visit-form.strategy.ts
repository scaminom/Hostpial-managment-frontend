import { Injectable, inject, signal } from '@angular/core';
import { FormStrategy } from '@app/core/strategies/form-strategy.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Visit } from '../interfaces/visit.interface';
import { DropdownItem } from '@shared/interfaces/drop-down-item.interface';
import { Doctor } from '@app/doctor/interfaces/doctor.interface';
import { DoctorFacade } from '@app/doctor/helpers/doctor.facade';
import { Validators } from 'angular-reactive-validation';

@Injectable({
  providedIn: 'root',
})
export class VisitFormStrategy implements FormStrategy<Visit> {
  private fb = inject(FormBuilder);
  private doctorFacade = inject(DoctorFacade);

  visitType = signal<DropdownItem[]>([
    { name: 'Routine Checkup', code: 0 },
    { name: 'Follow Up', code: 1 },
    { name: 'Emergency', code: 2 },
    { name: 'Specialist Consultation', code: 3 },
  ]);

  priorityLevel = signal<DropdownItem[]>([
    { name: 'Low', code: 0 },
    { name: 'Medium', code: 1 },
    { name: 'High', code: 2 },
    { name: 'Urgent', code: 3 },
  ]);

  doctors = signal<Doctor[]>([]);

  createForm(isEmergency: boolean = false): FormGroup {
    const form = this.fb.group({
      visitType: [
        { value: 0, disabled: isEmergency },
        Validators.required('Visit type is required'),
      ],
      priorityLevel: [
        { value: isEmergency ? 3 : 1, disabled: isEmergency },
        Validators.required('Priority level is required'),
      ],
      doctorId: ['', Validators.required('Doctor is required')],
      room: [''],
    });

    if (isEmergency) {
      form.get('visitType')?.setValue(2);
      form.get('priorityLevel')?.setValue(3);
    }

    return form;
  }

  patchFormValues(form: FormGroup, visit: Visit): void {
    form.patchValue({
      ...visit,
      visitType: visit.visitType,
      priorityLevel: visit.priorityLevel,
    });
  }

  prepareEntityData(form: FormGroup): Visit {
    const formValue = form.getRawValue();
    return {
      ...formValue,
      visitType: formValue.visitType,
      priorityLevel: formValue.priorityLevel,
    };
  }

  populateDoctors(): void {
    this.doctorFacade.getAllEntities().subscribe((doctors) => {
      this.doctors.set(doctors);
    });
  }
}
