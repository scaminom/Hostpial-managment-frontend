import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateFormComponent } from '@app/core/components/template-form.component';
import { LaboratoryTestsFacade } from '@app/laboratory-test/helpers/laboratory-tests.facade';
import {
  LabResultsRegistrationParams,
  LabResultsUpdateRequestParams,
  LaboratoryResults,
} from '@app/laboratory-test/interfaces/laboratory-test.interface';
import { LaboratoryResultsFormStrategy } from '@app/laboratory-test/strategies/laboratory-results-form.strategy';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { ReactiveValidationModule } from 'angular-reactive-validation';
@Component({
  selector: 'app-lababoratory-form',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveValidationModule, PrimeNGModule],
  templateUrl: './lababoratory-form.component.html',
  styles: ``,
})
export class LababoratoryFormComponent extends TemplateFormComponent<
  LaboratoryResults,
  LabResultsRegistrationParams,
  LabResultsUpdateRequestParams
> {
  protected override entityFacade = inject(LaboratoryTestsFacade);
  protected override formStrategy = inject(LaboratoryResultsFormStrategy);

  statusItems = this.formStrategy.statusItems;

  protected override createEntity(
    entityData: LabResultsRegistrationParams,
  ): void {
    const visitId = this.route.snapshot.paramMap.get('visitId');

    const data = {
      ...entityData,
      visitId: visitId,
    };

    this.entityFacade.createEntity(data);
  }

  protected override checkEditMode(): void {
    this.isEditMode = this.router.url.includes('edit');
    if (this.isEditMode) {
      const labTestId = this.route.snapshot.paramMap.get('labTestId');
      if (labTestId) {
        this.entityId = +labTestId;
        this.retrieveEntity(+labTestId);
      } else {
        console.error('Lab Test ID not found in the current route');
      }
    }
  }
}
