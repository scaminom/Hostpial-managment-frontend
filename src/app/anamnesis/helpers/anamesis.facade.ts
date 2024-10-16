import { Injectable, inject } from '@angular/core';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import { Observable, tap } from 'rxjs';
import { IFacade } from '@app/core/interfaces/facade.interface';
import {
  Anamnesis,
  AnamnesisRegistrationParams,
  AnamnesisUpdateRequestParams,
} from '../interfaces/anamnese.interface';
import { AnamnesisService } from '../services/anamnesis.service';

@Injectable({
  providedIn: 'root',
})
export class AnamnesisFacade
  implements
    IFacade<
      Anamnesis,
      AnamnesisRegistrationParams,
      AnamnesisUpdateRequestParams
    >
{
  private anamnesisService = inject(AnamnesisService);
  private messageService = inject(MessageWrapedService);

  getEntity(id: number): Observable<Anamnesis> {
    return this.anamnesisService.getById(id);
  }

  getAllEntities(): Observable<Anamnesis[]> {
    return this.anamnesisService.getAll();
  }

  createEntity(params: AnamnesisRegistrationParams): Observable<Anamnesis> {
    return this.anamnesisService.create(params).pipe(
      tap(() => {
        this.messageService.showSuccessMessage(
          'Anamnesis created successfully',
        );
      }),
    );
  }

  updateEntity(
    id: number,
    prescriptionData: AnamnesisUpdateRequestParams,
  ): Observable<Anamnesis> {
    return this.anamnesisService.update(id, prescriptionData).pipe(
      tap(() => {
        this.messageService.showSuccessMessage(
          'Anamnesis updated successfully',
        );
      }),
    );
  }

  deleteEntity(id: number): Observable<boolean> {
    return this.anamnesisService.delete(id).pipe(
      tap(() => {
        this.messageService.showSuccessMessage(
          'Anamnesis deleted successfully',
        );
      }),
    );
  }
}
