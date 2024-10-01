import { Component, inject, signal } from '@angular/core';

import { ToastModule } from 'primeng/toast';

import { Column } from '@shared/interfaces/column-table.interface';
import { DialogComponent } from '@shared/components/table/dialog/dialog.component';
import { MessageWrapedService } from '@shared/services/message-wraped.service';
import { TableListComponent } from '@shared/components/table/table-list/table-list.component';
import { ToolbarComponent } from '@shared/components/table/toolbar/toolbar.component';

import { Department } from '../../interfaces/department.interface';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-list-department-page',
  standalone: true,
  imports: [ToastModule, ToolbarComponent, TableListComponent, DialogComponent],
  templateUrl: './list-department-page.component.html',
})
export class ListDepartmentPageComponent {
  deleteDepartmentDialog = signal(false);
  cols: Column[] = [];
  globalFilterFields: string[] = ['name', 'floor'];
  department = signal<Department | null>(null);
  departments = signal<Department[]>([]);

  private messageWrapedService = inject(MessageWrapedService);
  private departmentService = inject(DepartmentService);

  ngOnInit(): void {
    this.loadDepartments();
    this.initializeColumns();
  }

  private loadDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: (departments) => this.departments.set(departments),
      error: (error) =>
        this.messageWrapedService.handleError(
          error,
          'Failed to load departments',
        ),
    });
  }

  private initializeColumns(): void {
    this.cols = [
      { field: 'name', header: 'Department Name' },
      { field: 'floor', header: 'Department Floor' },
    ];
  }

  deleteDepartment(department: Department): void {
    this.department.set(department);
    this.deleteDepartmentDialog.set(true);
  }

  getDepartmentFullName(): string {
    const department = this.department();
    return department ? `${department.name} ${department.floor}` : '';
  }

  onConfirmDelete(): void {
    const departmentToDelete = this.department();
    if (departmentToDelete && departmentToDelete.id) {
      this.departmentService.deleteDepartment(departmentToDelete.id).subscribe({
        next: (success) => {
          if (success) {
            this.departments.update((currentdepartments) =>
              currentdepartments.filter((p) => p.id !== departmentToDelete.id),
            );
            this.messageWrapedService.showSuccessMessage('department Deleted');
          } else {
            this.messageWrapedService.handleError(
              null,
              'Failed to delete department',
            );
          }
        },
        error: (error) => {
          this.messageWrapedService.handleError(error, error.message);
        },
      });
    }
    this.deleteDepartmentDialog.set(false);
    this.department.set(null);
  }
}
