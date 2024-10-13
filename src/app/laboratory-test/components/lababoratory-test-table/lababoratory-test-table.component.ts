import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratoryTestsFacade } from '@app/laboratory-test/helpers/laboratory-tests.facade';
import { LaboratoryResults } from '@app/laboratory-test/interfaces/laboratory-test.interface';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { DialogComponent } from '@app/shared/components/table/dialog/dialog.component';
import { Severity } from '@app/shared/types/severity.type';
import { VisitService } from '@app/visit/services/visit.service';

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
  private visitService = inject(VisitService);
  private destroyRef = inject(DestroyRef);

  laboratoryResults = signal<LaboratoryResults[]>([]);
  deleteLabTestDialog = signal(false);
  labTestToDelete = signal<number | null>(null);
  labTestName = signal<string>('');

  private patientId: string | null | undefined = null;
  private visitId: string | null = null;

  ngOnInit() {
    this.initializeIds();
    this.loadLaboratoryTests();
  }

  private initializeIds(): void {
    this.patientId = this.route.parent?.snapshot.paramMap.get('patientId');
    this.visitId = this.route.snapshot.paramMap.get('visitId');

    if (!this.patientId || !this.visitId) {
      console.error('Patient ID or Visit ID not found in the current route');
    }
  }

  private loadLaboratoryTests(): void {
    if (this.visitId) {
      this.visitService
        .getLaboratoryResultsByVisitId(Number(this.visitId))
        .subscribe((labResults) => {
          this.laboratoryResults.set(labResults);
        });
    }
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

  navigateToNewLabTest() {
    if (this.patientId && this.visitId) {
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
    this.labTestName.set(labTest.name);
    this.labTestToDelete.set(labTest.id);
    this.deleteLabTestDialog.set(true);
  }

  onCancelDeleteLabTest(): void {
    this.deleteLabTest();
  }

  deleteLabTest() {
    const labTestId = this.labTestToDelete();
    if (labTestId !== null) {
      this.labTestFacade
        .deleteEntity(labTestId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.updateLabTestsAfterDelete(labTestId);
          this.resetDeleteDialog();
        });
    }
  }

  editLabTest(labTestId: number) {
    if (this.patientId && this.visitId) {
      this.router.navigate(['lab-test', 'edit', labTestId], {
        relativeTo: this.route,
        queryParams: { activeTab: 'lab-tests' },
        queryParamsHandling: 'merge',
      });
    } else {
      console.error('Patient ID or Visit ID not found in the current route');
    }
  }

  private updateLabTestsAfterDelete(labTestId: number): void {
    this.laboratoryResults.update((labTests) =>
      labTests.filter((lt) => lt.id !== labTestId),
    );
  }

  private resetDeleteDialog(): void {
    this.labTestToDelete.set(null);
    this.deleteLabTestDialog.set(false);
    this.labTestName.set('');
  }
}
