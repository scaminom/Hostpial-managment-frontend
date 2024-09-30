import { Component } from '@angular/core';
import { DepartmentFormComponent } from '../../components/department-form/department-form.component';

@Component({
  selector: 'app-edit-department-page',
  standalone: true,
  imports: [DepartmentFormComponent],
  templateUrl: './edit-department-page.component.html',
})
export class EditDepartmentPageComponent {}
