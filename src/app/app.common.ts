/*
 * Páginas
 */
import { LoginComponent }    from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { HomeComponent }     from 'src/app/pages/home/home.component';
import { NavigateComponent } from 'src/app/pages/navigate/navigate.component';
import { ShipComponent }     from 'src/app/pages/ship/ship.component';
import { MessagesComponent } from 'src/app/pages/messages/messages.component';

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
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent }   from 'src/app/components/dialogs/alert-dialog/alert-dialog.component';
import { FormDialogComponent }    from 'src/app/components/dialogs/form-dialog/form-dialog.component';
import { HeaderComponent }        from 'src/app/components/header/header.component';
import { HomeShopComponent }      from 'src/app/components/home-shop/home-shop.component';
import { StarSystemComponent }    from 'src/app/components/star-system/star-system.component';
import { JobComponent }           from 'src/app/components/job/job.component';

export const COMPONENTS: any[] = [
	ConfirmDialogComponent,
	AlertDialogComponent,
	FormDialogComponent,
	HeaderComponent,
	HomeShopComponent,
	StarSystemComponent,
	JobComponent
];

/*
 * Pipes
 */
import { UrldecodePipe }  from 'src/app/pipes/urldecode.pipe';
import { TimeFormatPipe } from 'src/app/pipes/time-format.pipe';

export const PIPES: any[] = [
	UrldecodePipe,
	TimeFormatPipe
];

/*
 * Servicios
 */
import { CommonService }      from 'src/app/services/common.service';
import { ApiService }         from 'src/app/services/api.service';
import { DataShareService }   from 'src/app/services/data-share.service';
import { DialogService }      from 'src/app/services/dialog.service';
import { UserService }        from 'src/app/services/user.service';
import { AuthService }        from 'src/app/services/auth.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';

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