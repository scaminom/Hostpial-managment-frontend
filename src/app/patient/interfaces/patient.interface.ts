import { ApiResponse } from '@shared/interfaces/default-response.interface';

interface PatientBase {
  insuranceNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
  address: string;
  phoneNumber: string;
  email: string;
  bloodType: string;
  allergies?: string;
  birthPlace?: string;
}

export interface Patient extends PatientBase {
  id: number;
  medicalRecordId: number;
}

export type PatientCreationParams = PatientBase;

export type PatientUpdateParams = Partial<PatientBase>;

export type PatientResponse = ApiResponse<{ patient: Patient }>;

export type PatientListResponse = ApiResponse<{ patients: Patient[] }>;

export interface PatientRegistrationParams {
  patient: PatientCreationParams;
}

export interface PatientUpdateRequestParams {
  patient: PatientUpdateParams;
}
