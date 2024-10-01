import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-doctor-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './doctor-layout.component.html',
})
export class DoctorLayoutComponent {}
