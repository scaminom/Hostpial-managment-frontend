import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientCardComponent } from '@app/patient/components/patient-card/patient-card.component';
import { PatientDetailTabComponent } from '@app/patient/components/patient-detail-tab/patient-detail-tab.component';
import { PatientFacade } from '@app/patient/helpers/patient.facade';
import { Visit } from '@app/visit/interfaces/visit.interface';
import { VisitService } from '@app/visit/services/visit.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-patient-overview-page',
  standalone: true,
  imports: [PatientCardComponent, PatientDetailTabComponent],
  templateUrl: './patient-overview-page.component.html',
  styles: ``,
})
export class PatientOverviewPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private patientFacade = inject(PatientFacade);
  private visitService = inject(VisitService);

  isLoading = signal(true);
  patient = this.patientFacade.patient;
  visits = signal<Visit[]>([]);

  ngOnInit(): void {
    this.route.parent?.params
      .pipe(
        switchMap((params) => {
          const id = +params['patientId'];

          return forkJoin({
            patient: this.patientFacade.getPatient(id),
            visits: this.visitService.getVisitsByPatientId(id),
          });
        }),
      )
      .subscribe({
        next: ({ visits }) => {
          this.visits.set(visits);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });
  }
}
