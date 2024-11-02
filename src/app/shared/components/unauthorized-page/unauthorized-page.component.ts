import { Component } from '@angular/core';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';

@Component({
  selector: 'app-unauthorized-page',
  standalone: true,
  imports: [PrimeNGModule],
  templateUrl: './unauthorized-page.component.html',
  styles: [
    `
      :host ::ng-deep {
        .p-button {
          min-width: 10rem;
        }
      }
    `,
  ],
})
export class UnauthorizedPageComponent {
  goBack() {
    window.history.back();
  }
}
