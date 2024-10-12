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
  private destroyRef = inject(DestroyRef);

  prescriptions = this.prescriptionFacade.prescriptions;
  deletePrescriptionDialog = signal(false);
  prescriptionToDelete = signal<number | null>(null);

  ngOnInit(): void {
    this.prescriptionFacade
      .getAllEntities()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  get getPrescriptionName(): string {
    return this.prescriptionFacade.prescription()?.medication ?? '';
  }

  navigateToNewPrescription() {
    const patientId = this.route.parent?.snapshot.paramMap.get('patientId');
    const visitId = this.route.snapshot.paramMap.get('visitId');
    if (patientId && visitId) {
      this.router.navigate(['prescription', 'new'], {
        relativeTo: this.route,
        queryParams: { activeTab: 'prescriptions' },
        queryParamsHandling: 'merge',
      });
    } else {
      console.error('Patient ID or Visit ID not found in the current route');
    }
  }

  confirmDeletePrescription(prescription: Prescription) {
    this.prescriptionToDelete.set(prescription.id);
    this.prescriptionFacade.prescription.set(prescription);
    this.deletePrescriptionDialog.set(true);
  }

  deletePrescription() {
    const prectiptionId = this.prescriptionToDelete();
    if (prectiptionId !== null) {
      this.prescriptionFacade
        .deleteEntity(prectiptionId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
      this.deletePrescriptionDialog.set(false);
      this.prescriptionToDelete.set(null);
    }
  }

  editPrescription(prescriptionId: number) {
    const patientId = this.route.parent?.snapshot.paramMap.get('patientId');
    const visitId = this.route.snapshot.paramMap.get('visitId');
    if (patientId && visitId) {
      this.router.navigate(['prescription', 'edit', prescriptionId], {
        relativeTo: this.route,
        queryParams: { activeTab: 'prescriptions' },
        queryParamsHandling: 'merge',
      });
    } else {
      console.error('Patient ID or Visit ID not found in the current route');
    }
  }
}
