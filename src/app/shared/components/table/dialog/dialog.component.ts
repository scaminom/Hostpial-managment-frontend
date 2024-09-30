import { Component, input, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  showDialog = input<boolean>(false);
  header = input<string>('Confirm');
  itemName = input<string>('');
  cancelDelete = output<void>();
  confirmDelete = output<void>();

  onCancel() {
    this.cancelDelete.emit();
  }

  onConfirm() {
    this.confirmDelete.emit();
  }
}
