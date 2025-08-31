import { Provider } from '@angular/core';
import AuthService from '@services/auth.service';

function provideCore(): Provider[] {
  return [AuthService];
}
export default provideCore;
