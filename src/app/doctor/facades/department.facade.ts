import { Injectable, inject, signal } from '@angular/core';
import { DepartmentService } from '@app/department/services/department.service';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import { DropdownItem } from '@shared/interfaces/drop-down-item.interface';

@Injectable({
  providedIn: 'root',
})
export class DepartmentFacade {
  private departmentService = inject(DepartmentService);
  private messageService = inject(MessageWrapedService);

  departments = signal<DropdownItem[]>([]);

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
}
