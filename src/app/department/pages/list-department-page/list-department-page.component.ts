import { Component, inject, signal } from '@angular/core';

import { ToastModule } from 'primeng/toast';

import { TableColumn } from '@shared/interfaces/column-table.interface';
import { DialogComponent } from '@shared/components/table/dialog/dialog.component';
import { MessageWrapedService } from '@shared/services/message-wraped.service';
import { TableListComponent } from '@shared/components/table/table-list/table-list.component';
import { ToolbarComponent } from '@shared/components/table/toolbar/toolbar.component';

import { Department } from '../../interfaces/department.interface';
import { Router } from '@angular/router';
import { TableActionButton } from '@app/shared/interfaces/action-button.interface';
import { ToolbarButton } from '@app/shared/interfaces/tool-bar-button.interface';
import { DepartmentService } from '@app/department/services/department.service';

@Component({
  selector: 'app-list-department-page',
  standalone: true,
  imports: [ToastModule, ToolbarComponent, TableListComponent, DialogComponent],
  templateUrl: './list-department-page.component.html',
})
export class ListDepartmentPageComponent {
  deleteDepartmentDialog = signal(false);
  cols: TableColumn[] = [];
  globalFilterFields: string[] = ['name', 'floor'];

  toolbarButtons: ToolbarButton[] = [
    {
      label: 'New',
      icon: 'pi pi-plus',
      route: ['/department/new'],
      class: 'p-button-success mr-2',
    },
  ];

  department = signal<Department | null>(null);
  departments = signal<Department[]>([]);

  departmentTableActions: TableActionButton[] = [];

  private messageWrapedService = inject(MessageWrapedService);
  private departmentService = inject(DepartmentService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadDepartments();
    this.initializeColumns();
  }

  private loadDepartments(): void {
    this.departmentService.getAll().subscribe({
      next: (departments) => this.departments.set(departments),
    });
  }

  private initializeColumns(): void {
    this.cols = [
      { field: 'name', header: 'Department Name' },
      {
        field: 'floor',
        header: 'Department Floor',
      },
    ];

    this.departmentTableActions = [
      {
        icon: 'pi pi-pencil',
        class: 'p-button-rounded p-button-success mr-2',
        action: (department: Department) => this.editDepartment(department),
      },
      {
        icon: 'pi pi-trash',
        class: 'p-button-rounded p-button-danger mr-2',
        action: (department: Department) => this.deleteDepartment(department),
      },
    ];
  }

  deleteDepartment(department: Department): void {
    this.department.set(department);
    this.deleteDepartmentDialog.set(true);
  }

  editDepartment(department: Department): void {
    this.router.navigate(['/department/edit', department.id]);
  }

  getDepartmentFullName(): string {
    const department = this.department();
    return department ? `${department.name} ${department.floor}` : '';
  }

  onConfirmDelete(): void {
    const departmentToDelete = this.department();
    if (departmentToDelete && departmentToDelete.id) {
      this.departmentService.delete(departmentToDelete.id).subscribe({
        next: (success) => {
          if (success) {
            this.departments.update((currentdepartments) =>
              currentdepartments.filter((p) => p.id !== departmentToDelete.id),
            );
            this.messageWrapedService.showSuccessMessage('department Deleted');
          }
        },
      });
    }
    this.deleteDepartmentDialog.set(false);
    this.department.set(null);
  }
}
