import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SwiperConfigInterface, SwiperComponent } from 'ngx-swiper-wrapper';
import { Observable, of, interval, Subject } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { BaseComponent } from '../../base.component';

@Component({
    selector: 'time-selector',
    templateUrl: './time.selector.html',
    styleUrls: ['./time.selector.css']
})

class TimeSelectorComponent extends BaseComponent implements OnInit {
    public hours: Array<number> = Array.from(Array(24).keys());
    public hourLabels: Array<number> = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    public minutes: Array<number> = Array.from(Array(60).keys());
    public config: SwiperConfigInterface;

    public hourChangeEvent: Subject<any> = new Subject();
    public minuteChangeEvent: Subject<any> = new Subject();
    public ampmChangeEvent: Subject<any> = new Subject();

    @Input() public date: moment.Moment;

    public ngOnInit (): void {

        this.config = {
            direction: 'vertical',
            slidesPerView: 3,
            loop: true,
            centeredSlides: true,
            keyboard: false,
            grabCursor: true,
            mousewheel: true,
            scrollbar: false,
            freeMode: true,
            freeModeSticky: true,
            freeModeMomentum: false
        };

        this.cleanup.push(this.hourChangeEvent.pipe(debounceTime(200)).subscribe((index: number) => {
            console.log('hour');
            this.date.set('hour', this.hours[index]);
        }));
        this.cleanup.push(this.minuteChangeEvent.pipe(debounceTime(200)).subscribe((index: number) => {
            console.log('minute');
            this.date.set('minute', this.minutes[index]);
        }));
    }

    public changeTime (index: number, type: string) {
        switch (type) {
            case 'hour':
                this.hourChangeEvent.next(index);
                break;
            case 'minute':
                this.minuteChangeEvent.next(index);
                break;
        }


    }

}

export { TimeSelectorComponent };

