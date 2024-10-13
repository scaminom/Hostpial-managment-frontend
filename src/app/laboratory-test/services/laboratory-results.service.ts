import { Injectable } from '@angular/core';
import {
  LabResultsRegistrationParams,
  LabResultsUpdateRequestParams,
  LaboratoryResults,
} from '../interfaces/laboratory-test.interface';
import { environment } from '@env/environment';
import { BaseHttpService } from '@app/core/services/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class LaboratoryResultsService extends BaseHttpService<
  LaboratoryResults,
  LabResultsRegistrationParams,
  LabResultsUpdateRequestParams
> {
  protected baseUrl = `${environment.apiUrl}/api/v1/laboratory_results`;
  protected override entityName = 'laboratory_result';

  protected override extractSingleItem(response: any) {
    return response.data.laboratory_result;
  }

  protected override extractArrayItems(response: any): any[] {
    return response.data.laboratory_results;
  }
}
