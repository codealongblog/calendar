import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { User } from './user.service';

interface CalendarEvent {
    _id?: string;
    name?: string;
    ownerUserId?: string;
    description?: string;
    startDate?: moment.Moment;
    endDate?: moment.Moment;
    owner?: Partial<User>;
}

@Injectable()
class CalendarEventService {

    constructor (private httpClient: HttpClient) {}

    public create (calendarEvent: CalendarEvent): Observable<CalendarEvent> {
        return this.httpClient.post<CalendarEvent>(`http://localhost:8080/calendarEvents`, calendarEvent).pipe(map(this.convertCalendarEvent));
    }

    public update (calendarEvent: CalendarEvent): Observable<CalendarEvent> {
        return this.httpClient.put<CalendarEvent>(`http://localhost:8080/calendarEvents/${calendarEvent._id}`, calendarEvent).pipe(map(this.convertCalendarEvent));
    }

    public delete (calendarEvent: CalendarEvent): Observable<any> {
        return this.httpClient.delete(`http://localhost:8080/calendarEvents/${calendarEvent._id}`);
    }

    public get (id: string) : Observable<CalendarEvent> {
        return this.httpClient.get(`http://localhost:8080/calendarEvents/${id}`).pipe(map(this.convertCalendarEvent));
    }

    public search (ownerUserId: string, startDate: moment.Moment, endDate: moment.Moment) : Observable<any> {
        return this.httpClient.get(`http://localhost:8080/calendarEvents?ownerUserId=${ownerUserId}&startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}`).pipe(map(this.convertCalendarEvents.bind(this)));
    }

    private convertCalendarEvent (result: CalendarEvent) : CalendarEvent {
        result.startDate = moment(result.startDate);
        result.endDate = moment(result.endDate);
        return result;
    }

    private convertCalendarEvents (results: Array<CalendarEvent>) : Array<CalendarEvent> {
        return results.map((calendarEvent: CalendarEvent) => {
            return this.convertCalendarEvent(calendarEvent);
        });
    }

}

export { CalendarEventService, CalendarEvent };
