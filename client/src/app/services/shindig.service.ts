import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

interface Shindig {
    _id?: string;
    name?: string;
    userId?: string;
    description?: string;
    startDate?: moment.Moment;
    endDate?: moment.Moment;
}

@Injectable()
class ShindigService {

    constructor (private httpClient: HttpClient) {}

    public create (shindig: Shindig): Observable<Shindig> {
        return this.httpClient.post<Shindig>(`http://localhost:8080/shindigs`, shindig).pipe(map(this.convertShindig));
    }

    public update (shindig: Shindig): Observable<Shindig> {
        return this.httpClient.put<Shindig>(`http://localhost:8080/shindigs/${shindig._id}`, shindig).pipe(map(this.convertShindig));
    }

    public search (userId: string, startDate: moment.Moment, endDate: moment.Moment) : Observable<any> {
        return this.httpClient.get(`http://localhost:8080/shindigs?userId=${userId}&startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}`).pipe(map(this.convertShindigs.bind(this)));
    }

    private convertShindig (result: Shindig) : Shindig {
        result.startDate = moment(result.startDate);
        result.endDate = moment(result.endDate);
        return result;
    }

    private convertShindigs (results: Array<Shindig>) : Array<Shindig> {
        return results.map((shindig: Shindig) => {
            return this.convertShindig(shindig);
        });
    }

}

export { ShindigService, Shindig };
