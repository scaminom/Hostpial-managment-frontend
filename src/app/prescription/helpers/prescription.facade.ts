import { Injectable, computed, inject, signal } from '@angular/core';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import { Observable, tap } from 'rxjs';
import { IFacade } from '@app/core/interfaces/facade.interface';
import {
  Prescription,
  PrescriptionRegistrationParams,
  PrescriptionUpdateRequestParams,
} from '../interfaces/prescription.interface';
import { PrescriptionService } from '../services/prescription.service';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionFacade
  implements
    IFacade<
      Prescription,
      PrescriptionRegistrationParams,
      PrescriptionUpdateRequestParams
    >
{
  private prescriptionService = inject(PrescriptionService);
  private messageService = inject(MessageWrapedService);

  getEntity(id: number): Observable<Prescription> {
    return this.prescriptionService.getById(id);
  }

  getAllEntities(): Observable<Prescription[]> {
    return this.prescriptionService.getAll();
  }

  createEntity(
    params: PrescriptionRegistrationParams,
  ): Observable<Prescription> {
    return this.prescriptionService.create(params).pipe(
      tap(() => {
        this.messageService.showSuccessMessage(
          'Prescription created successfully',
        );
      }),
    );
  }

  updateEntity(
    id: number,
    prescriptionData: PrescriptionUpdateRequestParams,
  ): Observable<Prescription> {
    return this.prescriptionService.update(id, prescriptionData).pipe(
      tap(() => {
        this.messageService.showSuccessMessage(
          'Prescription updated successfully',
        );
      }),
    );
  }

  deleteEntity(id: number): Observable<boolean> {
    return this.prescriptionService.delete(id).pipe(
      tap(() => {
        this.messageService.showSuccessMessage(
          'Prescription deleted successfully',
        );
      }),
    );
  }
}
