import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

interface User {
    name: string;
}

@Injectable()
class UserService {
    private _cachedUser: User;
    public onLogin: Subject<User>;

    public get cachedUser () : User {
        return this._cachedUser;
    }

    constructor (private httpClient: HttpClient) {
        this.onLogin = new Subject();
    }

    public isAuthenticated (): boolean {
        const userString = localStorage.getItem('user');
        if (userString) {
            this._cachedUser = JSON.parse(userString);
            this.onLogin.next(this._cachedUser);
        }
        return !!this.cachedUser;
    }

    public create (userName: string): Observable<User> {
        return this.httpClient.post<User>('http://localhost:8080/users/', { name: userName });
    }
    public search (userName: string): Observable<User> {
        return this.httpClient.get<User>(`http://localhost:8080/users?userName=${userName}`);
    }

}

export { UserService, User };
