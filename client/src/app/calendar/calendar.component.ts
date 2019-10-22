import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public days: Array<number>;

  constructor() { }

  ngOnInit() {
    const today = new Date();
    const dayOfFirstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    this.days = [];
    for (let i = 0; i < dayOfFirstDay; i ++) {
      this.days.push(undefined);
    }
    for (let i = 1; i < daysInMonth + 1; i ++) {
      this.days.push(i);
    }
    for (let i = 0; i < (7 - (daysInMonth + dayOfFirstDay) % 7); i ++) {
      this.days.push(undefined);
    }
  }

}
