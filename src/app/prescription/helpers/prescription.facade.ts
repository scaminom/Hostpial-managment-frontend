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

  prescription = signal<Prescription | null>(null);
  private prescriptionsSignal = signal<Prescription[]>([]);
  prescriptions = computed(() => this.prescriptionsSignal());

  getEntity(id: number): Observable<Prescription> {
    return this.prescriptionService.getById(id).pipe(
      tap((prescription) => {
        this.prescription.set(prescription);
      }),
    );
  }

  getAllEntities(): Observable<Prescription[]> {
    return this.prescriptionService.getAll().pipe(
      tap((prescriptions) => {
        this.prescriptionsSignal.set(prescriptions);
      }),
    );
  }

  createEntity(
    params: PrescriptionRegistrationParams,
  ): Observable<Prescription> {
    return this.prescriptionService.create(params).pipe(
      tap((newPrescription) => {
        this.prescriptionsSignal.update((tests) => [...tests, newPrescription]);
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
      tap((updatedPrescription) => {
        this.prescriptionsSignal.update((prescriptions) =>
          prescriptions.map((prescription) =>
            prescription.id === id ? updatedPrescription : prescription,
          ),
        );
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
        this.prescriptionsSignal.update((prescriptions) =>
          prescriptions.filter((prescription) => prescription.id !== id),
        );
      }),
    );
  }
}
