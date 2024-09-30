import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Department,
  DepartmentReponse,
} from '@app/department/interfaces/department.interface';
import { environment } from '@env/environment';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getDepartmentById(id: number): Observable<Department> {
    const url = `${this.baseUrl}/api/v1/departments/${id}`;

    return this.http.get<DepartmentReponse>(url).pipe(
      catchError((error) => {
        console.error('Error fetching departments', error);
        throw error;
      }),
      map((response) => {
        return response.data.department;
      }),
    );
  }

  getDepartments(): Observable<Department[]> {
    const url = `${this.baseUrl}/api/v1/departments`;

    return this.http.get<DepartmentsReponse>(url).pipe(
      catchError((error) => {
        console.error('Error fetching patients', error);
        throw error;
      }),
      map((response) => {
        return response.data.departments;
      }),
    );
  }

  createDepartment(departmentParams: DepartmentParams): Observable<Department> {
    const url = `${this.baseUrl}/api/v1/departments`;
    const body = { department: { ...departmentParams.department } };

    return this.http.post<DepartmentReponse>(url, body).pipe(
      catchError((error) => {
        console.error('Error logging in', error.error);
        return throwError(() => error.error);
      }),
      map((response) => {
        return response.data.department;
      }),
    );
  }

  updateDepartment(
    id: number,
    departmentParams: DepartmentParams,
  ): Observable<Department> {
    const url = `${this.baseUrl}/api/v1/departments/${id}`;
    const body = { department: { ...departmentParams.department } };

    return this.http.put<DepartmentReponse>(url, body).pipe(
      catchError((error) => {
        console.error('Error logging in', error.error);
        return throwError(() => error.error);
      }),
      map((response) => {
        return response.data.department;
      }),
    );
  }

  deleteDepartment(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/api/v1/departments/${id}`;

    return this.http.delete<DepartmentReponse>(url).pipe(
      catchError((error) => {
        console.error('Error logging in', error.error);
        return throwError(() => error.error);
      }),
      map(() => {
        return true;
      }),
    );
  }
}
