import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ShindigService } from 'src/app/services/shindig.service';
import { BaseComponent } from '../../base.component';
import { UserService } from 'src/app/services/user.service';

interface AddEventData {
    date: moment.Moment;
}

@Component({
    selector: 'add-event-dialog',
    templateUrl: './add.event.dialog.html',
    styleUrls: ['./add.event.dialog.css']
})

class AddEventDialogComponent extends BaseComponent implements OnInit {
    public name: string;
    public description: string;
    public hours: Array<number> = [];
    public minutes: Array<number> = [];

    public startHour: number;
    public startMinute: number;
    public startAmpm: string;

    public endHour: number;
    public endMinute: number;
    public endAmpm: string;

    constructor (public dialogRef: MatDialogRef<AddEventDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AddEventData, public shindigService: ShindigService, public userService: UserService) {
        super();
    }

    public ngOnInit () {
        this.name = '';
        this.description = '';
        for (let i = 1; i < 13; i++) {
            this.hours.push(i);
        }
        for (let i = 1; i < 60; i++) {
            this.minutes.push(i);
        }
    }

    public saveEvent () : void {

        const startDate: moment.Moment = moment(this.data.date);
        startDate.add(this.startHour, 'hours');
        if (this.startAmpm === 'PM') {
            startDate.add(12, 'hours');
        }
        startDate.add(this.startMinute, 'minutes');

        const endDate: moment.Moment = moment(this.data.date);
        endDate.add(this.endHour, 'hours');
        if (this.endAmpm === 'PM') {
            endDate.add(12, 'hours');
        }
        endDate.add(this.endMinute, 'minutes');

        this.cleanup.push(this.shindigService.create({
            name: this.name,
            userId: this.userService.cachedUser._id,
            description: this.description,
            startDate: startDate,
            endDate: endDate
        }).subscribe());

    }
}


export { AddEventDialogComponent, AddEventData};
