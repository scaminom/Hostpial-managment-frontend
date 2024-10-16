import { Anamnesis } from '@app/anamnesis/interfaces/anamnese.interface';

export interface MedicalRecord {
  id: number;
  notes: string;
  anamnesis: Anamnesis;
}
