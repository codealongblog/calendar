import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent, CalendarEventService } from 'src/app/services/calendar.event.service';
import { BaseComponent } from '../../base.component';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

interface AddEventData {
    calendarEvent: CalendarEvent;
}

@Component({
    selector: 'add-event-dialog',
    templateUrl: './add.event.dialog.html',
    styleUrls: ['./add.event.dialog.css']
})

class AddEventDialogComponent extends BaseComponent implements OnInit {
    public calendarEvent: CalendarEvent;
    public addOrEdit: string = 'Add';
    public confirmingDelete: boolean;

    constructor (private dialogRef: MatDialogRef<AddEventDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: AddEventData, private userService: UserService, private calendarEventService: CalendarEventService) {
        super();
    }

    public ngOnInit () {
        this.calendarEvent = Object.assign({  }, this.data.calendarEvent);
        if (this.calendarEvent._id) {
            this.addOrEdit = 'Edit';
        }
        if (!this.calendarEvent.userId) {
            this.calendarEvent.userId = this.userService.cachedUser._id;
        }
    }

    public saveEvent () : void {
        let obs: Observable<any>;
        if (this.calendarEvent._id) {
            obs = this.calendarEventService.update(this.calendarEvent);
        } else {
            obs = this.calendarEventService.create(this.calendarEvent);
        }
        this.cleanup.push(obs.subscribe(() => {
            this.dialogRef.close();
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
            this.dialogRef.close();
        }));
    }
}


export { AddEventDialogComponent, AddEventData};
