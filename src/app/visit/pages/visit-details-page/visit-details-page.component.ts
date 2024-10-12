import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnamnesisDetailCardsComponent } from '@app/anamnese/components/anamnesis-detail-cards/anamnesis-detail-cards.component';
import { LababoratoryTestTableComponent } from '@app/laboratory-test/components/lababoratory-test-table/lababoratory-test-table.component';
import { PrescriptionTableComponent } from '@app/prescription/components/prescription-table/prescription-table.component';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { Visit } from '@app/visit/interfaces/visit.interface';
import { VisitService } from '@app/visit/services/visit.service';
import { combineLatest, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private destroyRef = inject(DestroyRef);

  readonly tabMap: Record<string, number> = {
    overview: 0,
    'lab-tests': 1,
    prescriptions: 2,
    anamnesis: 3,
  };

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(
        map(([params, queryParams]) => ({
          id: +params['visitId'],
          activeTab: queryParams['activeTab'] as string,
        })),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ id, activeTab }) => {
        this.loadVisit(id);
        this.updateActiveTab(activeTab);
      });
  }

  private loadVisit(id: number): void {
    this.visitService
      .getVisitById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (visit) => this.visit.set(visit),
        error: (error) => console.error('Error loading visit:', error),
      });
  }

  private updateActiveTab(activeTab: string): void {
    const tabIndex = this.tabMap[activeTab] ?? 0;
    this.activeTabIndex.set(tabIndex);
    this.updateQueryParams(activeTab);
  }

  private updateQueryParams(activeTab: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { activeTab },
      queryParamsHandling: 'merge',
    });
  }

  onTabChange(index: number): void {
    const activeTab =
      Object.keys(this.tabMap).find((key) => this.tabMap[key] === index) ||
      'overview';
    this.updateQueryParams(activeTab);
  }
}
