import { Component, OnInit, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ReactiveValidationModule } from 'angular-reactive-validation';

import { DropdownItem } from '@shared/interfaces/drop-down-item.interface';

import { DepartmentCreationParams } from '../../interfaces/department.interface';

import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { DepartmentFacade } from '@app/department/helpers/department.facade';
import { DepartmentFormService } from '@app/department/services/department-form.service';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveValidationModule, PrimeNGModule],
  templateUrl: './department-form.component.html',
})
export class DepartmentFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private departmentFacade = inject(DepartmentFacade);
  private departmentFormService = inject(DepartmentFormService);

  departmentForm!: FormGroup;
  isEditMode = false;
  departmentId: number | null = null;

  floorItems = this.departmentFormService.floorItems;

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  private initForm(): void {
    this.departmentForm = this.departmentFormService.createForm();
  }

  private checkEditMode(): void {
    this.isEditMode = this.router.url.includes('edit');
    if (this.isEditMode) {
      this.route.params.subscribe((params) => {
        this.departmentId = +params['id'];
        this.retrieveDepartment(this.departmentId);
      });
    }
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      const departmentData: DepartmentCreationParams =
        this.departmentFormService.prepareDepartmentData(this.departmentForm);
      this.isEditMode
        ? this.updateDepartment(departmentData)
        : this.createDepartment(departmentData);
    }
  }

  private createDepartment(departmentData: DepartmentCreationParams): void {
    this.departmentFacade.createDepartment(departmentData);
  }

  private updateDepartment(departmentData: DepartmentCreationParams): void {
    if (this.departmentId) {
      this.departmentFacade.updateDepartment(this.departmentId, departmentData);
    }
  }

  private retrieveDepartment(id: number): void {
    this.departmentFacade.getDepartment(id).subscribe({
      next: (doctor) =>
        this.departmentFormService.patchFormValues(this.departmentForm, doctor),
      error: () => this.router.navigate(['/department']),
    });
  }
}
