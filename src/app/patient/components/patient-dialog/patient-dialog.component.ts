import { Component, input, output } from '@angular/core';
import { Patient } from '../../interfaces/patient.interface';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';

@Component({
  selector: 'app-patient-dialog',
  standalone: true,
  imports: [PrimeNGModule],
  templateUrl: './patient-dialog.component.html',
})
export class PatientDialogComponent {
  deletePatientDialog = input<boolean>(false);
  patient = input<Patient | null>(null);

  cancelDelete = output<void>();
  confirmDelete = output<void>();

  consutructor() {
    console.log(this.deletePatientDialog());
  }

  onCancel() {
    this.cancelDelete.emit();
  }

  onConfirm() {
    this.confirmDelete.emit();
  }
}
