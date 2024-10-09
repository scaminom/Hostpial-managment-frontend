import { Injectable, inject, signal, computed } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import {
  Patient,
  PatientCreationParams,
} from '../interfaces/patient.interface';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PatientFacade {
  private patientService = inject(PatientService);
  private messageService = inject(MessageWrapedService);
  private router = inject(Router);
  private patientSignal = signal<Patient | null>(null);
  patient = computed(() => this.patientSignal());
  patients = signal<Patient[]>([]);

  getPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (patients) => this.patients.set(patients),
    });
  }

  getPatient(id: number): Observable<Patient> {
    return this.patientService
      .getPatientById(id)
      .pipe(tap((patient) => this.patientSignal.set(patient)));
  }

  createPatient(patientData: PatientCreationParams): void {
    this.patientService.createPatient({ patient: patientData }).subscribe({
      next: (patient) => {
        this.patientSignal.set(patient);
        this.messageService.showSuccessMessage('Patient created successfully');
        this.router.navigate(['/patient']);
      },
    });
  }

  updatePatient(id: number, patientData: PatientCreationParams): void {
    this.patientService.updatePatient(id, { patient: patientData }).subscribe({
      next: (patient) => {
        this.patientSignal.set(patient);
        this.messageService.showSuccessMessage('Patient updated successfully');
        this.router.navigate(['/patient']);
      },
    });
  }

  deletePatient(id: number): void {
    this.patientService.deletePatient(id).subscribe({
      next: () => {
        this.messageService.showSuccessMessage('Patient deleted successfully');
      },
    });
  }
}
