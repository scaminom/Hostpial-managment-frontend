import { Component, output } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-record',
  standalone: true,
  imports: [InputTextModule],
  templateUrl: './search-record.component.html',
  styles: ``,
})
export class SearchRecordComponent {
  search = output<string>();

  onSearch(event: Event) {
    this.search.emit((event.target as HTMLInputElement).value);
  }
}
