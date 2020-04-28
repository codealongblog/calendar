import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
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
    public isAuthenticating: boolean;
    public doneAuthenticating: Subject<boolean> = new Subject();

    public get cachedUser () : User {
        return this._cachedUser;
    }

    constructor (private httpClient: HttpClient, private router: Router) {
        this.onLogin = new Subject();
        this.onLogout = new Subject();
    }

    public isAuthenticated (): boolean {
        return !!this.cachedUser;
    }

    public loginUser (user: User) : Observable<any> {
        return this.create(user).pipe(mergeMap((userResult: User) => {
            this.postLogin(userResult);
            return of(userResult);
        }));
    }

    protected postLogin (user: any) : void {
        this._cachedUser = user;
        this.isAuthenticating = false;
        this.doneAuthenticating.next(true);
        this.onLogin.next(user);
        if (this.router.url === '/') {
            this.router.navigate(['dashboard']);
        } else {

        }
    }

    public logout () : void {
        this.isAuthenticating = false;
        this.doneAuthenticating.next(false);
        if (this._cachedUser) {
            this._cachedUser = null;
            this.onLogout.next();
            this.router.navigate(['']);
        }
    }

    public create (user: User): Observable<User> {
        return this.httpClient.post<User>(`http://localhost:8080/users/${user.uid}`, { uid: user.uid, displayName: user.displayName, photoURL: user.photoURL, email: user.email });
    }

    public search (userName: string): Observable<User> {
        return this.httpClient.get<User>(`http://localhost:8080/users?userName=${userName}`);
    }

    public get (user: User): Observable<User> {
        return this.httpClient.get<User>(`http://localhost:8080/users/${user.uid}`);
    }

}

export { UserService, User };
