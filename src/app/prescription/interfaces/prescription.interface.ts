import { ApiResponse } from '@app/shared/interfaces/default-response.interface';

interface PrescriptionBase {
  medication: string;
  dosage: string;
  duration: string;
}

export interface Prescription extends PrescriptionBase {
  id: number;
}

export interface PrescripitionCreationParams extends PrescriptionBase {
  visitId: number;
}

export type PrescriptionUpdateParams = Partial<Omit<Prescription, 'id'>>;
export type PrescriptionResponse = ApiResponse<{ prescription: Prescription }>;

export type PrescriptionListResponse = ApiResponse<{
  prescriptions: Prescription[];
}>;

export interface PrescriptionRegistrationParams {
  prescription: PrescripitionCreationParams;
}

export interface PrescriptionUpdateRequestParams {
  prescription: PrescriptionUpdateParams;
}
