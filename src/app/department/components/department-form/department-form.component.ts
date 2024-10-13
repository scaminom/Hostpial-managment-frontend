import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ReactiveValidationModule } from 'angular-reactive-validation';

import {
  Department,
  DepartmentRegistrationParams,
  DepartmentUpdateRequestParams,
} from '../../interfaces/department.interface';

import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { DepartmentFacade } from '@app/department/helpers/department.facade';
import { TemplateFormComponent } from '@app/core/components/template-form.component';
import { DepartmentFormStrategy } from '@app/department/strategies/department-form.strategy';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveValidationModule, PrimeNGModule],
  templateUrl: './department-form.component.html',
})
export class DepartmentFormComponent extends TemplateFormComponent<
  Department,
  DepartmentRegistrationParams,
  DepartmentUpdateRequestParams
> {
  protected override entityFacade = inject(DepartmentFacade);
  protected override formStrategy = inject(DepartmentFormStrategy);

  floorItems = this.formStrategy.floorItems;
}
