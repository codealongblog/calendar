import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public days: Array<any>;
  public month: moment.Moment;
  public today: moment.Moment;

  constructor () { }

  ngOnInit () {
    this.today = moment();
    this.month = moment().startOf('month');
    this.calculateDays();
  }

  private calculateDays () : void {
    const dayOfFirstDay: number = this.month.day();
    const daysInMonth: number = this.month.daysInMonth();

    const dayToAdd: moment.Moment = moment(this.month);
    dayToAdd.add(-( dayOfFirstDay + 1), 'days');

    this.days = [];
    for (let i = 0; i < 42; i ++) {
      this.days.push({ date: moment(dayToAdd.add(1, 'days')) });
    }
  }

  public prevMonth () : void {
    this.month.add(-1, 'month');
    this.calculateDays();
    console.log('previous');
  }

  public nextMonth () : void {
    this.month.add(1, 'month');
    this.calculateDays();
    console.log('next');
  }

}
