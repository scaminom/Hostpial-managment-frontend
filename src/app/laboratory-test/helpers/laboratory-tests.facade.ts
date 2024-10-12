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
import { ActivatedRoute, Router } from '@angular/router';

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
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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

  createEntity(params: LabResultsRegistrationParams): void {
    this.labTestsService.create(params).subscribe({
      next: (newLabTest) => {
        this.labTestsSignal.update((tests) => [...tests, newLabTest]);
        this.messageService.showSuccessMessage(
          'Laboratory test created successfully',
        );
        this.navigateBack();
      },
    });
  }

  updateEntity(id: number, doctorData: LabResultsUpdateRequestParams): void {
    this.labTestsService.update(id, doctorData).subscribe({
      next: (updatedLabTest) => {
        this.labTestsSignal.update((tests) =>
          tests.map((test) => (test.id === id ? updatedLabTest : test)),
        );
        this.messageService.showSuccessMessage(
          'Laboratory test updated successfully',
        );
        this.navigateBack();
      },
    });
  }
  deleteEntity(id: number): void {
    this.labTestsService.delete(id).subscribe({
      next: () => {
        this.messageService.showSuccessMessage(
          'Laboratory test deleted successfully',
        );
        this.labTestsSignal.update((tests) =>
          tests.filter((test) => test.id !== id),
        );
      },
    });
  }

  private navigateBack(): void {
    const patientId = this.route.snapshot.paramMap.get('patientId');
    const visitId = this.route.snapshot.paramMap.get('visitId');

    if (patientId && visitId) {
      this.router.navigate(['/patient', patientId, 'visit', visitId], {
        queryParams: { activeTab: 'lab-tests' },
        queryParamsHandling: 'merge',
      });
    } else {
      console.error('Patient ID or Visit ID not found in the current route');
    }
  }
}
