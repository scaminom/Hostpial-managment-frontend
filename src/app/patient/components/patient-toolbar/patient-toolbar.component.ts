import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-patient-toolbar',
  standalone: true,
  imports: [RouterLink, ButtonModule, ToolbarModule],
  templateUrl: './patient-toolbar.component.html',
})
export class PatientToolbarComponent {
  hasSelectedPatients = input<boolean>(false);
  deleteSelectedEvent = output<void>();

  deleteSelected() {
    this.deleteSelectedEvent.emit();
  }
}
