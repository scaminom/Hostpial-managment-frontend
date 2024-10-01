import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';

@Component({
  selector: 'app-patient-toolbar',
  standalone: true,
  imports: [RouterLink, PrimeNGModule],
  templateUrl: './patient-toolbar.component.html',
})
export class PatientToolbarComponent {}
