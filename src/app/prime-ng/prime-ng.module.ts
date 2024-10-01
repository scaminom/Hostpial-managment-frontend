import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [
    AutoCompleteModule,
    CalendarModule,
    CommonModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    RippleModule,
    ToolbarModule,
    TableModule,
  ],
  exports: [
    AutoCompleteModule,
    CalendarModule,
    CommonModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    RippleModule,
    ToolbarModule,
    TableModule,
  ],
})
export class PrimeNGModule {}
