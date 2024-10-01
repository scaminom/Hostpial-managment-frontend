import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageWrapedService } from '../services/message-wraped.service';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageWrapedService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        errorMsg = `Error: ${error.error.message}`;
      } else {
        errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
      }

      const errorDetails =
        error.error && error.error.errors
          ? error.error.errors.join('\n')
          : 'Unknown error';

      messageService.handleError(errorMsg, errorDetails);
      return throwError(() => ({
        message: errorMsg,
        errors:
          error.error && error.error.errors
            ? error.error.errors
            : ['Unknown error'],
      }));
    }),
  );
};
