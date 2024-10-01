import { Injectable, inject, signal, computed } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import { Doctor, DoctorCreationParams } from '../interfaces/doctor.interface';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DoctorFacade {
  private doctorService = inject(DoctorService);
  private messageService = inject(MessageWrapedService);
  private router = inject(Router);

  private doctorSignal = signal<Doctor | null>(null);
  doctor = computed(() => this.doctorSignal());

  getDoctor(id: number): Observable<Doctor> {
    return this.doctorService
      .getDoctorById(id)
      .pipe(tap((doctor) => this.doctorSignal.set(doctor)));
  }

  createDoctor(doctorData: DoctorCreationParams): void {
    this.doctorService.createDoctor({ doctor: doctorData }).subscribe({
      next: (doctor) => {
        this.doctorSignal.set(doctor);
        this.messageService.showSuccessMessage('Doctor created successfully');
        this.router.navigate(['/doctor']);
      },
    });
  }

  updateDoctor(id: number, doctorData: DoctorCreationParams): void {
    this.doctorService.updateDoctor(id, { doctor: doctorData }).subscribe({
      next: (doctor) => {
        this.doctorSignal.set(doctor);
        this.messageService.showSuccessMessage('Doctor updated successfully');
        this.router.navigate(['/doctor']);
      },
    });
  }
}
