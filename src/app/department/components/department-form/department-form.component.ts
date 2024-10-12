import { Component, OnInit, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ReactiveValidationModule } from 'angular-reactive-validation';

import {
  Department,
  DepartmentCreationParams,
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
  DepartmentCreationParams,
  Partial<DepartmentCreationParams>
> {
  protected override entityFacade = inject(DepartmentFacade);
  protected override formStrategy = inject(DepartmentFormStrategy);

  floorItems = this.formStrategy.floorItems;
}
