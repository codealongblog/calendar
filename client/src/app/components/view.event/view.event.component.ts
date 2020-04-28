import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { CalendarEventService, CalendarEvent } from 'src/app/services/calendar.event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'view-event',
	templateUrl: './view.event.component.html',
	styleUrls: ['./view.event.component.css']
})

class ViewEventComponent extends BaseComponent implements OnInit {

	private id: string;
	public calendarEvent: CalendarEvent;

	constructor (private calendarEventService: CalendarEventService, private route: ActivatedRoute, private userService: UserService) {
		super();
		this.route.params.subscribe((params: Params) => {
			this.id = params.id;
		});
	}

	public ngOnInit () : void {
		this.cleanup.push(this.calendarEventService.get(this.id).subscribe((calendarEvent: CalendarEvent) => {
			this.calendarEvent = calendarEvent;
		}));
	}

	public isOwner () : boolean {
		return this.userService.cachedUser._id === this.calendarEvent.ownerUserId;
	}

}

export { ViewEventComponent };
