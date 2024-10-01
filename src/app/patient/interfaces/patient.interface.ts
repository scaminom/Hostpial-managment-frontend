import { ApiResponse } from '@shared/interfaces/default-response.interface';

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  insuranceNumber: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
  address: string;
  phoneNumber: string;
  email: string;
  bloodType: string;
  allergies: string;
}

export type PatientReponse = ApiResponse<{ patient: Patient }>;
export type PatientsReponse = ApiResponse<{ patients: Patient[] }>;
export type PatientParams = { patient: Omit<Patient, 'id'> };
export type PatientCreationParams = Omit<Patient, 'id'>;
