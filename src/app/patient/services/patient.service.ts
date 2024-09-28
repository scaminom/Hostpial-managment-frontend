import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, tap, toArray } from 'rxjs';
import snakecaseKeys from 'snakecase-keys';
import {
  Patient,
  PatientParams,
  PatientReponse,
  PatientsReponse,
} from '../interfaces/patient.interface';
import camelcaseKeys from 'camelcase-keys';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  getPatients(): Observable<Patient[]> {
    const url = `${this.baseUrl}/api/v1/patients`;

    return this.http.get<PatientsReponse>(url).pipe(
      catchError((error) => {
        console.error('Error fetching patients', error);
        throw error;
      }),
      map((response) => {
        const camelCasePatients = response.data.patients.map(
          (patient) => camelcaseKeys({ ...patient }) as Patient,
        );
        return camelCasePatients;
      }),
    );
  }

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
