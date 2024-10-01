import { ApiResponse } from '@shared/interfaces/default-response.interface';

export interface Department {
  id: number;
  name: string;
  floor: string;
}

export type DepartmentCreationParams = Omit<Department, 'id'>;
export type DepartmentReponse = ApiResponse<{ department: Department }>;
export type DepartmentsReponse = ApiResponse<{ departments: Department[] }>;
export type DepartmentParams = { department: Omit<Department, 'id'> };
