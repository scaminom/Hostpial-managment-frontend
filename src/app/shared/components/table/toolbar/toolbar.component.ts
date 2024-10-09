import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToolbarButton } from '@app/shared/interfaces/tool-bar-button.interface';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterLink, ButtonModule, ToolbarModule],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  buttons = input.required<ToolbarButton[]>();
  style = input<string>('mb-4');
}
