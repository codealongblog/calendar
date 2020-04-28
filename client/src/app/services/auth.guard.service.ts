import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()

class AuthGuardService implements CanActivate {
	constructor ( private userService: UserService ) {}

	public canActivate () : boolean {
		return this.userService.isAuthenticated();
	}
}

export { AuthGuardService };
