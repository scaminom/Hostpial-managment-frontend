import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnamnesisDetailCardsComponent } from '@app/anamnese/components/anamnesis-detail-cards/anamnesis-detail-cards.component';
import { LababoratoryTestTableComponent } from '@app/laboratory-test/components/lababoratory-test-table/lababoratory-test-table.component';
import { PrescriptionTableComponent } from '@app/prescription/components/prescription-table/prescription-table.component';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { Visit } from '@app/visit/interfaces/visit.interface';
import { VisitService } from '@app/visit/services/visit.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-visit-details-page',
  standalone: true,
  imports: [
    DatePipe,
    PrimeNGModule,
    LababoratoryTestTableComponent,
    PrescriptionTableComponent,
    AnamnesisDetailCardsComponent,
  ],
  templateUrl: './visit-details-page.component.html',
})
export class VisitDetailsPageComponent implements OnInit {
  visit = signal<Visit | null>(null);
  private route = inject(ActivatedRoute);

  private visitService = inject(VisitService);

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          const id = +params['visitId'];
          return this.visitService.getVisitById(id);
        }),
      )
      .subscribe((visit) => this.visit.set(visit));
  }
}
