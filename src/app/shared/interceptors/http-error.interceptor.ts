import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageWrapedService } from '../services/message-wraped.service';
import { catchError, throwError } from 'rxjs';

const errorHandlers = {
  default: (error: HttpErrorResponse) => ({
    message: `Error Code: ${error.status}, Message: ${error.message}`,
    details: 'Unknown error occurred',
  }),
  clientSide: (error: HttpErrorResponse) => ({
    message: `Error: ${error.error.message}`,
    details: error.error.message,
  }),
  serverSide: (error: HttpErrorResponse) => {
    const errorObj = error.error;
    let details = '';

    if (typeof errorObj === 'string') {
      details = errorObj;
    } else if (Array.isArray(errorObj.errors)) {
      details = errorObj.errors.join('\n');
    } else if (typeof errorObj.errors === 'string') {
      details = errorObj.errors;
    } else if (errorObj.message) {
      details = errorObj.message;
    }

    return {
      message: `Error Code: ${error.status}, Message: ${error.message}`,
      details: details || 'Unknown server error',
    };
  },
};

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageWrapedService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorType =
        error.error instanceof ErrorEvent ? 'clientSide' : 'serverSide';
      const { message, details } = (
        errorHandlers[errorType] || errorHandlers.default
      )(error);

      messageService.handleError(message, details);

      return throwError(() => ({
        message,
        errors: Array.isArray(error.error?.errors)
          ? error.error.errors
          : [details],
      }));
    }),
  );
};
