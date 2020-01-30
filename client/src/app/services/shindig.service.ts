import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moment } from 'moment';

interface Shindig {
    name: string;
    userId: string;
    description: string;
    startDate: Moment;
    endDate: Moment;
}

@Injectable()
class ShindigService {

    constructor (private httpClient: HttpClient) {}

    public create (shindig: Shindig): Observable<Shindig> {
        return this.httpClient.post<Shindig>(`http://localhost:8080/shindigs`, shindig);
    }

    public search (userId: string, startDate: Moment, endDate: Moment) : Observable<any> {
        return this.httpClient.get(`http://localhost:8080/shindigs?userId=${userId}&startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}`);
    }

}

export { ShindigService, Shindig };
