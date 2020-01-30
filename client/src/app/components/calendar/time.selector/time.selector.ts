import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'time-selector',
    templateUrl: './time.selector.html',
    styleUrls: ['./time.selector.css']
})

class TimeSelectorComponent implements OnInit {
    public hours: Array<number> = [];
    public minutes: Array<number> = [];

    public startHour: number;
    public startMinute: number;
    public startAmpm: string;

    public endHour: number;
    public endMinute: number;
    public endAmpm: string;
    @Input() public date: moment.Moment;

    public ngOnInit () {
        for (let i = 1; i < 13; i++) {
            this.hours.push(i);
        }
        for (let i = 1; i < 60; i++) {
            this.minutes.push(i);
        }
    }

}

export { TimeSelectorComponent };
