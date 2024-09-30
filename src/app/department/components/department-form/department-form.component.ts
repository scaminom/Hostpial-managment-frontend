import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageWrapedService } from '@shared/services/message-wraped.service';

import { DepartmentService } from '../../services/department.service';
import {
  ReactiveValidationModule,
  Validators,
} from 'angular-reactive-validation';
import { Department } from '../../interfaces/department.interface';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';

interface DropdownItem {
  name: string;
  code: string | number;
}

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [
    AutoCompleteModule,
    CalendarModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ReactiveValidationModule,
    ToastModule,
  ],
  templateUrl: './department-form.component.html',
})
export class DepartmentFormComponent {
  private activeRoute = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private messageWrapedService = inject(MessageWrapedService);
  private departmentService = inject(DepartmentService);
  private router = inject(Router);

  departmentForm = signal<FormGroup>(this.initForm());
  private isEditMode = signal<boolean>(false);
  private departmentId = signal<number | null>(null);

  floorItems = signal<DropdownItem[]>([
    { name: 'Primer piso', code: 1 },
    { name: 'Segundo piso', code: 2 },
    { name: 'Tercer piso', code: 3 },
    { name: 'Cuarto piso', code: 4 },
  ]);

  ngOnInit(): void {
    this.isEditMode.set(this.router.url.includes('edit'));

    if (this.isEditMode()) {
      this.activeRoute.params.subscribe((params) => {
        const departmentId = params['id'];
        this.departmentId.set(departmentId);
        this.retrievedepartment(departmentId);
      });
    }
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required('First name is required')],
      floor: ['', Validators.required('Last name is required')],
    });
  }

  onSubmit(): void {
    if (this.departmentForm().valid) {
      const departmentData: Department = {
        ...this.departmentForm().value,
        floor: this.departmentForm().get('floor')?.value.code,
      };

      if (this.isEditMode()) {
        const id = this.departmentId();
        if (id !== null) {
          this.updatedepartment(id, departmentData);
        } else {
          console.error('Cannot update department: ID is null');
        }
      } else {
        this.createdepartment(departmentData);
      }
    }
  }

  private createdepartment(departmentData: Department): void {
    this.departmentService
      .createDepartment({ department: departmentData })
      .subscribe({
        next: () => {
          this.router.navigate(['/department']);
          this.messageWrapedService.showSuccessMessage(
            'department created successfully',
          );
        },
        error: (error) => {
          this.messageWrapedService.handleError(error, error.message);
        },
      });
  }

  private updatedepartment(id: number, departmentData: Department): void {
    this.departmentService
      .updateDepartment(id, { department: departmentData })
      .subscribe({
        next: () => {
          this.router.navigate(['/department']);
          this.messageWrapedService.showSuccessMessage(
            'department updated successfully',
          );
        },
        error: (error) => {
          this.messageWrapedService.handleError(error, error.message);
        },
      });
  }

  private retrievedepartment(id: number): void {
    this.departmentService.getDepartmentById(id).subscribe({
      next: (department) => {
        this.patchFormValues(department);
      },
      error: (error) => {
        this.messageWrapedService.handleError(error, error.message);
        this.router.navigate(['/department']);
      },
    });
  }

  private patchFormValues(department: Department): void {
    this.departmentForm().patchValue({
      ...department,
      floor: this.floorItems().find((item) => item.code === department.floor),
    });
  }
}
