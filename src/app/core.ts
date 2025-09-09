import { Provider } from '@angular/core';
import AuthService from '@services/auth-service';
import UserService from '@services/user-service';

function provideCore(): Provider[] {
  return [AuthService, UserService];
}
export default provideCore;
