import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, map } from 'rxjs';
import { Visit, VisitsResponse } from '../interfaces/visit.interface';
import camelcaseKeys from 'camelcase-keys';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getVisits(): Observable<Visit[]> {
    const url = `${this.baseUrl}/api/v1/visits`;
    return this.http.get<VisitsResponse>(url).pipe(
      map((response) => {
        const camelCaseVisits = response.data.visits.map(
          (visit) => camelcaseKeys({ ...visit }) as Visit,
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
          (visit) => camelcaseKeys({ ...visit }) as Visit,
        );
        return camelCaseVisits;
      }),
    );
  }
}
