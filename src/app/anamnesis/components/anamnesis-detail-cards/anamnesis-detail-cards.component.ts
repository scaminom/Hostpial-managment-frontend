import { Component, input } from '@angular/core';
import { Anamnesis } from '@app/anamnesis/interfaces/anamnese.interface';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';

@Component({
  selector: 'anamnesis-detail-cards',
  standalone: true,
  imports: [PrimeNGModule],
  templateUrl: './anamnesis-detail-cards.component.html',
})
export class AnamnesisDetailCardsComponent {
  anamnesis = input.required<Anamnesis>();
}
