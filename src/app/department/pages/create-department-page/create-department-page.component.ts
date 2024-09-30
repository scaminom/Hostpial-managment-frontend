import { Component } from '@angular/core';
import { DepartmentFormComponent } from '../../components/department-form/department-form.component';

@Component({
  selector: 'app-create-department-page',
  standalone: true,
  imports: [DepartmentFormComponent],
  templateUrl: './create-department-page.component.html',
})
export class CreateDepartmentPageComponent {}
