import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';

@Injectable()

class AuthGuardService implements CanActivate {
	constructor ( private userService: UserService ) {}

	public canActivate () : Observable<boolean> {
		if (this.userService.isAuthenticating) {
			return this.userService.doneAuthenticating;
		} else {
			return of(this.userService.isAuthenticated());
		}
	}
}

export { AuthGuardService };
