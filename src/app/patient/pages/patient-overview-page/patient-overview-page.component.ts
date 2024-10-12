import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { PatientCardComponent } from '@app/patient/components/patient-card/patient-card.component';
import { PatientDetailTabComponent } from '@app/patient/components/patient-detail-tab/patient-detail-tab.component';
import { PatientFacade } from '@app/patient/helpers/patient.facade';
import { Patient } from '@app/patient/interfaces/patient.interface';
import { Visit } from '@app/visit/interfaces/visit.interface';
import { VisitService } from '@app/visit/services/visit.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-patient-overview-page',
  standalone: true,
  imports: [PatientCardComponent, PatientDetailTabComponent],
  templateUrl: './patient-overview-page.component.html',
})
export class PatientOverviewPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private patientFacade = inject(PatientFacade);
  private visitService = inject(VisitService);
  private destroyRef = inject(DestroyRef);

  isLoading = signal(true);
  patient = signal<Patient | null>(null);
  visits = signal<Visit[]>([]);

  ngOnInit(): void {
    this.route.parent?.params
      .pipe(
        switchMap((params) => {
          const id = +params['patientId'];

          return forkJoin({
            patient: this.patientFacade
              .getEntity(id)
              .pipe(takeUntilDestroyed(this.destroyRef)),
            visits: this.visitService
              .getVisitsByPatientId(id)
              .pipe(takeUntilDestroyed(this.destroyRef)),
          });
        }),
      )
      .subscribe({
        next: ({ visits, patient }) => {
          this.patient.set(patient);
          this.visits.set(visits);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });
  }
}
