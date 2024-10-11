import { UserRegistrationParams } from '@app/auth/interfaces/user.interface';
import { Department } from '@app/department/interfaces/department.interface';
import { ApiResponse } from '@app/shared/interfaces/default-response.interface';

export interface Doctor {
  id: number;
  speciality: string;
  licenseNumber: string;
  fullName: string;
  department?: Department;
  user?: UserRegistrationParams;
}

export interface DoctorCreationParams {
  speciality: string;
  licenseNumber: string;
  departmentId: number;
  userAttributes: UserRegistrationParams;
}

export type DoctorResponse = ApiResponse<{ doctor: Doctor }>;
export type DoctorsResponse = ApiResponse<{ doctors: Doctor[] }>;
export type DoctorRegistrationParams = { doctor: DoctorCreationParams };
