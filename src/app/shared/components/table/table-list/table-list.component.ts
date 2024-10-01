import { Component, input, output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { Column } from '../../../interfaces/column-table.interface';
import { DynamicPipe } from '../../../pipes/dynamic.pipe';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    RippleModule,
    TableModule,
    DynamicPipe,
  ],
  templateUrl: './table-list.component.html',
  providers: [DatePipe],
})
export class TableListComponent<T> {
  items = input<T[]>([]);
  cols = input<Column[]>([]);
  globalFilterFields = input<string[]>([]);
  dataKey = input<string>('id');
  tableTitle = input<string>('Manage Items');
  editRoute = input<string>('/edit');
  tdWidthBody = input<string>('14%');
  deleteItem = output<T>();

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getNestedPropertyValue(item: any, field: string): any {
    const props = field.split('.');
    return props.reduce((obj, prop) => obj && obj[prop], item);
  }
}
