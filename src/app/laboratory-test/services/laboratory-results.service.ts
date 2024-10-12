import { Injectable, inject } from '@angular/core';
import {
  LabResultsListResponse,
  LabResultsRegistrationParams,
  LabResultsResponse,
  LabResultsUpdateRequestParams,
  LaboratoryResults,
} from '../interfaces/laboratory-test.interface';
import { IHttpService } from '@app/core/interfaces/http-service.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, map } from 'rxjs';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

@Injectable({
  providedIn: 'root',
})
export class LaboratoryResultsService
  implements
    IHttpService<
      LaboratoryResults,
      LabResultsRegistrationParams,
      LabResultsUpdateRequestParams
    >
{
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1/laboratory_results`;

  getById(id: number): Observable<LaboratoryResults> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<LabResultsResponse>(url).pipe(
      map((response) => {
        return camelcaseKeys(
          {
            ...response.data.laboratory_result,
          },
          { deep: true },
        ) as LaboratoryResults;
      }),
    );
  }

  getAll(): Observable<LaboratoryResults[]> {
    return this.http.get<LabResultsListResponse>(this.baseUrl).pipe(
      map((response) => {
        const camelCaseLaboratoryResults = response.data.laboratory_results.map(
          (laboratoryResult) =>
            camelcaseKeys({ ...laboratoryResult }) as LaboratoryResults,
        );
        return camelCaseLaboratoryResults;
      }),
    );
  }

  create(params: LabResultsRegistrationParams): Observable<LaboratoryResults> {
    const body = snakecaseKeys(
      { laboratoryResult: { ...params } },
      { deep: true },
    );

    return this.http.post<LabResultsResponse>(this.baseUrl, body).pipe(
      map((response) => {
        return camelcaseKeys({
          ...response.data.laboratory_result,
        }) as LaboratoryResults;
      }),
    );
  }

  update(
    id: number,
    params: LabResultsUpdateRequestParams,
  ): Observable<LaboratoryResults> {
    const url = `${this.baseUrl}/${id}`;
    const body = snakecaseKeys(
      { laboratoryResult: { ...params } },
      { deep: true },
    );

    return this.http.put<LabResultsResponse>(url, body).pipe(
      map((response) => {
        return camelcaseKeys({
          ...response.data.laboratory_result,
        }) as LaboratoryResults;
      }),
    );
  }

  delete(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<LabResultsResponse>(url).pipe(
      map(() => {
        return true;
      }),
    );
  }
}
