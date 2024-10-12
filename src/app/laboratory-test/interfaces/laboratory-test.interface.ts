import { ApiResponse } from '@app/shared/interfaces/default-response.interface';

interface LabTestBase {
  labType: string;
  name: string;
  status: string;
  visitId: number;
}

export interface LaboratoryResults extends LabTestBase {
  id: number;
  results?: string;
  performedAt: string;
}

export interface LabResultsCreationParams extends LabTestBase {
  visitId: number;
}

export type LabResultsUpdateParams = Partial<
  Omit<LaboratoryResults, 'id' | 'performedAt'>
>;

export type LabResultsResponse = ApiResponse<{
  laboratory_result: LaboratoryResults;
}>;

export type LabResultsListResponse = ApiResponse<{
  laboratory_results: LaboratoryResults[];
}>;

export interface LabResultsRegistrationParams {
  laboratoryResult: LabResultsCreationParams;
}

export interface LabResultsUpdateRequestParams {
  laboratoryResult: LabResultsUpdateParams;
}
