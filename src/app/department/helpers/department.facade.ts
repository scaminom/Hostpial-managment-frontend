import { Injectable, computed, inject, signal } from '@angular/core';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import { DropdownItem } from '@shared/interfaces/drop-down-item.interface';
import {
  Department,
  DepartmentCreationParams,
} from '../interfaces/department.interface';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IFacade } from '@app/core/interfaces/facade.interface';
import { DepartmentService } from '../services/department.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentFacade
  implements
    IFacade<
      Department,
      DepartmentCreationParams,
      Partial<DepartmentCreationParams>
    >
{
  private departmentService = inject(DepartmentService);
  private messageService = inject(MessageWrapedService);
  private router = inject(Router);
  private departmentSignal = signal<Department | null>(null);
  department = computed(() => this.departmentSignal());
  departments = signal<DropdownItem[]>([]);

  getEntity(id: number): Observable<Department> {
    return this.departmentService.getById(id).pipe(
      tap((department) => {
        this.departmentSignal.set(department);
      }),
    );
  }

  getAllEntities(): Observable<Department[]> {
    return this.departmentService.getAll().pipe(
      tap((departments) => {
        const departmentItems = departments.map((dept) => ({
          name: dept.name,
          code: dept.id,
        }));
        this.departments.set(departmentItems);
      }),
    );
  }

  createEntity(departmentData: DepartmentCreationParams): void {
    this.departmentService.create({ department: departmentData }).subscribe({
      next: () => {
        this.messageService.showSuccessMessage(
          'Department created successfully',
        );
        this.router.navigate(['/department']);
      },
    });
  }

  updateEntity(id: number, departmentData: DepartmentCreationParams): void {
    this.departmentService
      .update(id, { department: departmentData })
      .subscribe({
        next: () => {
          this.messageService.showSuccessMessage(
            'Department updated successfully',
          );
          this.router.navigate(['/department']);
        },
      });
  }

  deleteEntity(id: number): void {
    this.departmentService.delete(id).subscribe({
      next: () => {
        this.messageService.showSuccessMessage(
          'Department deleted successfully',
        );
      },
    });
  }
}
