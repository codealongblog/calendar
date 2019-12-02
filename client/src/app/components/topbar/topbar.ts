import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.html',
    styleUrls: ['./topbar.css']
})

class TopbarComponent extends BaseComponent implements OnInit {
    public userName: string;

    constructor (private userService: UserService) {
        super();
        this.userService.onLogin.subscribe(() => {
            this.userName = this.userService.cachedUser.name;
        });
    }

    public ngOnInit (): void {
        if (this.userService.isAuthenticated()) {
            this.userName = this.userService.cachedUser.name;
        }
    }
}

export { TopbarComponent };
