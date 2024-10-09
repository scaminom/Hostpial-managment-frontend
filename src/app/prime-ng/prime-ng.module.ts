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
import { MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';

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
    MenuModule,
    TagModule,
    ChipModule,
    AccordionModule,
    TabViewModule,
    SplitButtonModule,
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
    MenuModule,
    TagModule,
    ChipModule,
    AccordionModule,
    TabViewModule,
    SplitButtonModule,
  ],
})
export class PrimeNGModule {}
