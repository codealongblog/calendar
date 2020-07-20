import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  constructor (private userService: UserService, private router: Router) { }

  ngOnInit () {
    if (this.userService.isAuthenticated()) {
      this.router.navigate(['dashboard']);
    }
  }

}
