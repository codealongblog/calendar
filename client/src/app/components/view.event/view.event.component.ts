import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { CalendarEventService, CalendarEvent } from 'src/app/services/calendar.event.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'view-event',
	templateUrl: './view.event.component.html',
	styleUrls: ['./view.event.component.css']
})

class ViewEventComponent extends BaseComponent implements OnInit {

	private id: string;
	public calendarEvent: CalendarEvent;
	public isOwner: boolean;
	public confirmingDelete: boolean;

	constructor (private calendarEventService: CalendarEventService, private route: ActivatedRoute, private userService: UserService, private router: Router) {
		super();
		this.route.params.subscribe((params: Params) => {
			this.id = params.id;
		});
	}

	public ngOnInit () : void {
		this.cleanup.push(this.calendarEventService.get(this.id).subscribe((calendarEvent: CalendarEvent) => {
			this.calendarEvent = calendarEvent;
			this.isOwner = this.userService.cachedUser ? this.userService.cachedUser._id === this.calendarEvent.ownerUserId : false;
		}));
	}

	public saveEvent () : void {
		this.cleanup.push(this.calendarEventService.update(this.calendarEvent).subscribe((updated: CalendarEvent) => {
			this.calendarEvent = updated;
		}));
	}

	public initiateDelete () : void {
		this.confirmingDelete = true;
	}

	public cancelDelete () : void {
		this.confirmingDelete = false;
	}

	public deleteEvent () : void {
		this.cleanup.push(this.calendarEventService.delete(this.calendarEvent).subscribe(() => {
			this.router.navigate(['/dashboard']);
		}));
	}

	public back () : void {
		this.router.navigate(['/dashboard']);
	}
}

export { ViewEventComponent };
