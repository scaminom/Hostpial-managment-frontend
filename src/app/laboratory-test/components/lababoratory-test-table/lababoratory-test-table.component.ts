import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratoryTestsFacade } from '@app/laboratory-test/helpers/laboratory-tests.facade';
import { LaboratoryResults } from '@app/laboratory-test/interfaces/laboratory-test.interface';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { DialogComponent } from '@app/shared/components/table/dialog/dialog.component';
import { Severity } from '@app/shared/types/severity.type';

@Component({
  selector: 'lab-test-table',
  standalone: true,
  imports: [PrimeNGModule, DialogComponent],
  templateUrl: './lababoratory-test-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LababoratoryTestTableComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private labTestFacade = inject(LaboratoryTestsFacade);

  laboratoryResults = this.labTestFacade.labTests;
  deleteLabTestDialog = signal(false);
  labTestToDelete = signal<number | null>(null);

  ngOnInit() {
    this.labTestFacade.getAllEntities().subscribe();
  }

  getStatusTest(status: string): Severity {
    const statusMap: Record<string, Severity> = {
      pending: 'danger',
      cancelled: 'danger',
      in_progress: 'warning',
      completed: 'success',
    };
    return statusMap[status.toLowerCase()] || 'info';
  }

  get getLabTestName(): string {
    return this.labTestFacade.labTest()?.name ?? '';
  }

  navigateToNewLabTest() {
    const patientId = this.route.parent?.snapshot.paramMap.get('patientId');
    const visitId = this.route.snapshot.paramMap.get('visitId');
    if (patientId && visitId) {
      this.router.navigate(['lab-test', 'new'], {
        relativeTo: this.route,
        queryParams: { activeTab: 'lab-tests' },
        queryParamsHandling: 'merge',
      });
    } else {
      console.error('Patient ID or Visit ID not found in the current route');
    }
  }

  confirmDeleteLabTest(labTest: LaboratoryResults) {
    this.labTestToDelete.set(labTest.id);
    this.labTestFacade.labTest.set(labTest);
    this.deleteLabTestDialog.set(true);
  }

  deleteLabTest() {
    const labTestId = this.labTestToDelete();
    if (labTestId !== null) {
      this.labTestFacade.deleteEntity(labTestId);
      this.deleteLabTestDialog.set(false);
      this.labTestToDelete.set(null);
    }
  }

  editLabTest(labTestId: number) {
    const patientId = this.route.parent?.snapshot.paramMap.get('patientId');
    const visitId = this.route.snapshot.paramMap.get('visitId');
    if (patientId && visitId) {
      this.router.navigate(['lab-test', 'edit', labTestId], {
        relativeTo: this.route,
        queryParams: { activeTab: 'lab-tests' },
        queryParamsHandling: 'merge',
      });
    } else {
      console.error('Patient ID or Visit ID not found in the current route');
    }
  }
}
