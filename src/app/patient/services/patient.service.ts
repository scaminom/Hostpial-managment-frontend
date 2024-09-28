import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import snakecaseKeys from 'snakecase-keys';
import {
  Patient,
  PatientParams,
  PatientReponse,
} from '../interfaces/patient.interface';
import camelcaseKeys from 'camelcase-keys';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  createPatient(patientParams: PatientParams): Observable<Patient> {
    const url = `${this.baseUrl}/api/v1/patients`;
    const body = snakecaseKeys({
      patient: { ...patientParams.patient },
    });

    return this.http.post<PatientReponse>(url, body).pipe(
      catchError((error) => {
        console.error('Error logging in', error);
        throw error;
      }),
      map((response) => camelcaseKeys({ ...response.data.patient })),
    );
  }
}
