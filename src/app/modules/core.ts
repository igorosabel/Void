import { Provider } from '@angular/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import ApiService from '@services/api.service';
import AuthService from '@services/auth.service';
import ClassMapperService from '@services/class-mapper.service';
import DataShareService from '@services/data-share.service';
import UserService from '@services/user.service';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

function provideCore(): Provider[] {
  return [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance,
    },
    ApiService,
    DataShareService,
    UserService,
    AuthService,
    ClassMapperService,
  ];
}
export default provideCore;
