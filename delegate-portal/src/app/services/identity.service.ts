import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface SignUpUser {
	firstName: string;
	lastName: string;
  email: string;
  company: string;
  password: string;
}

export interface SignInUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private identityUrl: string = environment.apiServiceSettings.identityUrl + 'user/api/user/';

  constructor(private httpClient: HttpClient) { }

  signUp(signUpUser: SignUpUser): Observable<any> {
    let params = new HttpParams()
      .set('firstName', signUpUser.firstName)
      .set('lastName', signUpUser.lastName)
      .set('email', signUpUser.email)
      .set('company', signUpUser.company)
      .set('password', signUpUser.password); 

    return this.httpClient.post(this.identityUrl + 'signup', undefined, { params: params })
      .pipe(
        map((res: any) => { return res; }),
        catchError<boolean, Observable<never>>((e) => { return throwError(e); })
      );
  } 
  
  signIn(signInUser: SignInUser): Observable<any> {
    let params = new HttpParams()
      .set('email', signInUser.email)
      .set('password', signInUser.password)

    return this.httpClient.post(this.identityUrl + 'signin', undefined, { params: params })
      .pipe(
        map((res: any) => { return res; }),
        catchError<boolean, Observable<never>>((e) => { return throwError(e); })
      );  
  }  
}
