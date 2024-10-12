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
import { IHttpService } from '@app/core/interfaces/http-service.interface';

@Injectable({
  providedIn: 'root',
})
export class PatientService
  implements IHttpService<Patient, PatientParams, Partial<PatientParams>>
{
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1/patients`;

  getById(id: number): Observable<Patient> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<PatientReponse>(url).pipe(
      map((response) => {
        return camelcaseKeys({ ...response.data.patient }) as Patient;
      }),
    );
  }

  getAll(): Observable<Patient[]> {
    return this.http.get<PatientsReponse>(this.baseUrl).pipe(
      map((response) => {
        const camelCasePatients = response.data.patients.map(
          (patient) => camelcaseKeys({ ...patient }) as Patient,
        );
        return camelCasePatients;
      }),
    );
  }

  create(patientParams: PatientParams): Observable<Patient> {
    const url = this.baseUrl;
    const body = snakecaseKeys({
      patient: { ...patientParams.patient },
    });

    return this.http.post<PatientReponse>(url, body).pipe(
      map((response) => {
        return camelcaseKeys({ ...response.data.patient }) as Patient;
      }),
    );
  }

  update(id: number, patientParams: PatientParams): Observable<Patient> {
    const url = `${this.baseUrl}/${id}`;
    const body = snakecaseKeys({
      patient: { ...patientParams.patient },
    });

    return this.http.put<PatientReponse>(url, body).pipe(
      map((response) => {
        return camelcaseKeys({ ...response.data.patient }) as Patient;
      }),
    );
  }

  delete(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<PatientReponse>(url).pipe(
      map(() => {
        return true;
      }),
    );
  }
}
