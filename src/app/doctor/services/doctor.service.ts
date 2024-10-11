import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, map } from 'rxjs';
import {
  Doctor,
  DoctorRegistrationParams,
  DoctorResponse,
  DoctorUpdateRequestParams,
  DoctorsResponse,
} from '../interfaces/doctor.interface';
import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';
import { IHttpService } from '@app/core/interfaces/http-service.interface';

@Injectable({
  providedIn: 'root',
})
export class DoctorService
  implements
    IHttpService<Doctor, DoctorRegistrationParams, DoctorUpdateRequestParams>
{
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getById(id: number): Observable<Doctor> {
    const url = `${this.baseUrl}/api/v1/doctors/${id}`;

    return this.http.get<DoctorResponse>(url).pipe(
      map((response) => {
        return camelcaseKeys(
          { ...response.data.doctor },
          { deep: true },
        ) as unknown as Doctor;
      }),
    );
  }

  getAll(): Observable<Doctor[]> {
    const url = `${this.baseUrl}/api/v1/doctors`;

    return this.http.get<DoctorsResponse>(url).pipe(
      map((response) => {
        const camelCaseDoctors = response.data.doctors.map(
          (doctor) =>
            camelcaseKeys({ ...doctor }, { deep: true }) as unknown as Doctor,
        );
        return camelCaseDoctors;
      }),
    );
  }

  create(doctorParams: DoctorRegistrationParams): Observable<Doctor> {
    const url = `${this.baseUrl}/api/v1/doctors`;
    const body = snakecaseKeys({
      doctor: { ...doctorParams.doctor },
    });
    return this.http.post<DoctorResponse>(url, body).pipe(
      map((response) => {
        return camelcaseKeys(
          { ...response.data.doctor },
          { deep: true },
        ) as unknown as Doctor;
      }),
    );
  }

  update(
    id: number,
    doctorParams: DoctorUpdateRequestParams,
  ): Observable<Doctor> {
    const url = `${this.baseUrl}/api/v1/doctors/${id}`;
    const body = snakecaseKeys({
      doctor: { ...doctorParams.doctor },
    });
    return this.http.put<DoctorResponse>(url, body).pipe(
      map((response) => {
        return camelcaseKeys(
          { ...response.data.doctor },
          { deep: true },
        ) as unknown as Doctor;
      }),
    );
  }

  delete(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/api/v1/doctors/${id}`;
    return this.http
      .delete<{ success: boolean }>(url)
      .pipe(map((response) => response.success));
  }
}
