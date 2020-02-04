import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'time-selector',
    templateUrl: './time.selector.html',
    styleUrls: ['./time.selector.css']
})

class TimeSelectorComponent {
    public hours: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    public minutes: Array<number> = Array.from(Array(60).keys());

    @Input() public date: moment.Moment;

    public changeTime (value: string, type: string) {
    switch (type) {
        case 'hour':
        case 'minute':
            this.date.set(type, Number(value));
            break;
        case 'ampm':
            const currentHour: number = this.date.get('hour');
            const currentAmpm: string = currentHour < 12 ? 'AM' : 'PM';
            if (value !== currentAmpm) {
                this.date.set('hour', currentHour + (value === 'AM' ? -12 : 12));
            }
            break;
    }
    }

}

export { TimeSelectorComponent };
