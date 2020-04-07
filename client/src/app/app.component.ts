import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { BaseComponent } from './components/base.component';
import { UserService, User } from './services/user.service';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent extends BaseComponent implements OnInit {
  title = 'client';

  constructor (private firebaseService: FirebaseService, private userService: UserService) {
    super();
    this.firebaseService.init();
  }

  public ngOnInit () : void {

    this.cleanup.push(this.firebaseService.firebaseUserLoaded.pipe(mergeMap((user: firebase.User) => {
      return this.userService.loginUser(user);
    })).subscribe());

    this.cleanup.push(this.firebaseService.firebaseUserUnLoaded.pipe(map(() => {
      this.userService.logout();
    })).subscribe());

  }

}
