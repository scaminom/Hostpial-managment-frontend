import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GenericHttpService } from '../services/generic-http.service';
import { MessageWrapperService } from '../services/message.service';

@Injectable({
  providedIn: 'root',
})
export class GenericFacade<T> {
  constructor(
    protected entityService: GenericHttpService<T>,
    protected messageService: MessageWrapperService,
    protected router: Router,
  ) {}

  getEntity(id: number): Observable<T> {
    return this.entityService.getById(id);
  }

  createEntity(entityData: T): void {
    this.entityService.create(entityData).subscribe({
      next: () => {
        this.messageService.showSuccessMessage('Entity created successfully');
        this.router.navigate(['/entity-list']);
      },
      error: (error) => this.messageService.showErrorMessage(error.message),
    });
  }

  updateEntity(id: number, entityData: T): void {
    this.entityService.update(id, entityData).subscribe({
      next: () => {
        this.messageService.showSuccessMessage('Entity updated successfully');
        this.router.navigate(['/entity-list']);
      },
      error: (error) => this.messageService.showErrorMessage(error.message),
    });
  }
}
