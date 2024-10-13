import { Doctor } from '@app/doctor/interfaces/doctor.interface';
import { LaboratoryResults } from '@app/laboratory-test/interfaces/laboratory-test.interface';
import { MedicalRecord } from '@app/medical-record/interfaces/medical-record.interface';
import { Prescription } from '@app/prescription/interfaces/prescription.interface';
import { ApiResponse } from '@app/shared/interfaces/default-response.interface';

export enum VisitType {
  Regular = 'regular',
  Emergency = 'emergency',
}

interface VisitBase {
  priorityLevel: string;
  visitType: VisitType;
  medicalRecordId: number;
  doctorId: number;
}

export interface RegularVisit extends VisitBase {
  room: string;
}

export interface EmergencyVisit extends VisitBase {}

export type VisitCreationParams = RegularVisit | EmergencyVisit;

export interface Visit {
  id: number;
  visitType: VisitType;
  priorityLevel: string;
  createdAt: string;
  room?: string;
  patientName: string;
  doctor: Doctor;
  medicalRecord: MedicalRecord;
  prescriptions: Prescription[];
  laboratoryResults: LaboratoryResults[];
}

export type VisitUpdateParams = Partial<Omit<Visit, 'id'>>;

export type VisitResponse = ApiResponse<{ visit: Visit }>;
export type VisitsResponse = ApiResponse<{ visits: Visit[] }>;
