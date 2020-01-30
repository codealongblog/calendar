import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface User {
    _id: string;
    name: string;
}

@Injectable()
class UserService {
    private _cachedUser: User;
    public onLogin: Subject<User>;
    public onLogout: Subject<void>;

    public get cachedUser () : User {
        return this._cachedUser;
    }

    constructor (private httpClient: HttpClient, private router: Router) {
        this.onLogin = new Subject();
        this.onLogout = new Subject();
    }

    public isAuthenticated (): boolean {
        const userString = localStorage.getItem('user');
        if (userString) {
            this._cachedUser = JSON.parse(userString);
            this.onLogin.next(this._cachedUser);
        }
        return !!this.cachedUser;
    }

    public loginUser (userName: string) : Observable<any> {
        return this.search(userName).pipe(map((user: any) => {
            this.postLogin(user);
        }));
    }

    public signUp (userName: string) : Observable<any> {
        return this.create(userName).pipe(map((user: any) => {
            this.postLogin(user);
        }));
    }

    protected postLogin (user: any) : void {
        localStorage.setItem('user', JSON.stringify(user));
        this._cachedUser = user;
        this.onLogin.next(user);
        this.router.navigate(['dashboard']);
    }

    public logout () : void {
        localStorage.removeItem('user');
        this._cachedUser = null;
        this.onLogout.next();
        this.router.navigate(['']);
    }

    public create (userName: string): Observable<User> {
        return this.httpClient.post<User>('http://localhost:8080/users/', { name: userName });
    }

    public search (userName: string): Observable<User> {
        return this.httpClient.get<User>(`http://localhost:8080/users?userName=${userName}`);
    }

}

export { UserService, User };
