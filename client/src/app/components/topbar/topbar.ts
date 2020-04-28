import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { UserService, User } from 'src/app/services/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.html',
    styleUrls: ['./topbar.css']
})

class TopbarComponent extends BaseComponent implements OnInit {
    public user: User;

    constructor (private userService: UserService, private firebaseService: FirebaseService, private router: Router) {
        super();
        this.userService.onLogin.subscribe(() => {
            this.user = this.userService.cachedUser;
        });
        this.userService.onLogout.subscribe(() => {
            this.user = null;
        });
    }

    public ngOnInit (): void {
        if (this.userService.isAuthenticated()) {
            this.user = this.userService.cachedUser;
        }
    }

    public logout () : void {
        this.firebaseService.signout().subscribe();
    }

    public login () : void {
        this.cleanup.push(this.firebaseService.authenticate().subscribe());
    }

    public clickPhoto () : void {
        this.router.navigate(['/dashboard']);
    }
}

export { TopbarComponent };
