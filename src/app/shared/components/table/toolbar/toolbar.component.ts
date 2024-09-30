import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterLink, ButtonModule, ToolbarModule],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  newButtonLabel = input<string>('New');
  newItemRoute = input<string[]>(['/']);
}
