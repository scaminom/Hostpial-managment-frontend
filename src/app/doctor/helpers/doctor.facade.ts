import { Injectable, inject } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import {
  Doctor,
  DoctorRegistrationParams,
  DoctorUpdateRequestParams,
} from '../interfaces/doctor.interface';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IFacade } from '@app/core/interfaces/facade.interface';

@Injectable({
  providedIn: 'root',
})
export class DoctorFacade
  implements
    IFacade<Doctor, DoctorRegistrationParams, DoctorUpdateRequestParams>
{
  private doctorService = inject(DoctorService);
  private messageService = inject(MessageWrapedService);
  private router = inject(Router);

  getEntity(id: number): Observable<Doctor> {
    return this.doctorService.getById(id);
  }

  getAllEntities(): Observable<Doctor[]> {
    return this.doctorService.getAll();
  }

  createEntity(params: DoctorRegistrationParams): Observable<Doctor> {
    return this.doctorService.create(params).pipe(
      tap(() => {
        this.messageService.showSuccessMessage('Doctor created successfully');
        this.router.navigate(['/doctor']);
      }),
    );
  }

  updateEntity(
    id: number,
    doctorData: DoctorUpdateRequestParams,
  ): Observable<Doctor> {
    return this.doctorService.update(id, doctorData).pipe(
      tap(() => {
        this.messageService.showSuccessMessage('Doctor updated successfully');
        this.router.navigate(['/doctor']);
      }),
    );
  }

  deleteEntity(id: number): Observable<boolean> {
    return this.doctorService.delete(id).pipe(
      tap(() => {
        this.messageService.showSuccessMessage('Doctor deleted successfully');
      }),
    );
  }
}
