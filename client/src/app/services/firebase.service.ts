import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { of, from, Observable, Subject } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';

@Injectable()
class FirebaseService {

	public firebaseUserLoaded: Subject<firebase.User> = new Subject();
	public firebaseUserUnLoaded: Subject<void> = new Subject();

	constructor () {
	}


	public init (): void {
		const firebaseConfig: any = {
			apiKey: 'AIzaSyCG--Z4G-0L4mZh3HEE2P64RwEWkn6VNYI',
			authDomain: 'calendarapp-f3853.firebaseapp.com',
			databaseURL: 'https://calendarapp-f3853.firebaseio.com',
			projectId: 'calendarapp-f3853',
			storageBucket: 'calendarapp-f3853.appspot.com',
			messagingSenderId: '913504605256',
			appId: '1:913504605256:web:c91cc8d6c945ba61ea747d',
			measurementId: 'G-K987Y8FSJ2'
		};

		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);

		firebase.auth().onAuthStateChanged((user: firebase.User) => {
			if (user) {
				this.firebaseUserLoaded.next(user);
			} else {
				this.firebaseUserUnLoaded.next();
			}
		});

	}

	public authenticate () : Observable<any> {
		return this.setPersistence().pipe(mergeMap(() => {
			return this.signin();
		}));
	}

	private setPersistence () : Observable<any> {
		return from(firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)).pipe(catchError((error) => {
			// Handle Errors here.
			console.log(error);
			return of({});
		}));
	}

	private signin () : Observable<any> {
		const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
		return from(firebase.auth().signInWithPopup(provider));
	}

	public signout () : Observable<any> {
		return from(firebase.auth().signOut());
	}


}

export { FirebaseService };
