import { Injectable, computed, signal } from '@angular/core';
import { Patient } from '../interfaces/patient.interface';

@Injectable({
  providedIn: 'root',
})
export class PatientDataService {
  private currentPatientSignal = signal<Patient | null>(null);

  readonly currentPatient = computed(() => this.currentPatientSignal());

  setCurrentPatient(patient: Patient) {
    this.currentPatientSignal.set(patient);
  }

  clearCurrentPatient() {
    this.currentPatientSignal.set(null);
  }
}
