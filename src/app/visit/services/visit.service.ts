import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  Visit,
  VisitCreationParams,
  VisitResponse,
  VisitUpdateParams,
} from '../interfaces/visit.interface';
import { BaseHttpService } from '@app/core/services/base-http.service';
import { Observable, map } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import {
  Prescription,
  PrescriptionListResponse,
} from '@app/prescription/interfaces/prescription.interface';
import camelcaseKeys from 'camelcase-keys';
import {
  LabResultsListResponse,
  LaboratoryResults,
} from '@app/laboratory-test/interfaces/laboratory-test.interface';

@Injectable({
  providedIn: 'root',
})
export class VisitService extends BaseHttpService<
  Visit,
  VisitCreationParams,
  VisitUpdateParams
> {
  protected override baseUrl = `${environment.apiUrl}/api/v1/visits`;
  protected override entityName = 'visit';

  protected override extractSingleItem(response: any) {
    return response.data.visit;
  }

  protected override extractArrayItems(response: any): any[] {
    return response.data.visits;
  }

  override create(params: VisitCreationParams): Observable<Visit> {
    return this.createVisit(params, 'regular');
  }

  getPrescriptionsByVisitId(visitId: number): Observable<Prescription[]> {
    const url = `${this.baseUrl}/${visitId}/prescriptions`;
    return this.http.get<PrescriptionListResponse>(url).pipe(
      map((response) => {
        const camelCasePrescriptions = response.data.prescriptions.map(
          (prescription) => camelcaseKeys({ ...prescription }, { deep: true }),
        );
        return camelCasePrescriptions;
      }),
    );
  }

  getLaboratoryResultsByVisitId(
    visitId: number,
  ): Observable<LaboratoryResults[]> {
    const url = `${this.baseUrl}/${visitId}/laboratory_results`;

    return this.http.get<LabResultsListResponse>(url).pipe(
      map((response) => {
        const camelCaseLabResults = response.data.laboratory_results.map(
          (labResult) => camelcaseKeys({ ...labResult }, { deep: true }),
        );
        return camelCaseLabResults;
      }),
    );
  }

  private createVisit(
    params: VisitCreationParams,
    type: 'regular' | 'emergency',
  ): Observable<Visit> {
    const httpParams = new HttpParams().set('type', type);
    const body = this.toSnakeCase({ [this.entityName]: params });

    return this.http
      .post<VisitResponse>(this.baseUrl, body, { params: httpParams })
      .pipe(map(this.extractSingleItem), map(this.toCamelCase));
  }

  createRegularVisit(params: VisitCreationParams): Observable<Visit> {
    return this.createVisit(params, 'regular');
  }

  createEmergencyVisit(params: VisitCreationParams): Observable<Visit> {
    return this.createVisit(params, 'emergency');
  }
}
