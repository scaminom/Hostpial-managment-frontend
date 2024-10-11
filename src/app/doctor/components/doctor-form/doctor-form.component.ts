import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveValidationModule } from 'angular-reactive-validation';

import {
  Doctor,
  DoctorRegistrationParams,
} from '@app/doctor/interfaces/doctor.interface';

import { TemplateFormComponent } from '@app/core/components/template-form.component';
import { DoctorFormStrategy } from '@app/doctor/strategies/doctor-form.strategy';
import { DepartmentFacade } from '@app/department/helpers/department.facade';
import { DoctorFacade } from '@app/doctor/helpers/doctor.facade';

import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveValidationModule, PrimeNGModule],
  templateUrl: './doctor-form.component.html',
})
export class DoctorFormComponent extends TemplateFormComponent<
  Doctor,
  DoctorRegistrationParams,
  DoctorRegistrationParams
> {
  protected override entityFacade = inject(DoctorFacade);
  protected override formStrategy = inject(DoctorFormStrategy);
  private departmentFacade = inject(DepartmentFacade);
  protected departmentItems = this.departmentFacade.departments;

  constructor() {
    super();
    this.loadDepartments();
  }

  private loadDepartments(): void {
    this.departmentFacade.loadDepartments();
  }
}
