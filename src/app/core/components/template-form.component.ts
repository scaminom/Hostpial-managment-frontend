import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFacade } from '../interfaces/facade.interface';
import { FormStrategy } from '../strategies/form-strategy.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  protected destroyRef = inject(DestroyRef);
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
      this.route.params
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((params) => {
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
    this.entityFacade
      .createEntity(entityData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  protected updateEntity(entityData: UpdateParams): void {
    if (this.entityId) {
      this.entityFacade
        .updateEntity(this.entityId, entityData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }
  }

  protected retrieveEntity(id: number): void {
    this.entityFacade
      .getEntity(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (entity) => {
          this.formStrategy.patchFormValues(this.entityForm, entity);
        },
      });
  }
}
