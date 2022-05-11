import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse
} from '@angular/common/http';
import { UserService }            from 'src/app/services/user.service';
import { Observable, throwError } from 'rxjs';
import { catchError }             from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(public us: UserService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let token: string = '';
		if (this.us.user && this.us.user.token) {
			token = this.us.user.token;
		}
		request = request.clone({
			setHeaders: {
				Authorization: token
			}
		});
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				let errorMessage = '';
				if (error.error instanceof ErrorEvent) {
					// client-side error
					errorMessage = `Error: ${error.error.message}`;
				} else {
					// server-side error
					errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
				}
				return throwError(errorMessage);
			})
		);
	}
}
