import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface User {
    _id?: string;
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
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

    public loginUser (user: User) : Observable<any> {
        return this.get(user).pipe(mergeMap((userResult: User) => {
            if (userResult) {
                this.postLogin(userResult);
                return of(userResult);
            } else {
                return this.signUp(user);
            }
        }));
    }

    public signUp (user: User) : Observable<any> {
        return this.create(user).pipe(map((newUser: any) => {
            this.postLogin(newUser);
        }));
    }

    protected postLogin (user: any) : void {
        this._cachedUser = user;
        this.onLogin.next(user);
        this.router.navigate(['dashboard']);
    }

    public logout () : void {
        this._cachedUser = null;
        this.onLogout.next();
        this.router.navigate(['']);
    }

    public create (user: User): Observable<User> {
        return this.httpClient.post<User>('http://localhost:8080/users/', { uid: user.uid, displayName: user.displayName, photoURL: user.photoURL, email: user.email });
    }

    public search (userName: string): Observable<User> {
        return this.httpClient.get<User>(`http://localhost:8080/users?userName=${userName}`);
    }

    public get (user: User): Observable<User> {
        return this.httpClient.get<User>(`http://localhost:8080/users/${user.uid}`);
    }

}

export { UserService, User };
