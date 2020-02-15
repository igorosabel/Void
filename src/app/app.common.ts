/*
 * Páginas
 */
import { LoginComponent }    from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent }     from './pages/home/home.component';
import { NavigateComponent } from './pages/navigate/navigate.component';
import { ShipComponent }     from './pages/ship/ship.component';
import { MessagesComponent } from './pages/messages/messages.component';

export const PAGES: any[] = [
	LoginComponent,
	RegisterComponent,
	HomeComponent,
	NavigateComponent,
	ShipComponent,
	MessagesComponent
];

/*
 * Componentes
 */
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent }   from './components/dialogs/alert-dialog/alert-dialog.component';
import { FormDialogComponent }    from './components/dialogs/form-dialog/form-dialog.component';
import { HeaderComponent }        from './components/header/header.component';
import { HomeShopComponent }      from './components/home-shop/home-shop.component';
import { StarSystemComponent }    from './components/star-system/star-system.component';

export const COMPONENTS: any[] = [
	ConfirmDialogComponent,
	AlertDialogComponent,
	FormDialogComponent,
	HeaderComponent,
	HomeShopComponent,
	StarSystemComponent
];

/*
 * Pipes
 */
import { UrldecodePipe }  from './pipes/urldecode.pipe';
import { TimeFormatPipe } from './pipes/time-format.pipe';

export const PIPES: any[] = [
	UrldecodePipe,
	TimeFormatPipe
];

/*
 * Servicios
 */
import { CommonService }      from './services/common.service';
import { ApiService }         from './services/api.service';
import { DataShareService }   from './services/data-share.service';
import { DialogService }      from './services/dialog.service';
import { UserService }        from './services/user.service';
import { AuthService }        from './services/auth.service';
import { ClassMapperService } from './services/class-mapper.service';

export const SERVICES: any[] = [
	CommonService,
	ApiService,
	DataShareService,
	DialogService,
	UserService,
	AuthService,
	ClassMapperService
];

/*
 * Componentes Angular Material
 */
import { MatToolbarModule }   from '@angular/material/toolbar';
import { MatCardModule }      from '@angular/material/card';
import { MatButtonModule }    from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatIconModule }      from '@angular/material/icon';
import { MatListModule }      from '@angular/material/list';
import { MatDialogModule }    from '@angular/material/dialog';
import { MatRadioModule }     from '@angular/material/radio';
import { MatTabsModule }      from '@angular/material/tabs';

export const MATERIAL: any[] = [
	MatToolbarModule,
	MatCardModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatIconModule,
	MatListModule,
	MatDialogModule,
	MatRadioModule,
	MatTabsModule
];