import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import routes from '@app/app.routes';
import provideCore from '@app/core';
import TokenInterceptor from '@interceptors/token-interceptor';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance,
    },
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideHttpClient(withInterceptors([TokenInterceptor])),
    provideCore(),
  ],
};

export default appConfig;
