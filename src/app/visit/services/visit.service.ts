import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, map } from 'rxjs';
import {
  Visit,
  VisitResponse,
  VisitsResponse,
} from '../interfaces/visit.interface';
import camelcaseKeys from 'camelcase-keys';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getVisitById(visitId: number): Observable<Visit> {
    const url = `${this.baseUrl}/api/v1/visits/${visitId}`;
    return this.http.get<VisitResponse>(url).pipe(
      map((response) => {
        const camelCaseVisit = camelcaseKeys(
          { ...response.data.visit },
          { deep: true },
        ) as unknown as Visit;
        return camelCaseVisit;
      }),
    );
  }

  getVisits(): Observable<Visit[]> {
    const url = `${this.baseUrl}/api/v1/visits`;
    return this.http.get<VisitsResponse>(url).pipe(
      map((response) => {
        const camelCaseVisits = response.data.visits.map(
          (visit) =>
            camelcaseKeys({ ...visit }, { deep: true }) as unknown as Visit,
        );
        return camelCaseVisits;
      }),
    );
  }

  getVisitsByPatientId(patientId: number): Observable<Visit[]> {
    const url = `${this.baseUrl}/api/v1/patients/${patientId}/visits`;
    return this.http.get<VisitsResponse>(url).pipe(
      map((response) => {
        const camelCaseVisits = response.data.visits.map(
          (visit) =>
            camelcaseKeys({ ...visit }, { deep: true }) as unknown as Visit,
        );
        return camelCaseVisits;
      }),
    );
  }
}
