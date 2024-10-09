import { ApiResponse } from '@app/shared/interfaces/default-response.interface';

export interface Visit {
  id: number;
  visitType: string;
  priorityLevel: string;
  createdAt: string;
}

export type VisitsResponse = ApiResponse<{ visits: Visit[] }>;
