import { Injectable, computed, inject, signal } from '@angular/core';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import { Observable, tap } from 'rxjs';
import { IFacade } from '@app/core/interfaces/facade.interface';
import {
  Visit,
  VisitCreationParams,
  VisitUpdateParams,
} from '../interfaces/visit.interface';
import { VisitService } from '../services/visit.service';

@Injectable({
  providedIn: 'root',
})
export class VisitFacade
  implements IFacade<Visit, VisitCreationParams, VisitUpdateParams>
{
  private visitService = inject(VisitService);
  private messageService = inject(MessageWrapedService);

  visit = signal<Visit | null>(null);
  private visitsSignal = signal<Visit[]>([]);
  visits = computed(() => this.visitsSignal());

  getEntity(id: number): Observable<Visit> {
    return this.visitService.getById(id).pipe(
      tap((visit) => {
        this.visit.set(visit);
      }),
    );
  }

  getAllEntities(): Observable<Visit[]> {
    return this.visitService.getAll().pipe(
      tap((visits) => {
        this.visitsSignal.set(visits);
      }),
    );
  }

  createEntity(
    params: VisitCreationParams,
    isEmergency: boolean = false,
  ): Observable<Visit> {
    return isEmergency
      ? this.createEmergencyVisit(params)
      : this.createRegularVisit(params);
  }

  private createRegularVisit(params: VisitCreationParams): Observable<Visit> {
    return this.visitService.createRegularVisit(params).pipe(
      tap((newVisit) => {
        this.visitsSignal.update((visits) => [...visits, newVisit]);
        this.messageService.showSuccessMessage(
          'Regular visit created successfully',
        );
      }),
    );
  }

  private createEmergencyVisit(params: VisitCreationParams): Observable<Visit> {
    return this.visitService.createEmergencyVisit(params).pipe(
      tap((newVisit) => {
        this.visitsSignal.update((visits) => [...visits, newVisit]);
        this.messageService.showSuccessMessage(
          'Emergency visit created successfully',
        );
      }),
    );
  }

  updateEntity(id: number, visitData: VisitUpdateParams): Observable<Visit> {
    return this.visitService.update(id, visitData).pipe(
      tap((updatedVisit) => {
        this.visitsSignal.update((visits) =>
          visits.map((visit) => (visit.id === id ? updatedVisit : visit)),
        );
        this.messageService.showSuccessMessage('Visit updated successfully');
      }),
    );
  }

  deleteEntity(id: number): Observable<boolean> {
    return this.visitService.delete(id).pipe(
      tap(() => {
        this.messageService.showSuccessMessage('Visit deleted successfully');
        this.visitsSignal.update((visits) =>
          visits.filter((visit) => visit.id !== id),
        );
      }),
    );
  }
}
