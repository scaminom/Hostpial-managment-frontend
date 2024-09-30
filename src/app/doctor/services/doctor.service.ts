import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import {
  Doctor,
  DoctorRegistrationParams,
  DoctorResponse,
  DoctorsResponse,
} from '../interfaces/doctor.interface';
import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getDoctorById(id: number): Observable<Doctor> {
    const url = `${this.baseUrl}/api/v1/patients/${id}`;

    return this.http.get<DoctorResponse>(url).pipe(
      catchError((error) => {
        console.error('Error fetching patients', error);
        throw error;
      }),
      map((response) => {
        return camelcaseKeys({ ...response.data.doctor }) as Doctor;
      }),
    );
  }

  getDoctors(): Observable<Doctor[]> {
    const url = `${this.baseUrl}/api/v1/patients`;

    return this.http.get<DoctorsResponse>(url).pipe(
      catchError((error) => {
        console.error('Error fetching patients', error);
        throw error;
      }),
      map((response) => {
        const camelCaseDoctors = response.data.doctors.map(
          (doctor) => camelcaseKeys({ ...doctor }) as Doctor,
        );
        return camelCaseDoctors;
      }),
    );
  }

  createDoctor(doctorParams: DoctorRegistrationParams): Observable<Doctor> {
    const url = `${this.baseUrl}/api/v1/doctors`;
    const body = snakecaseKeys({
      doctor: { ...doctorParams.doctor },
    });

    return this.http.post<DoctorResponse>(url, body).pipe(
      catchError((error) => {
        console.error('Error creating doctor', error.error);
        return throwError(() => error.error);
      }),
      map((response) => {
        return camelcaseKeys({ ...response.data.doctor }) as Doctor;
      }),
    );
  }

  updateDoctor(
    id: number,
    doctorParams: DoctorRegistrationParams,
  ): Observable<Doctor> {
    const url = `${this.baseUrl}/api/v1/doctors/${id}`;
    const body = snakecaseKeys({
      doctor: { ...doctorParams.doctor },
    });
    return this.http.put<DoctorResponse>(url, body).pipe(
      catchError((error) => {
        console.error('Error updating doctor', error.error);
        return throwError(() => error.error);
      }),
      map((response) => {
        return camelcaseKeys({ ...response.data.doctor }) as Doctor;
      }),
    );
  }
}
