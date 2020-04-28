import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

class UserLoadGuardService implements CanActivate {
	constructor ( private userService: UserService ) {}

	public canActivate () : Observable<boolean> {
		if (this.userService.isAuthenticating) {
			return this.userService.doneAuthenticating.pipe(map(() => {
				return true;
			}));
		} else {
			return of(true);
		}
	}
}

export { UserLoadGuardService };
