import { ApiResponse } from '@app/shared/interfaces/default-response.interface';

export interface DoctorRegistrationData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  speciality: string;
  licenseNumber: string;
  departmentId: number;
}

export type DoctorRegistrationParams = { doctor: DoctorRegistrationData };

export interface Doctor {
  id: number;
  speciality: string;
  licenseNumber: string;
  userId: number;
  departmentId: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export type DoctorResponse = ApiResponse<{ doctor: Doctor }>;
export type DoctorsResponse = ApiResponse<{ doctors: Doctor[] }>;
