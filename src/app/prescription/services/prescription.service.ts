import { Injectable, inject } from '@angular/core';
import { IHttpService } from '@app/core/interfaces/http-service.interface';
import {
  Prescription,
  PrescriptionListResponse,
  PrescriptionRegistrationParams,
  PrescriptionResponse,
  PrescriptionUpdateRequestParams,
} from '../interfaces/prescription.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, map } from 'rxjs';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionService
  implements
    IHttpService<
      Prescription,
      PrescriptionRegistrationParams,
      PrescriptionUpdateRequestParams
    >
{
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1/prescriptions`;

  getById(id: number): Observable<Prescription> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<PrescriptionResponse>(url).pipe(
      map((response) => {
        return camelcaseKeys(
          {
            ...response.data.prescription,
          },
          { deep: true },
        );
      }),
    );
  }

  getAll(): Observable<Prescription[]> {
    return this.http.get<PrescriptionListResponse>(this.baseUrl).pipe(
      map((response) => {
        const camelCaseLaboratoryResults = response.data.prescriptions.map(
          (laboratoryResult) => camelcaseKeys({ ...laboratoryResult }),
        );
        return camelCaseLaboratoryResults;
      }),
    );
  }

  create(params: PrescriptionRegistrationParams): Observable<Prescription> {
    const body = snakecaseKeys({ prescription: { ...params } }, { deep: true });

    return this.http.post<PrescriptionResponse>(this.baseUrl, body).pipe(
      map((response) => {
        return camelcaseKeys({
          ...response.data.prescription,
        });
      }),
    );
  }

  update(
    id: number,
    params: PrescriptionUpdateRequestParams,
  ): Observable<Prescription> {
    const url = `${this.baseUrl}/${id}`;
    const body = snakecaseKeys({ prescription: { ...params } }, { deep: true });

    return this.http.put<PrescriptionResponse>(url, body).pipe(
      map((response) => {
        return camelcaseKeys({
          ...response.data.prescription,
        });
      }),
    );
  }

  delete(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<boolean>(url);
  }
}
