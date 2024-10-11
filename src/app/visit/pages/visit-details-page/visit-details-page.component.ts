import { Component, OnInit, inject, signal } from '@angular/core';
import { VisitTopHeaderComponent } from '@app/visit/components/visit-top-header/visit-top-header.component';
import { Visit } from '@app/visit/interfaces/visit.interface';
import { VisitService } from '@app/visit/services/visit.service';

@Component({
  selector: 'app-visit-details-page',
  standalone: true,
  imports: [VisitTopHeaderComponent],
  templateUrl: './visit-details-page.component.html',
})
export class VisitDetailsPageComponent implements OnInit {
  visit!: Visit;

  private visitService = inject(VisitService);
  isLoading = signal(true);

  ngOnInit(): void {
    this.visitService.getVisitById(9).subscribe((visit) => {
      console.log(visit);
      this.visit = visit;
      this.isLoading.set(false);
    });
  }
}
