import { Injectable } from '@angular/core';
import {
  Prescription,
  PrescriptionRegistrationParams,
  PrescriptionUpdateRequestParams,
} from '../interfaces/prescription.interface';
import { environment } from '@env/environment';
import { BaseHttpService } from '@app/core/services/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionService extends BaseHttpService<
  Prescription,
  PrescriptionRegistrationParams,
  PrescriptionUpdateRequestParams
> {
  protected baseUrl = `${environment.apiUrl}/api/v1/prescriptions`;
  protected override entityName = 'prescription';

  protected override extractSingleItem(response: any) {
    return response.data.prescription;
  }

  protected override extractArrayItems(response: any): any[] {
    return response.data.prescriptions;
  }
}
