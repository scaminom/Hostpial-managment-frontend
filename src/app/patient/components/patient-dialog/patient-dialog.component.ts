import { Component, input, output } from '@angular/core';
import { Patient } from '../../interfaces/patient.interface';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-patient-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './patient-dialog.component.html',
  styles: ``,
})
export class PatientDialogComponent {
  deletePatientDialog = input<boolean>(false);
  deletePatientsDialog = input<boolean>(false);
  patient = input<Patient | null>(null);

  cancelDelete = output<void>();
  confirmDelete = output<void>();
  cancelDeleteMultiple = output<void>();
  confirmDeleteMultiple = output<void>();

  consutructor() {
    console.log(this.deletePatientDialog());
  }

  onCancel() {
    this.cancelDelete.emit();
  }

  onConfirm() {
    this.confirmDelete.emit();
  }

  onCancelMultiple() {
    this.cancelDeleteMultiple.emit();
  }

  onConfirmMultiple() {
    this.confirmDeleteMultiple.emit();
  }
}
