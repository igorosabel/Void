import { Provider } from '@angular/core';
import AuthService from '@services/auth-service';
import GameService from '@services/game-service';
import UserService from '@services/user-service';

function provideCore(): Provider[] {
  return [AuthService, GameService, UserService];
}
export default provideCore;
