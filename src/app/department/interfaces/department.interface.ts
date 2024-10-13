import { ApiResponse } from '@shared/interfaces/default-response.interface';

interface DepartmentBase {
  name: string;
  floor: string;
}

export interface Department extends DepartmentBase {
  id: number;
}

export type DepartmentCreationParams = DepartmentBase;

export type DepartmentUpdateParams = Partial<Department>;

export type DepartmentResponse = ApiResponse<{ department: Department }>;

export type DepartmentListResponse = ApiResponse<{
  departments: Department[];
}>;

export interface DepartmentRegistrationParams {
  department: DepartmentCreationParams;
}

export interface DepartmentUpdateRequestParams {
  department: DepartmentUpdateParams;
}
