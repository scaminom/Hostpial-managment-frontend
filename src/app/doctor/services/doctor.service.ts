import { Injectable } from '@angular/core';
import {
  Doctor,
  DoctorRegistrationParams,
  DoctorUpdateRequestParams,
} from '../interfaces/doctor.interface';
import { BaseHttpService } from '@app/core/services/base-http.service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class DoctorService extends BaseHttpService<
  Doctor,
  DoctorRegistrationParams,
  DoctorUpdateRequestParams
> {
  protected baseUrl = `${environment.apiUrl}/api/v1/doctors`;
  protected override entityName = 'doctor';

  protected override extractSingleItem(response: any) {
    return response.data.doctor;
  }

  protected override extractArrayItems(response: any): any[] {
    return response.data.doctors;
  }
}
