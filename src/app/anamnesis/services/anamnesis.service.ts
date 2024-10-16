import { Injectable } from '@angular/core';
import { BaseHttpService } from '@app/core/services/base-http.service';
import {
  Anamnesis,
  AnamnesisRegistrationParams,
  AnamnesisUpdateRequestParams,
} from '../interfaces/anamnese.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AnamnesisService extends BaseHttpService<
  Anamnesis,
  AnamnesisRegistrationParams,
  AnamnesisUpdateRequestParams
> {
  protected baseUrl = `${environment.apiUrl}/api/v1/anamneses`;
  protected override entityName = 'anamnesis';

  protected override extractSingleItem(response: any) {
    return response.data.anamnesis;
  }

  protected override extractArrayItems(response: any): any[] {
    return response.data.anamneses;
  }
}
