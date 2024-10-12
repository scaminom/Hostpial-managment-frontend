import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ReactiveValidationModule } from 'angular-reactive-validation';

import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';

import { AuthService } from '../auth.service';
import { LayoutService } from '../../layout/services/app.layout.service';
import { MessageWrapedService } from '@app/shared/services/message-wraped.service';
import { Validators } from 'angular-reactive-validation';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    PrimeNGModule,
    ReactiveValidationModule,
  ],
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  layoutService = inject(LayoutService);

  private messageService = inject(MessageWrapedService);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initForm();
  }

  login(): void {
    if (!this.loginForm.valid) return;
    this.authService
      .login(this.loginForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.messageService.showSuccessMessage('Logged in successfully');
          this.router.navigate(['/']);
        },
      });
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required('Email is required')]],
      password: [
        '',
        [
          Validators.required('Password is required'),
          Validators.minLength(6, 'Password must be at least 6 characters'),
        ],
      ],
    });
  }
}
