import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { tokenInterceptor } from './shared/interceptors/token.interceptor';
import { MessageService } from 'primeng/api';
import { httpErrorInterceptor } from './shared/interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([tokenInterceptor, httpErrorInterceptor]),
    ),
    importProvidersFrom(BrowserAnimationsModule),
    CookieService,
    provideAnimations(),
    MessageService,
  ],
};
