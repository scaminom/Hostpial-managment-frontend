import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Patient,
  PatientRegistrationParams,
  PatientUpdateParams,
} from '../interfaces/patient.interface';
import camelcaseKeys from 'camelcase-keys';
import { environment } from '../../../environments/environment';
import { Visit, VisitsResponse } from '@app/visit/interfaces/visit.interface';
import { BaseHttpService } from '@app/core/services/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class PatientService extends BaseHttpService<
  Patient,
  PatientRegistrationParams,
  PatientUpdateParams
> {
  protected baseUrl = `${environment.apiUrl}/api/v1/patients`;
  protected override entityName = 'patient';

  protected override extractSingleItem(response: any) {
    return response.data.patient;
  }

  protected override extractArrayItems(response: any): any[] {
    return response.data.patients;
  }

  getVisitsByPatientId(patientId: number): Observable<Visit[]> {
    const url = `${this.baseUrl}/${patientId}/visits`;

    return this.http.get<VisitsResponse>(url).pipe(
      map((response) => {
        const camelCaseVisits = response.data.visits.map((visit) =>
          camelcaseKeys({ ...visit }, { deep: true }),
        );
        return camelCaseVisits;
      }),
    );
  }
}
