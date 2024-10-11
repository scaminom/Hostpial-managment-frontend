import { Doctor } from '@app/doctor/interfaces/doctor.interface';
import { LaboratoryResults } from '@app/laboratory-test/interfaces/laboratory-test.interface';
import { MedicalRecord } from '@app/medical-record/interfaces/medical-record.interface';
import { Prescription } from '@app/prescription/interfaces/prescription.interface';
import { ApiResponse } from '@app/shared/interfaces/default-response.interface';

export interface Visit {
  id: number;
  room: string;
  visitType: string;
  priorityLevel: string;
  createdAt: string;
  doctor: Doctor;
  patientName: string;
  overview: string;
  prescriptions: Prescription[];
  laboratoryResults: LaboratoryResults[];
  medicalRecord: MedicalRecord;
}

export type VisitResponse = ApiResponse<{ visit: Visit }>;
export type VisitsResponse = ApiResponse<{ visits: Visit[] }>;
