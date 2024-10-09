import { Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { DynamicPipe } from '@shared/pipes/dynamic.pipe';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { TableActionButton } from '@shared/interfaces/action-button.interface';
import { TableColumn } from '@shared/interfaces/column-table.interface';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PrimeNGModule, DynamicPipe],
  templateUrl: './table-list.component.html',
  providers: [DatePipe],
})
export class TableListComponent<T> {
  tableData = input.required<T[]>();
  tableColumns = input.required<TableColumn[]>();
  searchableFields = input<string[]>([]);
  uniqueIdentifier = input<string>('id');
  tableName = input<string>('Manage Items');
  cellWidth = input<string>('14%');
  rowActions = input.required<TableActionButton[]>();

  applyGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getNestedPropertyValue(item: any, propertyPath: string): any {
    const properties = propertyPath.split('.');
    return properties.reduce((obj, prop) => obj && obj[prop], item);
  }
}
