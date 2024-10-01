import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import snakecaseKeys from 'snakecase-keys';
import {
  Patient,
  PatientParams,
  PatientReponse,
  PatientsReponse,
} from '../interfaces/patient.interface';
import camelcaseKeys from 'camelcase-keys';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getPatientById(id: number): Observable<Patient> {
    const url = `${this.baseUrl}/api/v1/patients/${id}`;

    return this.http.get<PatientReponse>(url).pipe(
      map((response) => {
        return camelcaseKeys({ ...response.data.patient }) as Patient;
      }),
    );
  }

  getPatients(): Observable<Patient[]> {
    const url = `${this.baseUrl}/api/v1/patients`;

    return this.http.get<PatientsReponse>(url).pipe(
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
      map((response) => {
        return camelcaseKeys({ ...response.data.patient }) as Patient;
      }),
    );
  }

  updatePatient(id: number, patientParams: PatientParams): Observable<Patient> {
    const url = `${this.baseUrl}/api/v1/patients/${id}`;
    const body = snakecaseKeys({
      patient: { ...patientParams.patient },
    });

    return this.http.put<PatientReponse>(url, body).pipe(
      map((response) => {
        return camelcaseKeys({ ...response.data.patient }) as Patient;
      }),
    );
  }

  deletePatient(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/api/v1/patients/${id}`;

    return this.http.delete<PatientReponse>(url).pipe(
      map(() => {
        return true;
      }),
    );
  }
}
