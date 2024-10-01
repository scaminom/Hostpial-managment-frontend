import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageWrapedService {
  private messageService = inject(MessageService);

  showSuccessMessage(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  handleError(error: any, detail: string): void {
    console.error(error);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail,
      life: 3000,
    });
  }
}
