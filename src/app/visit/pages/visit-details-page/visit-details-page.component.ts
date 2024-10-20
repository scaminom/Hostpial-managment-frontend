import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnamnesisDetailCardsComponent } from '@app/anamnesis/components/anamnesis-detail-cards/anamnesis-detail-cards.component';
import { LababoratoryTestTableComponent } from '@app/laboratory-test/components/lababoratory-test-table/lababoratory-test-table.component';
import { PrescriptionTableComponent } from '@app/prescription/components/prescription-table/prescription-table.component';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { Visit } from '@app/visit/interfaces/visit.interface';
import { VisitService } from '@app/visit/services/visit.service';
import { combineLatest, map, switchMap } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        switchMap(({ id, activeTab }) =>
          this.visitService
            .getById(id)
            .pipe(map((visit) => ({ visit, activeTab }))),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ visit, activeTab }) => {
        this.visit.set(visit);
        this.updateActiveTab(activeTab);
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

  navigateToNewAnamnesis(): void {
    const patientId = this.route.parent?.snapshot.paramMap.get('patientId');
    this.router.navigate(['/patient', patientId, 'anamnesis', 'new'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }
}
