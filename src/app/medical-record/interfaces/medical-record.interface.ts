import { Anamnesis } from '@app/anamnese/interfaces/anamnese.interface';

export interface MedicalRecord {
  id: number;
  notes: string;
  anamnesis: Anamnesis;
}
