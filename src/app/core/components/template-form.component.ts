import { Component, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFacade } from '../interfaces/facade.interface';
import { FormStrategy } from '../strategies/form-strategy.interface';

@Component({
  template: '',
})
export abstract class TemplateFormComponent<T, CreateParams, UpdateParams>
  implements OnInit
{
  entityForm!: FormGroup;
  isEditMode = false;
  entityId: number | null = null;

  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected abstract entityFacade: IFacade<T, CreateParams, UpdateParams>;
  protected abstract formStrategy: FormStrategy<T>;

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  protected initForm(): void {
    this.entityForm = this.formStrategy.createForm();
  }

  protected checkEditMode(): void {
    this.isEditMode = this.router.url.includes('edit');
    if (this.isEditMode) {
      this.route.params.subscribe((params) => {
        this.entityId = +params['id'];
        this.retrieveEntity(this.entityId);
      });
    }
  }

  onSubmit(): void {
    if (this.entityForm.valid) {
      const entityData = this.formStrategy.prepareEntityData(this.entityForm);
      this.isEditMode
        ? this.updateEntity(entityData as UpdateParams)
        : this.createEntity(entityData as CreateParams);
    }
  }

  protected createEntity(entityData: CreateParams): void {
    this.entityFacade.createEntity(entityData);
  }

  protected updateEntity(entityData: UpdateParams): void {
    if (this.entityId) {
      this.entityFacade.updateEntity(this.entityId, entityData);
    }
  }

  protected retrieveEntity(id: number): void {
    this.entityFacade.getEntity(id).subscribe({
      next: (entity) =>
        this.formStrategy.patchFormValues(this.entityForm, entity),
    });
  }
}
