import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SwiperConfigInterface, SwiperComponent } from 'ngx-swiper-wrapper';

@Component({
    selector: 'time-selector',
    templateUrl: './time.selector.html',
    styleUrls: ['./time.selector.css']
})

class TimeSelectorComponent implements OnInit {
    public hours: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    public minutes: Array<number> = Array.from(Array(60).keys());

    public config: SwiperConfigInterface;

    @Input() public date: moment.Moment;

    public ngOnInit () : void {
        this.config = {
            direction: 'vertical',
            slidesPerView: 3,
            centeredSlides: true,
            keyboard: true,
            grabCursor: true,
            mousewheel: true,
            scrollbar: false,


            // effect: 'coverflow',
            // coverflowEffect: {
            //   rotate: 50,
            //   stretch: 0,
            //   depth: 10,
            //   modifier: 1,
            //   slideShadows : false,
            // },

        };
        console.log(`HOUR: ${this.date.format('h')}` );
        console.log(`MINUTE: ${this.date.format('m')}` );
        console.log(`AMPM: ${Number(this.date.format('HH')) < 12 ? 'AM' : 'PM'}` );

    }

    public changeTime (index: number, type: string) {
    switch (type) {
        case 'hour':
            this.date.set(type, this.hours[index]);
            break;
        case 'minute':
            this.date.set(type, this.minutes[index]);
            break;
        case 'ampm':
            const currentHour: number = this.date.get('hour');
            const currentAmpm: number = currentHour < 12 ? 0 : 1;
            if (index !== currentAmpm) {
                this.date.set('hour', currentHour + (index === 0 ? -12 : 12));
            }
            break;
    }
    }

}

export { TimeSelectorComponent };
