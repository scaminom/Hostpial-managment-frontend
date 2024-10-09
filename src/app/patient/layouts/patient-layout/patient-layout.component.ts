import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './patient-layout.component.html',
})
export class PatientLayoutComponent {}
