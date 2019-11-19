import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
    name: string;
}

@Injectable()
class UserService {

    constructor (private httpClient: HttpClient) {}

    public createUser (userName: string): Observable<User> {
        return this.httpClient.post<User>('http://localhost:8080/users/', { name: userName });
    }

}

export { UserService, User };
