import { Injectable, computed, inject, signal } from '@angular/core';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import { Observable, tap } from 'rxjs';
import { IFacade } from '@app/core/interfaces/facade.interface';
import {
  LabResultsRegistrationParams,
  LabResultsUpdateRequestParams,
  LaboratoryResults,
} from '../interfaces/laboratory-test.interface';
import { LaboratoryResultsService } from '../services/laboratory-results.service';

@Injectable({
  providedIn: 'root',
})
export class LaboratoryTestsFacade
  implements
    IFacade<
      LaboratoryResults,
      LabResultsRegistrationParams,
      LabResultsUpdateRequestParams
    >
{
  private labTestsService = inject(LaboratoryResultsService);
  private messageService = inject(MessageWrapedService);

  labTest = signal<LaboratoryResults | null>(null);
  private labTestsSignal = signal<LaboratoryResults[]>([]);
  labTests = computed(() => this.labTestsSignal());

  getEntity(id: number): Observable<LaboratoryResults> {
    return this.labTestsService.getById(id).pipe(
      tap((labTest) => {
        this.labTest.set(labTest);
      }),
    );
  }

  getAllEntities(): Observable<LaboratoryResults[]> {
    return this.labTestsService.getAll().pipe(
      tap((labTests) => {
        this.labTestsSignal.set(labTests);
      }),
    );
  }

  createEntity(
    params: LabResultsRegistrationParams,
  ): Observable<LaboratoryResults> {
    return this.labTestsService.create(params).pipe(
      tap((newLabTest) => {
        this.labTestsSignal.update((tests) => [...tests, newLabTest]);
        this.messageService.showSuccessMessage(
          'Laboratory test created successfully',
        );
      }),
    );
  }

  updateEntity(
    id: number,
    labTestData: LabResultsUpdateRequestParams,
  ): Observable<LaboratoryResults> {
    return this.labTestsService.update(id, labTestData).pipe(
      tap((updatedLabTest) => {
        this.labTestsSignal.update((tests) =>
          tests.map((test) => (test.id === id ? updatedLabTest : test)),
        );
        this.messageService.showSuccessMessage(
          'Laboratory test updated successfully',
        );
      }),
    );
  }

  deleteEntity(id: number): Observable<boolean> {
    return this.labTestsService.delete(id).pipe(
      tap(() => {
        this.messageService.showSuccessMessage(
          'Laboratory test deleted successfully',
        );
        this.labTestsSignal.update((tests) =>
          tests.filter((test) => test.id !== id),
        );
      }),
    );
  }
}
