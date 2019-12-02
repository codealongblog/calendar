import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BaseComponent } from '../base.component';
@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})

class LoginComponent extends BaseComponent implements OnInit, AfterContentInit {
    public name: string;
    public invalidUserName: boolean;
    @ViewChild('nameInput') public nameInput: ElementRef;

    constructor (private userService: UserService) {
        super();
    }

    public ngOnInit () : void {
        console.log('I GOT TO LOGIN');
    }

    public ngAfterContentInit () : void {
        this.nameInput.nativeElement.focus();
    }

    public login (): void {
        this.cleanup.push(this.userService.loginUser(this.name).subscribe(() => {
            this.name = '';
            this.invalidUserName = false;
        }, () => {
            this.invalidUserName = true;
        }));
    }

    public logout () : void {
        this.userService.logout();
    }
}

export { LoginComponent };
