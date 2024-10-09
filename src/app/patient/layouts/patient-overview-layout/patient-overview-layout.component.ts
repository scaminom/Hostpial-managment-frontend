import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-overview-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './patient-overview-layout.component.html',
})
export class PatientOverviewLayoutComponent {}
