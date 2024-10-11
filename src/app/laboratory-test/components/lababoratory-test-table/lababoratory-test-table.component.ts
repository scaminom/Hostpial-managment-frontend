import { Component, input } from '@angular/core';
import { LaboratoryResults } from '@app/laboratory-test/interfaces/laboratory-test.interface';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { Severity } from '@app/shared/types/severity.type';

@Component({
  selector: 'lab-test-table',
  standalone: true,
  imports: [PrimeNGModule],
  templateUrl: './lababoratory-test-table.component.html',
  styles: ``,
})
export class LababoratoryTestTableComponent {
  laboratoryResults = input.required<LaboratoryResults[]>();

  getStatusTest(priority: string): Severity {
    switch (priority) {
      case 'pending' || 'cancelled':
        return 'danger';
      case 'in_progress':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'info';
    }
  }
}
