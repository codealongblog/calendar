import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddEventDialogComponent } from './add.event.dialog/add.event.dialog';
import { UserService } from 'src/app/services/user.service';
import { CalendarEventService, CalendarEvent } from 'src/app/services/calendar.event.service';
import { BaseComponent } from '../base.component';
import { Router } from '@angular/router';
@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent extends BaseComponent implements OnInit {

  public days: Array<any>;
  public month: moment.Moment;
  public today: moment.Moment;

  constructor (private matDialog: MatDialog, private userService: UserService, private calendarEventService: CalendarEventService, private router: Router) {
    super();
  }

  ngOnInit () {
    this.today = moment().startOf('day');
    this.month = moment().startOf('month');
    this.fetchEvents();
  }

  private calculateDays (eventMap: Map<string, Array<CalendarEvent>>) : void {
    const dayOfFirstDay: number = this.month.day();
    const daysInMonth: number = this.month.daysInMonth();

    const dayToAdd: moment.Moment = moment(this.month).startOf('day');
    dayToAdd.add(-( dayOfFirstDay + 1), 'days');

    this.days = [];
    for (let i = 0; i < 42; i ++) {
      const date: moment.Moment = moment(dayToAdd.add(1, 'days'));
      const calendarEvents: Array<CalendarEvent> = eventMap.get(date.startOf('day').format('YYYY-MM-DD'));
      const day: any = { date: date, calendarEvents: calendarEvents };
      this.days.push(day);
    }
  }

  public fetchEvents () : void {
    const startDate: moment.Moment = moment(this.month).startOf('month').subtract(10, 'days');
    const endDate: moment.Moment = moment(this.month).endOf('month').add(10, 'days');

    this.cleanup.push(this.calendarEventService.search(this.userService.cachedUser._id, startDate, endDate).subscribe((calendarEvents: Array<CalendarEvent>) => {
      const eventMap: Map<string, Array<CalendarEvent>> = new Map();
      for (const calendarEvent of calendarEvents) {
        const date: moment.Moment = moment(calendarEvent.startDate).startOf('day');
        const digs: Array<CalendarEvent> = eventMap.get(date.format('YYYY-MM-DD')) || [];
        digs.push(calendarEvent);
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
    const ref: MatDialogRef<AddEventDialogComponent> = this.matDialog.open(AddEventDialogComponent, { data: { calendarEvent: { startDate: moment(date), endDate: moment(date) } } });
    this.cleanup.push(ref.afterClosed().subscribe(() => {
      this.fetchEvents();
    }));
  }

  public clickEvent (event: Event, calendarEventToEdit: CalendarEvent) : void {
    event.stopPropagation();
    event.preventDefault();
    this.router.navigate([`/view/${calendarEventToEdit._id}`]);
  }

}
