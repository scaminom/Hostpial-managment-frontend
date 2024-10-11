import { Component, input } from '@angular/core';
import { Prescription } from '@app/prescription/interfaces/prescription.interface';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';

@Component({
  selector: 'prescription-table',
  standalone: true,
  imports: [PrimeNGModule],
  templateUrl: './prescription-table.component.html',
})
export class PrescriptionTableComponent {
  prescriptions = input.required<Prescription[]>();
}
