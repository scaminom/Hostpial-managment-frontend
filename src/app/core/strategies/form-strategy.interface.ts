import { FormGroup } from '@angular/forms';

export interface FormStrategy<T> {
  createForm(): FormGroup;
  patchFormValues(form: FormGroup, entity: T): void;
  prepareEntityData(form: FormGroup): any;
}
