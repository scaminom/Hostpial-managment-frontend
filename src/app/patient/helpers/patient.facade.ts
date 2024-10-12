import { Injectable, inject } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import {
  Patient,
  PatientCreationParams,
} from '../interfaces/patient.interface';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IFacade } from '@app/core/interfaces/facade.interface';

@Injectable({
  providedIn: 'root',
})
export class PatientFacade
  implements
    IFacade<Patient, PatientCreationParams, Partial<PatientCreationParams>>
{
  private patientService = inject(PatientService);
  private messageService = inject(MessageWrapedService);
  private router = inject(Router);

  getEntity(id: number): Observable<Patient> {
    return this.patientService.getById(id);
  }

  getAllEntities(): Observable<Patient[]> {
    return this.patientService.getAll();
  }

  createEntity(patientData: PatientCreationParams): Observable<Patient> {
    return this.patientService.create({ patient: patientData }).pipe(
      tap(() => {
        this.messageService.showSuccessMessage('Patient created successfully');
        this.router.navigate(['/patient']);
      }),
    );
  }

  updateEntity(
    id: number,
    patientData: PatientCreationParams,
  ): Observable<Patient> {
    return this.patientService.update(id, { patient: patientData }).pipe(
      tap(() => {
        this.messageService.showSuccessMessage('Patient updated successfully');
        this.router.navigate(['/patient']);
      }),
    );
  }

  deleteEntity(id: number): Observable<boolean> {
    return this.patientService.delete(id).pipe(
      tap(() => {
        this.messageService.showSuccessMessage('Patient deleted successfully');
      }),
    );
  }
}
