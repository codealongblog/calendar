import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BaseComponent } from '../base.component';
@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})

class LoginComponent extends BaseComponent implements OnInit  {
    public name: string;

    constructor (private userService: UserService) {
        super();
    }

    ngOnInit () {
        console.log('I GOT TO LOGIN');
    }

    public login (): void {
        this.cleanup.push(this.userService.createUser(this.name).subscribe());
        console.log(`i'm submitting: ${this.name}`);
    }
}

export { LoginComponent };
