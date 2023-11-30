import { Provider } from "@angular/core";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { ApiService } from "src/app/services/api.service";
import { AuthService } from "src/app/services/auth.service";
import { ClassMapperService } from "src/app/services/class-mapper.service";
import { DataShareService } from "src/app/services/data-share.service";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";

const appearance: MatFormFieldDefaultOptions = {
  appearance: "outline",
};

export function provideCore(): Provider[] {
  return [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance,
    },
    ApiService,
    DataShareService,
    DialogService,
    UserService,
    AuthService,
    ClassMapperService,
  ];
}
