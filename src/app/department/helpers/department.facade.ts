import { Injectable, computed, inject, signal } from '@angular/core';
import { DepartmentService } from '@app/department/services/department.service';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import { DropdownItem } from '@shared/interfaces/drop-down-item.interface';
import {
  Department,
  DepartmentCreationParams,
} from '../interfaces/department.interface';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DepartmentFacade {
  private departmentService = inject(DepartmentService);
  private messageService = inject(MessageWrapedService);
  private router = inject(Router);

  private departmentSignal = signal<Department | null>(null);
  department = computed(() => this.departmentSignal());
  departments = signal<DropdownItem[]>([]);

  getDepartment(id: number): Observable<Department> {
    return this.departmentService
      .getDepartmentById(id)
      .pipe(tap((department) => this.departmentSignal.set(department)));
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: (departments) => {
        const departmentItems = departments.map((dept) => ({
          name: dept.name,
          code: dept.id,
        }));
        this.departments.set(departmentItems);
      },
      error: (error) =>
        this.messageService.handleError('Error loading departments', error),
    });
  }

  createDepartment(departmentData: DepartmentCreationParams): void {
    this.departmentService
      .createDepartment({ department: departmentData })
      .subscribe({
        next: (department) => {
          this.departmentSignal.set(department);
          this.messageService.showSuccessMessage(
            'Department created successfully',
          );
          this.router.navigate(['/department']);
        },
      });
  }

  updateDepartment(id: number, departmentData: DepartmentCreationParams): void {
    this.departmentService
      .updateDepartment(id, { department: departmentData })
      .subscribe({
        next: (department) => {
          this.departmentSignal.set(department);
          this.messageService.showSuccessMessage(
            'Department updated successfully',
          );
          this.router.navigate(['/department']);
        },
      });
  }
}
