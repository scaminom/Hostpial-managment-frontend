import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface DropDown {
  name: string;
  code: string;
}

import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../interfaces/patient.interface';
import camelcaseKeys from 'camelcase-keys';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    AutoCompleteModule,
    CommonModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  templateUrl: './patient-form.component.html',
})
export class PatientFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private patientService = inject(PatientService);
  patientForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.patientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      insuranceNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      bloodType: ['', Validators.required],
      allergies: ['', Validators.required],
    });
  }

  dropdownItems: DropDown[] = [
    { name: 'Male', code: 'M' },
    { name: 'Female', code: 'F' },
  ];

  onSendForm(): void {
    // if (this.patientForm.valid) {
    const patientData: Patient = {
      ...this.patientForm.value,
      gender: this.patientForm.get('gender')?.value?.code,
    };
    this.patientService.createPatient({ patient: patientData }).subscribe();
    // }
  }
}
