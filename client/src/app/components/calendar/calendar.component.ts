import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from './add.event.dialog/add.event.dialog';
import { UserService } from 'src/app/services/user.service';
import { ShindigService, Shindig } from 'src/app/services/shindig.service';
import { BaseComponent } from '../base.component';
@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent extends BaseComponent implements OnInit {

  public days: Array<any>;
  public month: moment.Moment;
  public today: moment.Moment;

  constructor (private matDialog: MatDialog, private userService: UserService, private shindigService: ShindigService) {
    super();
  }

  ngOnInit () {
    this.today = moment().startOf('day');
    this.month = moment().startOf('month');
    this.fetchEvents();
  }

  private calculateDays (eventMap: Map<string, Array<Shindig>>) : void {
    const dayOfFirstDay: number = this.month.day();
    const daysInMonth: number = this.month.daysInMonth();

    const dayToAdd: moment.Moment = moment(this.month).startOf('day');
    dayToAdd.add(-( dayOfFirstDay + 1), 'days');

    this.days = [];
    for (let i = 0; i < 42; i ++) {
      const date: moment.Moment = moment(dayToAdd.add(1, 'days'));
      const shindigs: Array<Shindig> = eventMap.get(date.startOf('day').format('YYYY-MM-DD'));
      const day: any = { date: date, shindigs: shindigs };
      this.days.push(day);
    }
  }

  public fetchEvents () : void {
    const startDate: moment.Moment = moment(this.month).startOf('month').subtract(10, 'days');
    const endDate: moment.Moment = moment(this.month).endOf('month').add(10, 'days');

    this.cleanup.push(this.shindigService.search(this.userService.cachedUser._id, startDate, endDate).subscribe((shindigs: Array<Shindig>) => {
      const eventMap: Map<string, Array<Shindig>> = new Map();
      for (const shindig of shindigs) {
        const date: moment.Moment = moment(shindig.startDate).startOf('day');
        const digs: Array<Shindig> = eventMap.get(date.format('YYYY-MM-DD')) || [];
        digs.push(shindig);
        eventMap.set(date.format('YYYY-MM-DD'), digs);
      }
      this.calculateDays(eventMap);
    }));
  }

  public prevMonth () : void {
    this.month.add(-1, 'month');
    this.fetchEvents();
    console.log('previous');
  }

  public nextMonth () : void {
    this.month.add(1, 'month');
    this.fetchEvents();
    console.log('next');
  }

  public clickDay (date: moment.Moment) : void {
    this.matDialog.open(AddEventDialogComponent, { data: { date } });
  }

}
