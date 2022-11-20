import { registerLocaleData } from "@angular/common";
import { LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "src/app/app-routing.module";
import { AppComponent } from "src/app/app.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  MatFormFieldDefaultOptions,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from "@angular/material/form-field";
import { TokenInterceptor } from "src/app/interceptors/token.interceptor";

import {
  COMPONENTS,
  MATERIAL,
  PAGES,
  PIPES,
  SERVICES,
} from "src/app/app.common";

const appearance: MatFormFieldDefaultOptions = {
  appearance: "outline",
};

import localeEs from "@angular/common/locales/es";
registerLocaleData(localeEs);

@NgModule({
  declarations: [AppComponent, ...PAGES, ...COMPONENTS, ...PIPES],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ...MATERIAL,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "es-ES",
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance,
    },
    ...SERVICES,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
