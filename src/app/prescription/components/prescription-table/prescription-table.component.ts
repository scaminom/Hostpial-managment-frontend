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
import { PrescriptionFacade } from '@app/prescription/helpers/prescription.facade';
import { Prescription } from '@app/prescription/interfaces/prescription.interface';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { DialogComponent } from '@app/shared/components/table/dialog/dialog.component';
import { VisitService } from '@app/visit/services/visit.service';

@Component({
  selector: 'prescription-table',
  standalone: true,
  imports: [PrimeNGModule, DialogComponent],
  templateUrl: './prescription-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrescriptionTableComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private prescriptionFacade = inject(PrescriptionFacade);
  private visitService = inject(VisitService);
  private destroyRef = inject(DestroyRef);

  prescriptions = signal<Prescription[]>([]);
  deletePrescriptionDialog = signal(false);
  prescriptionToDelete = signal<number | null>(null);
  prescriptionName = signal<string>('');

  private patientId: string | null | undefined = null;
  private visitId: string | null = null;

  ngOnInit(): void {
    this.initializeIds();
    this.loadPrescriptions();
  }

  private initializeIds(): void {
    this.patientId = this.route.parent?.snapshot.paramMap.get('patientId');
    this.visitId = this.route.snapshot.paramMap.get('visitId');

    if (!this.patientId || !this.visitId) {
      console.error('Patient ID or Visit ID not found in the current route');
    }
  }

  private loadPrescriptions(): void {
    if (this.visitId) {
      this.visitService
        .getPrescriptionsByVisitId(Number(this.visitId))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((prescriptions) => {
          this.prescriptions.set(prescriptions);
        });
    }
  }

  navigateToNewPrescription(): void {
    if (this.patientId && this.visitId) {
      this.router.navigate(['prescription', 'new'], {
        relativeTo: this.route,
        queryParams: { activeTab: 'prescriptions' },
        queryParamsHandling: 'merge',
      });
    } else {
      console.error('Patient ID or Visit ID not found in the current route');
    }
  }

  confirmDeletePrescription(prescription: Prescription): void {
    this.prescriptionName.set(prescription.medication);
    this.prescriptionToDelete.set(prescription.id);
    this.deletePrescriptionDialog.set(true);
  }

  onCancelDeletePrescription(): void {
    this.resetDeleteDialog();
  }

  deletePrescription(): void {
    const prescriptionId = this.prescriptionToDelete();
    if (prescriptionId !== null) {
      this.prescriptionFacade
        .deleteEntity(prescriptionId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.updatePrescriptionsAfterDelete(prescriptionId);
          this.resetDeleteDialog();
        });
    }
  }

  editPrescription(prescriptionId: number): void {
    if (this.patientId && this.visitId) {
      this.router.navigate(['prescription', 'edit', prescriptionId], {
        relativeTo: this.route,
        queryParams: { activeTab: 'prescriptions' },
        queryParamsHandling: 'merge',
      });
    } else {
      console.error('Patient ID or Visit ID not found in the current route');
    }
  }

  private updatePrescriptionsAfterDelete(deletedId: number): void {
    this.prescriptions.update((prescriptions) =>
      prescriptions.filter((p) => p.id !== deletedId),
    );
  }

  private resetDeleteDialog(): void {
    this.deletePrescriptionDialog.set(false);
    this.prescriptionToDelete.set(null);
    this.prescriptionName.set('');
  }
}
