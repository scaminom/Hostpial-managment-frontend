import { Injectable } from '@angular/core';
import {
  Department,
  DepartmentRegistrationParams,
  DepartmentUpdateRequestParams,
} from '../interfaces/department.interface';
import { BaseHttpService } from '@app/core/services/base-http.service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends BaseHttpService<
  Department,
  DepartmentRegistrationParams,
  DepartmentUpdateRequestParams
> {
  protected baseUrl = `${environment.apiUrl}/api/v1/departments`;
  protected override entityName = 'department';

  protected override extractSingleItem(response: any) {
    return response.data.department;
  }

  protected override extractArrayItems(response: any): any[] {
    return response.data.departments;
  }
}
