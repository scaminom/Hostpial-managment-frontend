import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
import {
  Department,
  DepartmentParams,
  DepartmentReponse,
  DepartmentsReponse,
} from '../interfaces/department.interface';
import { IHttpService } from '@app/core/interfaces/http-service.interface';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService
  implements
    IHttpService<Department, DepartmentParams, Partial<DepartmentParams>>
{
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1/departments`;

  getById(id: number): Observable<Department> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<DepartmentReponse>(url).pipe(
      map((response) => {
        return response.data.department;
      }),
    );
  }

  getAll(): Observable<Department[]> {
    return this.http.get<DepartmentsReponse>(this.baseUrl).pipe(
      map((response) => {
        return response.data.departments;
      }),
    );
  }

  create(departmentParams: DepartmentParams): Observable<Department> {
    const body = { department: { ...departmentParams.department } };

    return this.http.post<DepartmentReponse>(this.baseUrl, body).pipe(
      map((response) => {
        return response.data.department;
      }),
    );
  }

  update(
    id: number,
    departmentParams: DepartmentParams,
  ): Observable<Department> {
    const url = `${this.baseUrl}/${id}`;
    const body = { department: { ...departmentParams.department } };

    return this.http.put<DepartmentReponse>(url, body).pipe(
      map((response) => {
        return response.data.department;
      }),
    );
  }

  delete(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<DepartmentReponse>(url).pipe(
      map(() => {
        return true;
      }),
    );
  }
}
