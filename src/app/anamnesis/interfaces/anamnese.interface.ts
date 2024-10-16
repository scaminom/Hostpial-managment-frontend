import { ApiResponse } from '@app/shared/interfaces/default-response.interface';

interface AnamnesisBase {
  currentResidence: string;
  educationLevel: string;
  occupation: string;
  maritalStatus: string;
  religion: string;
  handedness: string;
  familyReference: string;
  genderIdentity: string;
  medicalHistory: string;
}

export interface Anamnesis extends AnamnesisBase {
  id: number;
  age: number;
}

export interface AnamnesisCreationParams extends AnamnesisBase {
  medicalRecordId: number;
}

export type AnamnesisUpdateParams = Partial<Omit<Anamnesis, 'id'>>;

export type AnamnesisResponse = ApiResponse<{ anamnesis: Anamnesis }>;

export type AnamnesisListResponse = ApiResponse<{
  anamneses: Anamnesis[];
}>;

export interface AnamnesisRegistrationParams {
  anamnesis: AnamnesisCreationParams;
}

export interface AnamnesisUpdateRequestParams {
  anamnesis: AnamnesisUpdateParams;
}
