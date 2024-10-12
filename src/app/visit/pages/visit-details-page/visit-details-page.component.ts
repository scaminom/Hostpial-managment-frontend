import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnamnesisDetailCardsComponent } from '@app/anamnese/components/anamnesis-detail-cards/anamnesis-detail-cards.component';
import { LababoratoryTestTableComponent } from '@app/laboratory-test/components/lababoratory-test-table/lababoratory-test-table.component';
import { PrescriptionTableComponent } from '@app/prescription/components/prescription-table/prescription-table.component';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { Visit } from '@app/visit/interfaces/visit.interface';
import { VisitService } from '@app/visit/services/visit.service';
import { combineLatest, switchMap } from 'rxjs';

@Component({
  selector: 'app-visit-details-page',
  standalone: true,
  imports: [
    DatePipe,
    PrimeNGModule,
    PrescriptionTableComponent,
    LababoratoryTestTableComponent,
    AnamnesisDetailCardsComponent,
  ],
  templateUrl: './visit-details-page.component.html',
})
export class VisitDetailsPageComponent implements OnInit {
  visit = signal<Visit | null>(null);
  activeTabIndex = signal(0);
  private route = inject(ActivatedRoute);
  private visitService = inject(VisitService);
  private router = inject(Router);

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(
        switchMap(([params, queryParams]) => {
          const id = +params['visitId'];
          this.activeTabIndex.set(+queryParams['activeTab'] || 0);
          this.router.navigate([], {
            relativeTo: this.route,
            queryParamsHandling: 'preserve',
          });
          return this.visitService.getVisitById(id);
        }),
      )
      .subscribe((visit) => this.visit.set(visit));
  }
}
